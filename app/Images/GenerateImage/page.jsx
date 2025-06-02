"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconVideo,
  IconSlideshow,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { Drama, Trash2 } from 'lucide-react';
import { ImageDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Card } from "@/elements/Card";
import { Banner } from "@/elements/Banner";
import { FileUpload } from "@/elements/FileUpload";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rotate3d } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { ImagePlus } from "lucide-react";
import { TvMinimalPlay } from "lucide-react";
import { LogOut } from "lucide-react";
export default function Home() {
  const [clickBtn, setClickBtn] = useState(false);
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
      label: "Generate Image",
      href: "/Images/GenerateImage",
      icon: <Drama className="h-8 w-8 shrink-0 text-black" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <LogOut className="h-8 w-8 shrink-0 text-black" />,
    },
  ];
  const [open, setOpen] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(false);

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
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Store className="h-10 w-10"/>
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
  const [clickBtn, setClickBtn] = useState(false);
  const [LoadIcon, setLoadIcon] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [ImagePrompt, setImagePrompt] = useState("");
  const [finalImage, setfinalImage] = useState(
    "https://www.bing.com/images/search?q=selon+musk&id=1EA95BEDBF9FCD49CA876402607CD534365A74DF"
  );
  const { user, isLoaded } = useUser();

  const handleGeneration = async (e) => {
    e.preventDefault();
    if (!title ) {
      alert("Please provide both title");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("prompt", ImagePrompt);
    formData.append("username", user.username);

    try {
      setLoadIcon(true);
      const response = await axios.post(
        "https://claudcanvas-backend.onrender.com/api/v1/media/Process/Image/GenerateImage/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status_code === 5000) {
        console.log("Image generated successfully:", response.data.data);
      } else {
        console.log("Sorry,No credits balance:", response.data);
        alert("Sorry,No credits balance:");
      }

      setfinalImage(response.data.data);
      setLoadIcon(false);
      setClickBtn(true);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };
  return (
    <div className="flex flex-1 overflow-y-scroll bg-white">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl   bg-gradient-to-br p-6">
        <h1 className="text-center text-3xl font-extrabold text-gray-800 dark:text-white">
          Generate Your Image with AI
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Enter the prompt and let us handle the magic!
        </p>
        <div>
          <form
            action=""
            className="w-[90%] mx-auto my-5 shadow rounded-xl p-3"
          >
            <div>
              <label htmlFor="" className="text-2xl">
                Title:
              </label>
              <br />
              <input
                type="text"
                name=""
                id=""
                className="border-2 border-neutral-200 my-2 rounded-lg p-3 w-full"
                placeholder="Create A Title"
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
              />
            </div>
            <div>
              <label htmlFor="" className="text-2xl">
                Enter Your Prompt:
              </label>
              <br />
              <input
                type="text"
                name=""
                id=""
                className="border-2 border-neutral-200 my-2 rounded-lg p-3 w-full"
                placeholder="Enter the propmt of the image you need"
                value={ImagePrompt}
                onChange={(e) => {setImagePrompt(e.target.value)}}
              />
            </div>
            <div>
             
              <div className="flex items-center justify-center w-full">
            
              </div>
              <div className="mt-4 flex justify-center">
                <div className="" onClick={handleGeneration}>
                  <Button>
                    {LoadIcon ? (
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-center text-white flex gap-2 items-center "
                      >
                        <Loader />
                        Loading...
                      </motion.div>
                    ) : (
                      <>
                        <Rotate3d />
                        Generate Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
       
        {clickBtn ? (
          <div>
            <h1 className="text-center font-bold">View Your Images</h1>
            <div className="w-full flex flex-col justify-center gap-3 flex-wrap  py-5">
              
              <div className="bg-neutral-300 w-fit shadow flex justify-center items-center flex-col gap-4 rounded-lg h-fit mx-auto">
                {finalImage ? (
                  <img
                    src={finalImage}
                    alt="final"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <p>Image preview Loading</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-4 py-4 flex-wrap">
              <Button
                className="px-6 py-3 text-white transition-all duration-300"
                onClick={() => alert("Image deleted!")}
              >
                <Trash2 />
                Delete Image
              </Button>
              <Button
                className="px-6 py-3 text-white bg-[#1d4ed8]  rounded-lg shadow-md focus:outline-none focus:ring-2  transition-all duration-300"
                onClick={() => {
                  if (finalImage) {
                    const link = document.createElement("a");
                    link.href = finalImage;
                    link.download = "transformed-image.png";
                    link.click();
                  } else {
                    alert("No image available to download!");
                  }
                }}
              >
                <ImageDown />
                Download Image
              </Button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
const ImageCard = ({ imageUrl, title, size, date }) => {
  return (
    <div
      className="h-80 w-64 rounded-md shadow-xl bg-cover bg-center flex flex-col justify-end p-4"
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
