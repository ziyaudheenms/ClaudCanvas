import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../components/ui/spotlight";

export function Banner() {
  return (
    <div className="relative flex items-center justify-center py-8 px-4 w-full overflow-y-scroll pt-20 rounded-md bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white antialiased sm:py-12 md:py-16 lg:py-24">
      <div className="relative z-10 mx-auto w-full max-w-4xl p-4 text-center">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Unleash Your Creativity <br />
          With{" "}
          <span className="bg-gradient-to-r from-black  to-black bg-clip-text text-transparent">
            ClaudCanvas
          </span>
        </h1>
      </div>
    </div>
  );
}
