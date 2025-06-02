"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Subscribe from "@/elements/Subscribe";
import { Button } from "@/components/ui/button";
import { Bitcoin } from 'lucide-react';
import { FileImage } from 'lucide-react';
import { Video } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { ImagePlus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TvMinimalPlay } from 'lucide-react';
import { LogOut } from 'lucide-react';

export default function Home() {
  const { user, isLoaded } = useUser();
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <LayoutDashboard className="h-8 w-8 shrink-0 text-black" />
      ),
    },
    {
      label: "Images",
      href: "/Images",
      icon: (
        <ImagePlus className="h-8 w-8 shrink-0 text-black" />
      ),
    },
    {
      label: "Video",
      href: "/Video",
      icon: (
        <TvMinimalPlay className="h-8 w-8 shrink-0 text-black" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <LogOut className="h-8 w-8 shrink-0 text-black" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full  flex-1 flex-col overflow-hidden rounded-md border border-neutral-200  md:flex-row dark:border-neutral-700 dark:bg-neutral-800 text-xl bg-white",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto text-2xl font-bold">
            <></>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.username,
                href: "#",
                icon: (
                  <img
                    src={user?.imageUrl}
                    className="h-10 w-10 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm  dark:bg-white bg-gradient-to-r from-[#FF0080] to-[#FF8C00]" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre  dark:text-white text-xl  bg-gradient-to-r from-[#FF0080] to-[#FF8C00] bg-clip-text text-transparent"
      >
        ClaudCanvas
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState();
  useEffect(() => {
    const fetchUserData = () => {
      if (!isLoaded) {
        console.log("User is not loaded yet");
      } else {
        axios
          .post(
            "https://claudcanvas-backend.onrender.com/api/v1/media/view/MyProfile/",
            {
              username: user?.username,
            }
          )
          .then((response) => {
            console.log(response.data);
            setData(response.data.message);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    };
    fetchUserData();
  }, [user]);
  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <img src="/Processing.gif" alt="" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-1 overflow-y-scroll">
        <div className="flex h-screen w-full flex-1 flex-col gap-2 rounded-tl-2xl border  bg-white p-2 md:p-5 ">
          <div className="">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-center">
               Buy Your Credits Here
            </h1>
          </div>
          <div>
            <div className="flex flex-wrap justify-center gap-6 mt-10 py-4">
              <Card>
                <CardHeader>
                  <h1 className="flex items-baseline gap-2 scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {" "}
                    70.00{" "}
                    <span className="scroll-m-20 text-xs font-medium text-[#9ca3af] tracking-tight">
                      {" "}
                      INR
                    </span>
                  </h1>
                  <div>
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      Basic Plan
                    </h2>
                  </div>
                  <CardDescription>
                    <p className="scroll-m-20 text-xl font-light tracking-normal text-[#374151]">
                      Most suitable for hobby works
                    </p>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Get Access Of 20 Credits</li>
                    <li>Transform Images for your needs</li>
                    <li>Manupulate videos as you need</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={"w-full"}>
                    <Subscribe Price_plan={"basic"} />
                  </Button>
                </CardFooter>
              </Card>

              <Card className={"border-2 border-[#1d4ed8]"}>
                <CardHeader>
                  <h1 className="flex items-baseline gap-2 scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {" "}
                    200.00{" "}
                    <span className="scroll-m-20 text-xs font-medium text-[#9ca3af] tracking-tight">
                      {" "}
                      INR
                    </span>
                  </h1>
                  <div>
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      Pro Plan
                    </h2>
                  </div>
                  <CardDescription>
                    <p className="scroll-m-20 text-xl font-light tracking-normal text-[#374151]">
                      Most suitable for <span className="text-[#1d4ed8]">editors</span>
                    </p>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Get Access Of 100 Credits</li>
                    <li>Transform Images for your needs</li>
                    <li>Manupulate videos as you need</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={"w-full bg-[#1d4ed8]"}>
                    <Subscribe Price_plan={"pro"} />
                  </Button>
                </CardFooter>
              </Card>

              <Card className={"border-2 border-[#b91c1c]"}>
                <CardHeader>
                  <h1 className="flex items-baseline gap-2 scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {" "}
                    500.00{" "}
                    <span className="scroll-m-20 text-xs font-medium text-[#9ca3af] tracking-tight">
                      {" "}
                      INR
                    </span>
                  </h1>
                  <div>
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      Altra Pro Plan
                    </h2>
                  </div>
                  <CardDescription>
                    <p className="scroll-m-20 text-xl font-light tracking-normal text-[#374151]">
                      Most suitable for <span className="text-[#b91c1c]"> core professionals</span>
                    </p>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Get Access Of 500 Credits</li>
                    <li>Transform Images for your needs</li>
                    <li>Manupulate videos as you need</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className={"w-full bg-[#b91c1c]"}>
                    <Subscribe Price_plan={"altra_pro"} />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
