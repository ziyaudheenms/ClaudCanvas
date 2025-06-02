"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { ImagePlus } from "lucide-react";
import { TvMinimalPlay } from "lucide-react";  
import { LogOut } from "lucide-react";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
export default function Home() {
  const {user ,isLoaded} = useUser()
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: <LayoutDashboard className="h-8 w-8 shrink-0 text-black" />,
    },
    {
      label: "Images",
      href: "/Images",
      icon: <ImagePlus className="h-8 w-8 shrink-0 text-black" />,
    },
    {
      label: "Video",
      href: "/Video",
      icon: <TvMinimalPlay className="h-8 w-8 shrink-0 text-black" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <LogOut className="h-8 w-8 shrink-0 text-black" />,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full  flex-1 flex-col   rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800 text-xl",
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
                label:'Store',
                href: user?.imageUrl,
                icon: (
                 <Store className="h-10 w-10" />
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
  const {user,isLoaded} = useUser()
  const [data , setData] = useState([])
  const route = useRouter()
  useEffect(() => {
    const fetchData = () => {
      if(isLoaded) {
        axios.post("https://claudcanvas-backend.onrender.com/api/v1/media/view/myVideos/" , {
          username : user?.username
        }).then((res) => {
          console.log(res.data);
          setData(res.data.message)
          route.refresh()
        }).catch((err) => {
          console.log(err);
          
        })
      }
    }
    fetchData()
  },[user])

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
      <img src="/Processing.gif" alt="" />
    </div>
    )
  } else {
    return (
      <div className="flex flex-1 overflow-y-scroll">
        <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="bg-gradient-to-r from-[#FF0080] to-[#FF8C00] rounded-lg p-6 shadow-lg">
            <h1 className="text-center text-3xl font-extrabold text-white">
              Explore Stunning Video Transformations
            </h1>
            <div className="flex flex-wrap justify-center gap-4 py-6">
              <div className="p-2">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <video
                    src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/video-preview.mp4"
                    alt=""
                    autoPlay
                    controls
                    className="w-64 h-48"
                  />
                </div>
                <Link href={"/Video/PreviewVideo"}>
                <div className="text-center text-lg font-medium mt-2 bg-white rounded-lg">
                  Video Preview
                </div>
                </Link>
              </div>
             
              <div className="p-2">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <video
                    src="https://res.cloudinary.com/prod/video/upload/me/tx-cards/optimize-and-deliver.mp4"
                    alt=""
                    autoPlay
                    controls
                    className="w-64 h-48"
                  />
                </div>
                <Link href={"/Video/OptimizeVideo"}>
                <div className="text-center text-lg font-medium mt-2 bg-white rounded-lg">
                  Optimize Video
                </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <h1 className="md:ml-2 leading-7 [&:not(:first-child)]:mt-6">Recent Works</h1>
           <Link href={"/Video/OptimizeVideo"}>
              <Button>
                {" "}
                <Upload />
                Upload
              </Button>
            </Link>
          </div>
          <div className="py-3 flex flex-wrap gap-4 lg:gap-2 justify-center ">
            {
              data.map((item) => (
                <div key={item.id} className="p-2" onClick={() => {
                  localStorage.setItem('Video_ID' , item.id)
                  route.push("/VideoSinglePage")
                 
                }}>
                <div className="rounded-lg overflow-hidden shadow-md ">
                  <video
                    src={item.transformed_video_file}
                    alt=""
                    autoPlay
                    controls
                    className="w-64 h-48 lg:w-44 md:w-96 xl:w-64"
                  />
                </div>
                <div className="text-center mt-2 bg-gradient-to-r from-[#FF0080] to-[#FF8C00] text-white rounded-md py-1 md:ml-2 leading-7 [&:not(:first-child)]:mt-6">
               {item.title}
                </div>
              </div>
              ))
            }
               
            
          </div>
        </div>
      </div>
    );
  }
 
};

                                                                                                             
                                                        