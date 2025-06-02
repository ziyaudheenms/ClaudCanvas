"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Banner } from "@/elements/Banner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { TvMinimalPlay } from "lucide-react";
import { LogOut } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Store } from 'lucide-react';
import { ImagePlus } from "lucide-react";
import { Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bitcoin } from 'lucide-react';
import { FileImage } from 'lucide-react';
import { Video } from 'lucide-react';
export default function Home() {
  const { user, isLoaded } = useUser();

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

  //  const router = useRouter();
  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      await fetch(
        "https://claudcanvas-backend.onrender.com/api/v1/auth/create/user/sync-user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.emailAddresses[0].emailAddress,
            username: user.username || user.id,
          }),
        }
      );
    };
    if (!isLoaded || !user) return;
    syncUser();
    const verify = async () => {
      try {
        const response = await axios.post(
          // "https://claudcanvas-backend.onrender.com/api/v1/media/Process/verify/",
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
          localStorage.setItem("user", user.username);
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
        "mx-auto flex w-full  flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-white md:flex-row dark:border-neutral-700 dark:bg-neutral-800 text-xl",
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
                label: "Store",
                href: "/Profile",
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
  const [userImage, setUserImage] = useState([]);
  const [data, setData] = useState();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const ViewImages = () => {
    if (user && user.username) {
      axios
        .post(
          "https://claudcanvas-backend.onrender.com/api/v1/media/view/myImages/",
          {
            username: user.username, // fallback if username is null
          }
        )
        .then((responce) => {
          console.log(responce.data.message);
          setUserImage(responce.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No user Available");
    }
  };
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

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      await fetch(
        "https://claudcanvas-backend.onrender.com/api/v1/auth/create/user/sync-user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.emailAddresses[0].emailAddress,
            username: user.username || user.id,
          }),
        }
      );
    };
    if (!isLoaded || !user) return;
    syncUser();
    const verify = async () => {
      try {
        const response = await axios.post(
          // "https://claudcanvas-backend.onrender.com/api/v1/media/Process/verify/",
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
          ViewImages();
          fetchUserData();
        } else {
          console.log("Final verification failed", response);
        }
      } catch (err) {
        console.error("Verification error:", err);
      }
    };

    verify();
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <img src="/Processing.gif" alt="" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-1 overflow-y-scroll">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-5 dark:border-neutral-700 dark:bg-neutral-900">
          <Banner />
           <div className="flex justify-between flex-wrap   my-3">
                      <Card className="border  py-10 px-10 rounded-xl w-full md:w-[49%] xl:w-[30%] my-5 md:my-0 ">
                        <h1 className="scroll-m-20 text-xl font-medium tracking-normal">Credits Available</h1>
                        <div className="flex items-center gap-2">
                          <Bitcoin className="h-10 w-10"/>
                          <h1>{data?.credits}</h1>
                        </div>
                      </Card>
                      <Card className="border   py-10 px-10 rounded-xl w-full md:w-[49%] xl:w-[30%] my-5 md:my-0">
                        <h1 className="scroll-m-20 text-xl font-medium tracking-normal">Image Manupulations</h1>
                        <div className="flex items-center gap-2">
                          <FileImage className="h-10 w-10"/>
                          <h1>{data?.images_manipulated}</h1>
                        </div>
                      </Card>
                      <Card className="border   py-10 px-10 rounded-xl w-full md:w-[49%] xl:w-[30%] my-5 md:my-0">
                        <h1 className="scroll-m-20 text-xl font-medium tracking-normal">Video Manupulations</h1>
                        <div className="flex items-center gap-2">
                          <Video className="h-10 w-10"/>
                          <h1>{data?.video_manipulated}</h1>
                        </div>
                      </Card>
                    </div>
          <div className="flex justify-between items-center mt-2">
            <h1 className="md:ml-2 leading-7 [&:not(:first-child)]:mt-6">
              Recent Works
            </h1>
            <Link href={"/Images"}>
              <Button>
                {" "}
                <Upload />
                Upload
              </Button>
            </Link>
          </div>
          <div className="py-3 flex gap-3 flex-wrap justify-center items-center">
            {userImage.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  localStorage.setItem("imageId", item.id);
                  router.push("/SinglePage");
                }}
                className="cursor-pointer"
              >
                <ImageCard
                  imageUrl={item.processed_image.replace(
                    "https://claudcanvas-backend.onrender.com/media/https%3A",
                    "https:/"
                  )}
                  title={item.title}
                  size={item.process_type}
                  date={item.uploaded_at}
                />
              </div>
            ))}
          </div>
          {/* <div>
            <div className="flex items-center  justify-center gap-4 overflow-x-scroll">
              <div className="md:ml-2 flex flex-col justify-center items-center border border-gray-300 rounded-lg p-2 h-36 w-56">
                <SendToBack className="h-20 w-20"/>
                <h5 className="text-center ">Background Removal</h5>
              </div>
              <div className="md:ml-2 flex flex-col justify-center items-center border border-gray-300 rounded-lg p-2 h-36 w-56">
                <Replace className="h-20 w-20"/>
                <h5 className="text-center ">Generative Replace</h5>
              </div>
              <div className="md:ml-2 flex flex-col justify-center items-center border border-gray-300 rounded-lg p-2 h-36 w-56">
                <Crop className="h-20 w-20"/>
                <h5 className="text-center ">Content Aware Crop</h5>
              </div>
              <div className="md:ml-2 flex flex-col justify-center items-center border border-gray-300 rounded-lg p-2 h-36 w-56">
                <GalleryThumbnails className="h-20 w-20"/>
                <h5 className="text-center ">Video Preview Generator</h5>
              </div>
              <div className="md:ml-2 flex flex-col justify-center items-center border border-gray-300 rounded-lg p-2 h-36 w-56">
                <PaintBucket className="h-20 w-20"/>
                <h5 className="text-center ">Generative Image Fill</h5>
              </div>
              <div className="md:ml-2 flex flex-col justify-center items-center border border-gray-300 rounded-lg p-2 bg-[#2563eb] h-36 w-56">
                <ClipboardPlus className="h-20 w-20"/>
                <h5 className="text-center ">And More Features</h5>
              </div>
            </div>
            
          </div> */}
        </div>
      </div>
    );
  }
};
const ImageCard = ({ imageUrl, title, size, date }) => {
  return (
    <div
      className="h-80 w-72 lg:w-70 md:w-80 relative rounded-md border border-gray-300  bg-cover bg-center flex flex-col justify-end p-4"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Badge className="absolute top-1 text-[16px] font-thin">{size}</Badge>
      <div className="text-black font-medium text-[15px] relative z-10 shadow-2xl bg-gradient-to-r from-[#FF0080] to-[#FF8C00]  p-2 rounded-md inline-block">
        <div className="flex flex-row justify-between text-xs mt-1">
          <div className="font-medium text-[14px]">{title}</div>

          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
