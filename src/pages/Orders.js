import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import { getSession, useSession } from "next-auth/react";
import Stripe from "stripe";
import db from "../../firebase"; 
import Order from "../components/Order";
export default function Orders({ orders }) {
    const { data: session } = useSession();

    console.log(orders)
  return (
    <div>
      <HeaderComponent />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
            Orders
        ) : (
          <p>Please sign in to see your orders.</p>
        )}

        <div className="mt-5 space-y-4">
    
                {orders.map(({id, amount ,amountShipping , items , timestamp ,images}) => (
                  <Order
                  key={id}
                  id={id}
                  amount={amount}
                  amountShipping={amountShipping}
                  items={items}
                  timestamp={timestamp}
                  images={images}
                />
                ))}
          </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    if (!session) {
      return {
        props: {
          orders: [],
          session: null
        }
      };
    }
  
    try {
      // Fetch orders from Firestore
      const ordersSnapshot = await db
        .collection("users")
        .doc(session.user.email)
        .collection("orders")
        .get();
  
      const orders = await Promise.all(
        ordersSnapshot.docs.map(async (orderDoc) => {
          const orderData = orderDoc.data();
          const orderId = orderDoc.id;
  
          // Fetch line items from Stripe
          const lineItems = await stripe.checkout.sessions.listLineItems(orderId, {
            limit: 100
          });
  
          // Convert timestamp to human-readable format
          const timestamp = orderData.timestamp ? orderData.timestamp.toDate() : new Date();
          const formattedTimestamp = timestamp.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          });
  
          return {
            id: orderId,
            amount: orderData.amount || 0,  // Provide default value if undefined
            amountShipping: orderData.amountShipping || 0,  // Provide default value if undefined
            timestamp: formattedTimestamp,
            items: lineItems.data,
            images: orderData.images || [] // Provide default value if undefined
                      };
        })
      );
  
      return {
        props: {
          orders,
        }
      };
    } catch (error) {
      console.error("Error fetching orders or line items:", error.message);
      return {
        props: {
          orders: [],
        }
      };
    }
  }
  
  