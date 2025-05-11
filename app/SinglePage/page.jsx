"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
function page() {
  const { user, isLoaded } = useUser();
  const [Data, SetData] = useState([]);
  const [Load, setLoad] = useState(false);
  useEffect(() => {
    const Id = localStorage.getItem("imageId");
    const CollectData = () => {
        if (user) {
            axios
        .post(`http://localhost:8000/api/v1/media/view/myImages/${Id}/`, {
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
      <div className="font-sans p-5 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 min-h-screen">
        <h1 className="text-center text-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text font-extrabold mb-10">
          🌟 Image Transformation Hub 🌟
        </h1>
        <div className="flex justify-around mt-8 flex-wrap mx-auto gap-10">
          <div
            className="text-center w-full sm:w-1/2 lg:w-2/5 flex justify-center items-center flex-col bg-white shadow-xl rounded-xl p-6 transform hover:scale-105 transition-transform duration-300"
            style={{
              boxShadow:
                "0 4px 6px rgba(128, 90, 213, 0.3), 0 1px 3px rgba(236, 72, 153, 0.3)",
            }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-5 border-b-4 border-pink-500 pb-3">
              Uploaded Image
            </h2>
            <img
              src={Load ? Data.image_file : "#"}
              alt="Uploaded"
              className="border-4 border-gray-300 rounded-lg w-[90%] h-auto shadow-lg"
            />
          </div>
          <div
            className="text-center w-full sm:w-1/2 lg:w-2/5 bg-white shadow-xl rounded-xl p-6 transform hover:scale-105 transition-transform duration-300"
            style={{
              boxShadow:
                "0 4px 6px rgba(249, 115, 22, 0.3), 0 1px 3px rgba(234, 88, 12, 0.3)",
            }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-5 border-b-4 border-orange-500 pb-3">
              Transformed Image
            </h2>
            <img
              src={Load ? Data?.processed_image.replace("http://localhost:8000/media/https%3A", "https:/") : "#"}
              alt="Transformed"
              className="border-4 border-gray-300 rounded-lg w-full h-auto shadow-lg"
            />
          </div>
        </div>
        <div
          className="mt-12 text-center bg-white shadow-xl rounded-xl p-6 w-[90%] mx-auto transform hover:scale-105 transition-transform duration-300"
          style={{
            boxShadow:
              "0 4px 6px rgba(59, 130, 246, 0.3), 0 1px 3px rgba(37, 99, 235, 0.3)",
          }}
        >
          <h3 className="text-xl font-semibold mb-3">
            📌 Title: <span className="text-gray-600">{Data.title}</span>
          </h3>
          <h3 className="text-xl font-semibold">
            💳 Credits Used: <span className="text-gray-600">2</span>
          </h3>
        </div>
      </div>
    );
  }
  
  
}

export default page;
