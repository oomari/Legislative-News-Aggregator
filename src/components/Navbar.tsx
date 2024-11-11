import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="shadow-sm flex p-6 mb-8 items-center justify-between">
        <Link href="/">
          <Image src={"/logo-sa.jpg"} alt="logo" width={250} height={250} />
        </Link>
        <div className="flex gap-4 pr-10 text-white">
          <button className="text-[#82B9FB] hover:text-blue-600 transition-all ease-in-out font-bold border-transparent opacity-50 bg-gray-700 rounded-md p-4">
            Request a Demo
          </button>
          <button className="font-bold transition-all ease-in-out hover:text-blue-600">
            Pro Features
          </button>
          <button className="font-bold transition-all ease-in-out hover:text-blue-600">
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
}
