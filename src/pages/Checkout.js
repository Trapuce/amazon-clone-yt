import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession, signIn, signOut } from "next-auth/react";
import {IntlProvider, FormattedNumber} from 'react-intl'
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key)

export default function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal)
  const { data: session } = useSession();
  const createCheckoutSession = async () => {
    try {
      const stripe = await stripePromise;
  
      const checkoutSession = await axios.post("/api/create-checkout-session", {
        items: items,
        email: session.user.email,
      });
  
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
  
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100">
      <HeaderComponent />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-md">
          <Image
            src="https://links.papareact.com/ikj"
            className="object-contain"
            alt=""
            width={1020}
            height={250}
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}{" "}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              {" "}
              <h2 className="whitespace-nowrap">
                subtotal({items.length} items):
                <span className="font-bold">
                <IntlProvider >       
        <FormattedNumber value={total} style="currency" currency="EUR" />
        </IntlProvider>
                </span>
              </h2>
              <button
              onClick={createCheckoutSession}
              role="link"
              disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign In to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
