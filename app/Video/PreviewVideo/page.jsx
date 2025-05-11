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
import { cn } from "@/lib/utils";
import { Card } from "@/elements/Card";
import { Banner } from "@/elements/Banner";
import { FileUpload } from "@/elements/FileUpload";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function Home() {
  const { user, isLoaded } = useUser();
  const [clickBtn, setClickBtn] = useState(false);
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
  const [clickBtn, setClickBtn] = useState(false);
  const { user, isLoaded } = useUser();
  const [ videoResult, setvideoResult] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <img src="/Processing.gif" alt="" />
      </div>
    );
  } else {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("title", formData.title);
      data.append("video", formData.video);
      data.append("duration", formData.description);
      data.append("username", user.username);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/media/Process/MakePreview/",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response);
        setvideoResult(response.data.data)
        setClickBtn(true);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    };

 
    const videofile = localStorage.getItem("result_video")
    
    return (
      <div className="flex flex-1 flex-col overflow-y-scroll">
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-gradient-to-br p-6 dark:from-neutral-800 dark:to-neutral-900 dark:border-neutral-700"></div>
      <h1 className="text-center text-3xl font-extrabold text-gray-800 dark:text-white">
        Store Your Videos Securely
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400">
        Upload your video files and get the preview in seconds!
      </p>
      <div>
        <form
        onSubmit={handleSubmit}
        className="w-[90%] mx-auto my-5 shadow rounded-xl p-3"
        >
        <div>
          <label htmlFor="title" className="text-2xl">
          Title:
          </label>
          <br />
          <input
          type="text"
          name="title"
          id="title"
          className="border-2 border-neutral-200 my-2 rounded-lg p-3 w-full"
          placeholder="Enter a title"
          value={formData.title}
          onChange={handleInputChange}
          required
          />
        </div>
        <div>
          <label htmlFor="description" className="text-2xl">
          Duration of the video:
          </label>
          <br />
          <textarea
          name="description"
          id="description"
          className="border-2 border-neutral-200 my-2 rounded-lg p-3 w-full"
          placeholder="Add the duration of the video"
          value={formData.description}
          onChange={handleInputChange}
          required
          ></textarea>
        </div>
        <div>
          <label htmlFor="video-upload" className="text-2xl">
          Upload Your Video:
          </label>
          <br />
          <div className="flex items-center justify-center w-full">
          <label
            htmlFor="video-upload"
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
              (MAX. 10MB)
            </p>
            </div>
            <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
            required
            />
          </label>
          </div>
          <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300"
          >
            Upload Video
          </button>
          </div>
        </div>
        </form>
      </div>
      {clickBtn ? (
        <div>
        <h1 className="text-center font-bold">Manage Your Videos</h1>
        <div className="w-full flex gap-3 flex-wrap justify-center py-5">
          <div className="bg-neutral-300 w-96 shadow flex justify-center items-center flex-col gap-4 rounded-lg h-96">
          <video src={formData.video ? URL.createObjectURL(formData.video) : "#"} controls></video>
          </div>
          <div className="bg-neutral-300 w-96 shadow flex justify-center items-center flex-col gap-4 rounded-lg h-96">
          <video src="https://res.cloudinary.com/dqakrlfun/video/upload/e_preview:duration_6:max_seg_3/hogg4urbufblbdgxv1xl.mp4" controls></video>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4 py-4 flex-wrap">
          <button
          className="px-6 py-3 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-lg shadow-md hover:from-red-500 hover:via-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300"
          onClick={() => alert("Video deleted!")}
          >
          Delete Video
          </button>
          <button
          className="px-6 py-3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg shadow-md hover:from-green-500 hover:via-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-300"
          onClick={() => alert("Video downloaded!")}
          >
          Download Video
          </button>
        </div>
        </div>
      ) : (
        <div></div>
      )}
      </div>
    );
  }
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
