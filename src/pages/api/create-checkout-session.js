const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Clé secrète pour les opérations côté serveur

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items, email } = req.body;

    if (!items || !email) {
      return res.status(400).json({ error: "Missing items or email in request body" });
    }

    const transformedItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100, // Convert price to cents
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"], // Collecte des adresses de livraison pour ces pays
      },
      line_items: transformedItems,
      mode: 'payment',
      customer_email: email,
      success_url: `${process.env.HOST}/success`,
      cancel_url: `${process.env.HOST}/checkout`,
      metadata: {
        email,
        images: JSON.stringify(items.map(item => item.image)),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: error.message });
  }
};
