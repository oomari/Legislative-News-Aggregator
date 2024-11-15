import React from "react";
import Image from "next/image";
import Link from "next/link";

/*
 * Navbar component
 */
export default function Navbar() {
  return (
    <div className="shadow-sm flex px-6 pt-6 items-center justify-between max-w-7xl lg:max-w-full mx-auto">
      <Link href="/">
        <Image src={"/logo-sa.jpg"} alt="logo" width={250} height={250} />
      </Link>
      <div className="flex gap-4 pr-10 text-white">
        <button className="hidden sm:block text-sm text-[#6da8f0] hover:text-blue-600 transition-all ease-in-out font-bold border-transparent opacity-60 bg-gray-700 rounded-md p-4">
          Request a Demo
        </button>
        <button className="text-sm font-bold transition-all ease-in-out hover:text-blue-600">
          Pro Features
        </button>
        <button className="text-sm font-bold transition-all ease-in-out hover:text-blue-600">
          Log In
        </button>
      </div>
    </div>
  );
}
