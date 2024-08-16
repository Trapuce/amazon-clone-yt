import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
export default function success() {
    const router = useRouter()
  return (
    <div className="bg-gray-100 h-screen">
      <HeaderComponent />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="h-10  text-green-500" />
            <h1 className="text-3xl">
              Thank you , your order has been confirmed{" "}
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We’ll send a confirmation once your
            items have shipped. If you’d like to check the status of your
            order(s), please click the link below.
          </p>
          <button onClick={()=>router.push("/Orders")} className="button mt-8">Go to my orders</button>
        </div>
      </main>
    </div>
  );
}
