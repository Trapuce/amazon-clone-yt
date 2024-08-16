import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import { IntlProvider, FormattedNumber } from "react-intl";
import prime from "./assets/prime.png";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

export default function CheckoutProduct({
  id,
  title,
  rating,
  price,
  description,
  category,
  image,
  hasPrime,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const products = {
      id,
      title,
      rating,
      price,
      description,
      category,
      image,
      hasPrime,
    };
    dispatch(addToBasket(products));
  };
  const RemoveItemToBasket = () => {
    dispatch(removeFromBasket({id}));
  };
  return (
    <div className="grid grid-cols-5">
      <Image
        alt={title}
        src={image}
        width={200}
        height={200}
        className="object-contain"
      />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-2">{description}</p>
        <div className="mb-5">
          <IntlProvider>
            <FormattedNumber value={price} style="currency" currency="EUR" />
          </IntlProvider>
        </div>

        {hasPrime && (
          <div className="flex items-center space-x-2 ">
            <img className="" src={prime} alt="prime" />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button">
          Add to Basket
        </button>
        <button onClick={RemoveItemToBasket} className="button">
          Remove to Basket{" "}
        </button>
      </div>
    </div>
  );
}
