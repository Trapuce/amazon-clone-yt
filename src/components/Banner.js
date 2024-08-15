import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "next/image";
export default function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        interval={5000}
      >
        <div className="">
          <Image
            loading="lazy"
            layout="responsive"
            width={1920}
            height={1080}
            alt=""
            src="https://links.papareact.com/gi1"
          />
        </div>
        <div className="">
          <Image
            loading="lazy"
            layout="responsive"
            width={1920}
            height={1080}
            alt=""
            src="https://links.papareact.com/6ff"
          />
        </div>
        <div className="">
          <Image
            loading="lazy"
            layout="responsive"
            width={1920}
            height={1080}
            alt=""
            src="https://links.papareact.com/7ma"
          />
        </div>
      </Carousel>
    </div>
  );
}
