import React from "react";
import Image from "next/image";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

export default function HeaderComponent() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems)
  return (
    <div className="sticky top-0 z-50">
      {/* top nav */}

      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-3 flex items-center flex-grow sm:flex-grow-0  ">
          <Image
          onClick={()=>{router.push("/")}}
            className=" cursor-pointer"
            src="https://links.papareact.com/f90"
            alt=""
            width={150}
            height={40}
            objectFit="contain"
          />
        </div>
        {/* search  */}
        <div className="hidden sm:flex items-center rounded-md h-10 flex-grow bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>
        {/**right */}

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={ !session ? signIn : signOut} className="cursor-pointer link">
            <p>
               {session ? `Hello, ${session.user.name}`: "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & lists</p>
          </div>
          <div className="link">
            <p>Return</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div  onClick={()=>{router.push("/Checkout")}} className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-10 bg-yellow-400 rounded-full text-center h-4 w-4 text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className=" hidden md:inline  font-extrabold md:text-sm">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/*botton nav */}
      <div className="flex items-center space-x-3 p-2 bg-amazon_blue-light text-white">
        <p className="flex items-center link ">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper toolkit</p>
        <p className="link hidden lg:inline-flex">Health & personal Care</p>
      </div>
    </div>
  );
}
