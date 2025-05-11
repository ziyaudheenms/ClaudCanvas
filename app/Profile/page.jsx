"use client";
import React, { use, useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconVideo,
  IconSlideshow,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Card } from "@/elements/Card";
import { Banner } from "@/elements/Banner";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Subscribe_Basic_Plan from "@/elements/Subscribe_Basic_Plan";
export default function Home() {
  const {user,isLoaded} = useUser();
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="h-8 w-8 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Images",
      href: "/Images",
      icon: (
        <IconSlideshow className="h-8 w-8 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Video",
      href: "/Video",
      icon: (
        <IconVideo className="h-8 w-8 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-8 w-8 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full  flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800 text-xl",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto text-2xl font-bold">
            <>
       
            </>
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
  const [data,setData] = useState();
  useEffect(() => {
    const fetchUserData = () => {
      if(!isLoaded){
        console.log("User is not loaded yet");

      }
      else{
        axios
      .post("http://localhost:8000/api/v1/media/view/MyProfile/", {
        username: user?.username,
      }).then((response) => {
        console.log(response.data);
        setData(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
      }
      
    }
    fetchUserData();
  },[user]);
  if (!isLoaded) {
    return(
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <img src="/Processing.gif" alt="" />
      </div>
    )
  }
  else{
    return (
      <div className="flex flex-1 overflow-y-scroll">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-5 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="bg-gradient-to-r from-[#FF0080] to-[#FF8C00] rounded-sm p-5">
            <h1 className="text-center text-4xl font-bold">
              Track Your Profile Here
            </h1>
          </div>
          <div className="flex justify-between flex-wrap   my-10">
            <div className="border  shadow-xl py-10 px-10 rounded-xl w-full md:w-[49%] xl:w-[30%] my-5 md:my-0 ">
              <h1 className="text-neutral-600">Credits Available</h1>
              <div className="flex items-center gap-2">
                <img src="./coin.png" alt="" />
                <h1>{data?.credits}</h1>
              </div>
            </div>
            <div className="border  shadow-xl py-10 px-10 rounded-xl w-full md:w-[49%] xl:w-[30%] my-5 md:my-0">
              <h1 className="text-neutral-600">Image Manupulations</h1>
              <div className="flex items-center gap-2">
                <img src="./image.png" alt="" />
                <h1>{data?.images_manipulated}</h1>
              </div>
            </div>
            <div className="border  shadow-xl py-10 px-10 rounded-xl w-full md:w-[49%] xl:w-[30%] my-5 md:my-0">
              <h1 className="text-neutral-600">Video Manupulations</h1>
              <div className="flex items-center gap-2">
                <img src="./vedio.png" alt="" />
                <h1>{data?.video_manipulated}</h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-center font-medium text-2xl">
              Buy Your Credits Here
            </h1>
            <div className="flex flex-wrap justify-center gap-6 mt-10 ">
              {/* Price Card 1 */}
              <div className="border shadow-xl rounded-xl p-6 w-full sm:w-[45%] lg:w-[44%] xl:w-[30%] md:w-full bg-gradient-to-r from-[#FF0080] to-[#FF8C00] text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Basic Plan
                </h2>
                <p className="text-center text-lg mb-6">
                  Perfect for individuals
                </p>
                <div className="text-center text-4xl font-extrabold mb-6">
                  $10
                </div>
                <ul className="space-y-2 mb-6">
                  <li>✔ 100 Credits</li>
                  <li>✔ Access to Images & video</li>
                  <li>✔ Basic Support</li>
                </ul>
                <Subscribe_Basic_Plan />
              </div>
  
              {/* Price Card 2 */}
              <div className="border shadow-xl rounded-xl p-6 w-full sm:w-[45%] lg:w-[44%] xl:w-[30%] md:w-full bg-gradient-to-r from-[#8C00FF] to-[#0080FF] text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Pro Plan</h2>
                <p className="text-center text-lg mb-6">Best for professionals</p>
                <div className="text-center text-4xl font-extrabold mb-6">
                  $30
                </div>
                <ul className="space-y-2 mb-6">
                  <li>✔ 500 Credits</li>
                  <li>✔ Access to Images & Videos</li>
                  <li>✔ Priority Support</li>
                </ul>
              <button className="w-full py-3 rounded-lg bg-white text-[#8C00FF] font-bold hover:bg-gray-200 transition">
                  Buy Now
                </button>
              </div>
              <div className="border shadow-xl rounded-xl p-6 w-full sm:w-[45%] lg:w-[44%] xl:w-[30%] md:w-full bg-gradient-to-r from-[#8C00FF] to-[#0080FF] text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Altra Pro Plan
                </h2>
                <p className="text-center text-lg mb-6">
                  Best for Highly professional editors
                </p>
                <div className="text-center text-4xl font-extrabold mb-6">
                  $50
                </div>
                <ul className="space-y-2 mb-6">
                  <li>✔ 1000 Credits</li>
                  <li>✔ Access to Images & Videos</li>
                  <li>✔ Priority Support</li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-white text-[#8C00FF] font-bold hover:bg-gray-200 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
};
