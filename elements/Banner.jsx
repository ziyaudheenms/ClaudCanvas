import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../components/ui/spotlight";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
export function Banner() {
  return (
     <Alert>
      {/* <Terminal className="h-4 w-4" /> */}
      <AlertTitle className="scroll-m-20  pb-2 text-3xl font-bold tracking-normal first:mt-0">CLAUDCANVAS</AlertTitle>
      <AlertDescription className="scroll-m-20 text-xl font-semibold tracking-tight">
        The Ultimate Solution For Media Transformations Out There!
      </AlertDescription>
    </Alert>
  );
}
