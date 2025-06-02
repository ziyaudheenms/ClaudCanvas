"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ImageDown } from "lucide-react";
import { Trash2 } from "lucide-react";
import { CreditCard } from 'lucide-react';
import { saveAs } from 'file-saver';
function page() {
  const Id = localStorage.getItem("imageId");
  const { user, isLoaded } = useUser();
  const [Data, SetData] = useState([]);
  const [Load, setLoad] = useState(false);
   const DeleteImage = () => {
        if (user) {
            axios
        .post(`https://claudcanvas-backend.onrender.com/api/v1/media/Process/Image/delete/${Id}/`, {
          username: user.username,
        })
        .then((response) => {
          console.log(response.data);
          alert("Image Deleted Successfully");
          // Optionally, you can redirect or update the state to reflect the deletion
          window.location.href = "/"; // Redirect to home page or any other page
        })
        .catch((err) => {
          console.log(err);
          alert('error occured');
        });
        }
        else{
            console.log("No user Available");
        }
      
    };
  useEffect(() => {
    const Id = localStorage.getItem("imageId");
    const CollectData = () => {
        if (user) {
            axios
        .post(`https://claudcanvas-backend.onrender.com/api/v1/media/view/myImages/${Id}/`, {
          username: user.username,
        })
        .then((response) => {
          console.log(response.data.data);
          SetData(response.data.data);
          setLoad(true);
        })
        .catch((err) => {
          console.log(err);
        });
        }
        else{
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
    )
    
  } else {
    return (
      <div className="font-sans p-5 bg-white text-gray-800 min-h-screen">
        <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
           Image Transformation Hub 
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
        <div className="flex justify-center items-center mt-8 flex-wrap mx-auto gap-2">
          <div
            className="text-center w-full sm:w-1/2 lg:w-2/5 flex justify-center items-center flex-col bg-white  rounded-xl p-6 "
          >
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Uploaded Image
            </h2>
            <img
              src={Load ? Data.image_file : "#"}
              alt="Uploaded"
              className="border-2 border-gray-200 rounded-lg w-[90%] h-auto shadow-md"
            />
          </div>
          <div
            className="text-center w-full sm:w-1/2 lg:w-2/5 bg-transparent   rounded-xl p-6 "
            
          >
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Transformed Image
            </h2>
            <img
              src={Load ? Data?.processed_image.replace("https://claudcanvas-backend.onrender.com/media/https%3A", "https:/") : "#"}
              alt="Transformed"
              className="border-2 border-gray-200 rounded-lg w-[90%] h-auto shadow-md"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4 py-4 flex-wrap">
              <Button
                className="px-6 py-3 text-white transition-all duration-300"
                onClick={() => DeleteImage()}
              >
                <Trash2 />
                Delete Image
              </Button>
              <Button
                className="px-6 py-3 text-white bg-[#1d4ed8]  rounded-lg shadow-md focus:outline-none focus:ring-2  transition-all duration-300"
                onClick={() => {
                  saveAs(Data.processed_image, "image.png");
                }}
              >
                <ImageDown />
                Download Image
              </Button>
            </div>
        <div
          className="mt-12 text-center bg-white shadow-xl rounded-xl p-6 w-[90%] mx-auto transform hover:scale-105 transition-transform duration-300"
          style={{
            boxShadow:
              "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(37, 99, 235, 0.3)",
          }}
        >
          
          <h3 className="scroll-m-20 gap-2 flex items-center justify-center  pb-2 text-xl font-semibold tracking-tight first:mt-0">
            <CreditCard /> Credits Used: <span className="text-gray-600">2</span>
          </h3>
        </div>
      </div>
    );
  }
  
  
}

export default page;
