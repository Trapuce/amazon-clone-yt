import React, { useState , useEffect} from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import {IntlProvider, FormattedNumber} from 'react-intl'
import prime from "./assets/prime.png";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

export default function Products({
  id,
  title,
  price,
  description,
  category,
  image,
}) {
  const [rating, setRating] = useState(0);
  const [hasPrime, setHasPrime] = useState(false);

  useEffect(() => {
    setRating(Math.floor(Math.random() * 5) + 1);
    setHasPrime(Math.random() < 0.5);
  }, []);
  const dispatch = useDispatch();
const addItemToBasket = ()=>{
  const products = {
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
  }
  dispatch(addToBasket(products))
}
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 italic text-gray-400 text-xs">{category}</p>
      <div className="flex justify-center mb-3">
        <Image
          width={200}
          height={200}
          alt={title}
          src={image}
          className="object-contain"
        />
      </div>
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon  className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5"> 
        <IntlProvider >       
        <FormattedNumber value={price} style="currency" currency="EUR" />
        </IntlProvider>
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
            <img
            className=""
              src={prime}
              alt="prime"
            />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto button">Add to Basket</button>
    </div>
  );
}
