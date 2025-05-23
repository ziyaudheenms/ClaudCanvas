"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);

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
  const [LoggedIn, setLoggedIn] = useState(false);

  //  const router = useRouter();
  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      await fetch("https://claudcanvas-backend.onrender.com/api/v1/auth/create/user/sync-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.emailAddresses[0].emailAddress,
          username: user.username || user.id,
        }),
      });
    };
    if (!isLoaded || !user) return;
    syncUser();
    const verify = async () => {
      try {
        const response = await axios.post(
          "https://claudcanvas-backend.onrender.com/api/v1/media/Process/verify/",
          {
            username: user.username || user.id, // fallback if username is null
          }
        );

        if (response.data.status_code === 5000) {
          console.log(response);

          console.log(
            "Final verification passed" + response.data.message.username
          );
          setUserData(response.data.message.username);
        } else {
          console.log("Final verification failed", response);
        }
      } catch (err) {
        console.error("Verification error:", err);
      }
    };

    verify();
  }, [isLoaded, user]);
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
            {/* {
          console.log(user)

          } */}
            <SidebarLink
              link={{
                label: user?.username,
                href: "/Profile",
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
        <Banner />
        <div className="flex justify-between items-center mt-5">
          <h1 className="text-xl font-semibold">Recent Works</h1>
          <button className="px-4 py-2 rounded-md border border-black bg-gradient-to-r from-[#FF0080] to-[#FF8C00] text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Upload
          </button>
        </div>

        <div className="py-5 flex flex-wrap gap-4 justify-center overflow-y-scroll">
          {[...Array(8)].map((_, idx) => (
            <ImageCard
              key={idx}
              imageUrl="https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"
              title={`Card Title ${idx + 1}`}
              size="1920x1080"
              date="2023-10-01"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const ImageCard = ({ imageUrl, title, size, date }) => {
  return (
    <div
      className="h-80 w-64 lg:w-52 md:w-80 rounded-md shadow-xl bg-cover bg-center flex flex-col justify-end p-4"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="text-black font-medium text-[15px] relative z-10 bg-white p-2 rounded-md inline-block">
        <div className="font-bold">{title}</div>
        <div className="flex flex-row justify-between text-xs mt-1">
          <span>{size}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};
