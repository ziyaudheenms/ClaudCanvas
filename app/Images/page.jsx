"use client";
import React, { useState } from "react";
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
import Link from "next/link";

export default function Home() {
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
              <Logo />
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
                label: "Manu Arora",
                href: "/Profile",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
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
  return (
    <div className="flex flex-1 overflow-y-scroll">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-5 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="bg-gradient-to-r from-[#FF0080] to-[#FF8C00] rounded-sm p-5">
          <h1 className="text-center text-4xl font-bold">
            Wide Vareity Of Transformations
          </h1>
          <div className="flex flex-wrap justify-center gap-4 py-5">
            <div className="  p-2">
              <div className=" rounded-lg overflow-hidden shadow-md">
                <video
                  src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/gen-background-replace.mp4"
                  alt=""
                  autoPlay
                  controls
                  className="w-60 h-46"
                />
              </div>
              <Link href={'/Images/BgRemover'} >
              <div className="pb-1 text-center bg-white rounded-lg my-2">
                Bg Remover
              </div>
              </Link>
            </div>
            <div className="  p-2">
              <div className=" rounded-lg overflow-hidden shadow-md">
                <video
                  src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/gen-replace.mp4"
                  alt=""
                  autoPlay
                  controls
                  className="w-60 h-46"
                />
              </div>
              <Link href={'/Images/GenerativeReplace'} >
              <div className="pb-1 text-center bg-white rounded-lg my-2">
                Generative Replace
              </div>
              </Link>
            </div>
            <div className="  p-2">
              <div className=" rounded-lg overflow-hidden shadow-md">
                <video
                  src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/smart-crop.mp4"
                  alt=""
                  autoPlay
                  controls
                  className="w-60 h-46"
                />
              </div>
              <Link href={'/Images/ContentAwareCrop'} >
              <div className="pb-1 text-center bg-white rounded-lg my-2">
                Content Aware Cropping
              </div>
              </Link>
            </div>
            <div className="  p-2">
              <div className=" rounded-lg overflow-hidden shadow-md">
                <video
                  src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/gen-fill.mp4"
                  alt=""
                  autoPlay
                  controls
                  className="w-60 h-46"
                />
              </div>
              <Link href={'/Images/GenerativeFill'} >
              <div className="pb-1 text-center bg-white rounded-lg my-2">
                Generative Fill
              </div>
              </Link>
            </div>
            <div className="  p-2">
              <div className=" rounded-lg overflow-hidden shadow-md">
                <video
                  src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/gen-recolor.mp4"
                  alt=""
                  autoPlay
                  controls
                  className="w-60 h-46"
                />
              </div>
              <Link href={'/Images/GenerativeRecolor'} >
              <div className="pb-1 text-center bg-white rounded-lg my-2">
                Generative Recolor
              </div>
              </Link>
            </div>
            <div className="  p-2">
              <div className="rounded-lg overflow-hidden shadow-md ">
                <video
                  src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/optimize-and-deliver.mp4"
                  alt=""
                  autoPlay
                  controls
                  className="w-60 h-46"
                />
              </div>
              <Link href={'/Images/Optimize'} >
              <div className="pb-1 text-center bg-white rounded-lg my-2">
                Optimize Images
              </div>
              </Link>
            </div>
            <div className="  p-2">
              <div className="rounded-lg overflow-hidden shadow-md ">
                <video
                  src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/gen-remove.mp4"
                  alt=""
                  autoPlay
                  controls
                  className="w-60 h-46"
                />
              </div>
              <Link href={'/Images/GenerativeRemover'} >
              <div className="pb-1 text-center bg-white rounded-lg my-2">
                Generative Remover
              </div>
              </Link>
            </div>
            <div className="  p-2">
              <div className=" rounded-lg overflow-hidden shadow-md">
                <video
                  src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/upscale.mp4"
                  alt=""
                  autoPlay
                  controls
                  className="w-60 h-46"
                />
              </div>
              <Link href={'/Images/Upscale'} >
              <div className="pb-1 text-center bg-white rounded-lg my-2">
               Upscale Images
              </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-blue-300 rounded-md py-4">
          <h1 className="text-center text-2xl font-medium bg-gradient-to-r from-[#FF0080] to-[#FF8C00] bg-clip-text text-transparent">Use ClaudCanvas and break the boundaries of Creativity</h1>
        </div>
      </div>
    </div>
  );
};
