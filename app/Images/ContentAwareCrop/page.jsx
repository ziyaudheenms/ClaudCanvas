"use client";
import React, { useEffect, useState } from "react";
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
import { Loader } from 'lucide-react';
import { Rotate3d } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Card } from "@/elements/Card";
import { Banner } from "@/elements/Banner";
import { FileUpload } from "@/elements/FileUpload";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Button } from "@/components/ui/button"
import { ImageDown } from 'lucide-react';
import { LayoutDashboard } from "lucide-react";
import { ImagePlus } from "lucide-react";
import { TvMinimalPlay } from "lucide-react";
import { LogOut } from "lucide-react";

export default function Home() {
  const { user, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);
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
       label: "Logout",
       href: "#",
       icon: <LogOut className="h-8 w-8 shrink-0 text-black" />,
     },
   ];
  const [open, setOpen] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      await fetch("http://localhost:8000/api/v1/auth/create/user/sync-user/", {
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
          "http://localhost:8000/api/v1/media/Process/verify/",
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
    ></a>
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
  const [title, setTitle] = useState("");
  const [AscpectRatio, setAscpectRatio] = useState("");
  const [LoadIcon, setLoadIcon] = useState(false);
  const [image, setImage] = useState(null);
  const [finalImage, setfinalImage] = useState('https://www.bing.com/images/search?q=selon+musk&id=1EA95BEDBF9FCD49CA876402607CD534365A74DF');
  const { user, isLoaded } = useUser();


  const handleTransform = async (e) => {
    e.preventDefault();
    if (!title || !image) {
      alert("Please provide both title and image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("ratio", AscpectRatio);
    formData.append("username", user.username);

    try {
      setLoadIcon(true)
      const response = await axios.post(
        "http://localhost:8000/api/v1/media/Process/Image/CotentAwareCrop/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status_code === 5000) {
        console.log("Image transformed successfully:", response.data.message);
      }else{
        console.log("Sorry,No credits balance:", response.data);
        alert("Sorry,No credits balance:");
        
      }
      

      setfinalImage(response.data.data)
      setLoadIcon(false)
      setClickBtn(true);
    } catch (error) {
      console.error("Error transforming image:", error);
    }
  };

  return (
    <div className="flex flex-1 overflow-y-scroll">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-gradient-to-br p-6  dark:from-neutral-800 dark:to-neutral-900 dark:border-neutral-700">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight  text-center">
          Crop It Without Tension
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Upload your image and let us handle the magic!
        </p>
        <div>
          <form
            action=""
            className="w-[90%] mx-auto my-5 border border-neutral-200 rounded-xl p-3 bg-white"
          >
            <div>
              <label htmlFor="title" className="scroll-m-20 text-xl font-semibold tracking-tight">
                Title:
              </label>
              <br />
              <input
                type="text"
                id="title"
                className="border-2 border-neutral-100 my-2 rounded-lg p-3 w-full scroll-m-20 text-[15px] font-semibold tracking-tight"
                placeholder="Create A Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="title" className="scroll-m-20 text-xl font-semibold tracking-tight">
               Height and Width: <span className="text-[14px]">(In the given order)</span>
              </label>
              <br />
              <select
                type="text"
                id="title"
                className="border-2 border-neutral-100 my-2 rounded-lg p-3 w-full scroll-m-20 text-[15px] font-semibold tracking-tight"
                placeholder="Create A Title"
                value={AscpectRatio}
                onChange={(e) => setAscpectRatio(e.target.value)}
              >
                <option value="500:500">---</option>
                <option value="940:880">height=940, width=880</option>
                <option value="584:600">height=584, width=600</option>
                <option value="940:460">height=940, width=460</option>
                <option value="340:600">height=340, width=600</option>
              </select>
            </div>
            <div>
              <label htmlFor="image-upload" className="scroll-m-20 text-xl font-semibold tracking-tight my-2">
                Upload Your Image:
              </label>
              <br />
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mb-3 text-gray-400 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h16m-5 4l4-4m0 0l-4-4"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, or GIF (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>
              <div className="mt-4 flex justify-center">
                <div
                  className=""
                  onClick={handleTransform}
                >
                  <Button>{LoadIcon ? (
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
                    Transform Image
                    </>
                  )}</Button>

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
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <p>No image uploaded</p>
                )}
              </div>
              <div className="bg-neutral-300 w-fit shadow flex justify-center items-center flex-col gap-4 rounded-lg h-fit mx-auto">
                {finalImage ? (
                  <img
                    src={finalImage}
                    alt="Uploaded"
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
