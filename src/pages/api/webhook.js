import { buffer } from 'node:stream/consumers';
import Stripe from 'stripe';
import admin from 'firebase-admin';

// Initialisation de Firebase Admin
//const serviceAccount = require('../../../permissions.json');
const serviceAccount = JSON.parse(process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20', // Assurez-vous que l'API Stripe est correctement configurée
  });

export const config = {
  api: {
    bodyParser: false, // Désactiver le bodyParser intégré de Next.js pour capturer le raw body
  },
};

// Fonction pour traiter la commande
const fulfillOrder = async (session) => {
  const db = admin.firestore();
  
  return db
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_SIGNING_SECRET);
    } catch (err) {
      console.error('⚠️  Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gérer l'événement Stripe
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        try {
          await fulfillOrder(session);
          console.log('Order fulfilled successfully');
        } catch (err) {
          console.error('Error fulfilling order:', err);
        }
        break;

      // Gérer d'autres types d'événements si nécessaire
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Répondre pour confirmer la réception de l'événement
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
