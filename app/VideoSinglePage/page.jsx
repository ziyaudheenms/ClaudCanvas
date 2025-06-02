"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImageDown } from "lucide-react";
import { Trash2 } from "lucide-react";
import { CreditCard } from 'lucide-react';
import { saveAs } from 'file-saver';
function page() {
  const { user, isLoaded } = useUser();
  const [Data, SetData] = useState([]);
  const [Load, setLoad] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const Id = localStorage.getItem("Video_ID");
    const CollectData = () => {
      if (user) {
        axios
          .post(`http://localhost:8000/api/v1/media/view/myVideo/${Id}/`, {
            username: user.username,
          })
          .then((response) => {
            console.log(response.data.data);
            SetData(response.data.data);
            setLoad(true);
            router.refresh()
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("No user Available");
      }
    };
    CollectData();
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <img src="/Processing.gif" alt="" />
      </div>
    );
  } else {
    return (
      <div className="font-sans p-5 bg-gradient-to-b from-gray-50 to-gray-200 text-gray-800 min-h-screen">
        <h1 className="text-center text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-extrabold mb-12">
          🎥 Video Transformation Hub 🎥
        </h1>
        
        <div className="flex flex-between justify-center mt-8 flex-wrap mx-auto gap-10">
          <h3 className="scroll-m-20  pb-2 text-xl font-semibold tracking-tight first:mt-0">
            Username: <span className="text-gray-600">{Data.user}</span>
          </h3>
          <h3 className="scroll-m-20  pb-2 text-xl font-semibold tracking-tight first:mt-0">
         Title: <span className="text-gray-600">{Data.title}</span>
          </h3>
          <h3 className="scroll-m-20  pb-2 text-xl font-semibold tracking-tight first:mt-0">
         Transformation: <span className="text-gray-600">{Data.process_type}</span>
          </h3>
        </div>
        <div className="flex justify-around mt-8 flex-wrap mx-auto gap-12">
          <div
            className="text-center w-full sm:w-1/2 lg:w-2/5 flex justify-center items-center flex-col bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300"
            style={{
              boxShadow:
                "0 8px 16px rgba(128, 90, 213, 0.3), 0 4px 8px rgba(236, 72, 153, 0.3)",
            }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-purple-500 pb-3">
              Uploaded Video
            </h2>
            <video
              src={Load ? Data.video_file : "#"}
              alt="Uploaded"
              className="border-4 border-gray-300 rounded-lg w-[90%] h-auto shadow-lg"
              controls
            />
          </div>
          <div
            className="text-center w-full sm:w-1/2 lg:w-2/5 bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300"
            style={{
              boxShadow:
                "0 8px 16px rgba(249, 115, 22, 0.3), 0 4px 8px rgba(234, 88, 12, 0.3)",
            }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-orange-500 pb-3">
              Transformed Video
            </h2>
            <video
              src={Load ? Data?.transformed_video_file : "#"}
              alt="Transformed"
              className="border-4 border-gray-300 rounded-lg w-full h-auto shadow-lg"
              controls
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4 py-4 flex-wrap">
                      <Button
                        className="px-6 py-3 text-white transition-all duration-300"
                        onClick={() => alert("Image deleted!")}
                      >
                        <Trash2 />
                        Delete Video
                      </Button>
                      <Button
                        className="px-6 py-3 text-white bg-[#1d4ed8]  rounded-lg shadow-md focus:outline-none focus:ring-2  transition-all duration-300"
                        onClick={() => {
                          saveAs(Data.transformed_video_file, "video.mp4");
                        }}
                      >
                        <ImageDown />
                        Download Video
                      </Button>
                    </div>
        <div
          className="mt-12 text-center bg-white shadow-2xl rounded-2xl p-8 w-[90%] mx-auto transform hover:scale-105 transition-transform duration-300"
          style={{
            boxShadow:
              "0 8px 16px rgba(59, 130, 246, 0.3), 0 4px 8px rgba(37, 99, 235, 0.3)",
          }}
        >
           <h3 className="scroll-m-20 gap-2 flex items-center justify-center  pb-2 text-xl font-semibold tracking-tight first:mt-0">
                      <CreditCard /> Credits Used: <span className="text-gray-600">4</span>
                    </h3>
        </div>
      </div>
    );
  }
}

export default page;
