import React from "react";
import { IntlProvider, FormattedNumber } from "react-intl";

export default function Order({
  id,
  amount,
  amountShipping,
  items,
  timestamp,
  images,
}) {
  return (
    <div className="relative  border rounded-md">
      <div className="flex items-center space-x-10 bg-gray-100 text-gray-600 text-sm">
        <div >
          <p className="font-bold text-xs"> Order Place</p>
          <p>{timestamp}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <IntlProvider>
              <FormattedNumber value={amount} style="currency" currency="EUR" />
              -Next Day Delivery{""}
              <FormattedNumber
                value={amountShipping}
                style="currency"
                currency="EUR"
              />
            </IntlProvider>
          </p>
        </div>
        <p className="text-sm whitespace-nowrap  sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items{" "}
        </p>
        <p className="absolute top-0 right-0  w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          Order #{id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image) => (
            <img src={image} className="object-contain h-20 sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  );
}
