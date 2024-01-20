"use client";

import Image from "next/image";
import NavBar from "@/components/navbar.js";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import BarChart from "@/components/Barcharts";
import PieChart from "@/components/PieCharts";
import LineGraph from "@/components/LineGraph";
import { useEffect, useState } from "react";

export default function Home() {
  const [reviews, setReviews] = useState({});
  const [pichart, setPichart] = useState([]);
  useEffect(() => {
    // Code to run when dependencies change
    typewriter();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error Reviews", error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    setPichart(cleanReviews(reviews));
  }, [reviews]);
  return (
    <main className="  scroll-smooth flex min-h-screen min-w-screen bg-gradient-to-r from-rose-100 to-teal-100 flex-col items-center justify-between">
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <div className="bg-gradient-to-r from-rose-100 to-teal-100 flex flex-col w-full min-h-screen">
        <NavBar></NavBar>
        <section className="">
          <div className="">
            <div className="  ">
              <div className="flex w-screen justify-center flex-col h-96  mt-10 items-center">
                <div className="flex flex-row pr-[10%] h-96 mt-48">
                  <h1 className="md:text-[70px] sm:text-[70px] text-gray-600 mt-2 font-bold ">
                    Slice of PI
                  </h1>
                  <img
                    src="/images/Pizza-icon.png "
                    className=" hover:animate-spin  md:w-48 md:h-48 sm:w-4 sm:h-4"
                  />
                </div>
                <p
                  className="font-bold text-gray-700 text-[70px]"
                  id="type"
                ></p>
              </div>
            </div>
            <div>
              <img
                src="/images/store2.png"
                className="md:w-[500px] md:h-[500px]   sm:w-[100px] sm:h-[100px]"
              />
            </div>
          </div>
        </section>
        <section id="data" className="min-h-screen  bg-white  min-w-screen">
          <div className="h-full">
            <div className=" font-bold  flex text-[50px]  shadow-xl justify-center">
              <p className=" text-transparent bg-clip-text bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-emerald-500 via-rose-200 to-blue-700">
                Data
              </p>
            </div>
            <div className="  p-10 flex flex-row w-full h-full justify-between ">
              <div className="w-[700px] h-[350px]">
                <BarChart />
              </div>
              <div className="w-[400px] h-[350px]">
                {pichart && <PieChart test={pichart} />}
              </div>
              <div className="w-[400px] h-[350px]">
                <LineGraph />
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact-us"
          className="min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-yellow-200 via-pink-200 to-pink-400 min-w-screen flex flex-col"
        >
          <div className="text-gray-500 font-bold  flex text-[50px]  shadow-xl justify-center">
            <h1>Contact Us</h1>
          </div>
          <div className="flex justify-center items-center">
            <form className="bg-white shadow-xl rounded-xl mt-10 w-96 h-96 ">
              <div className="p-5">
                <label for="first-name" className="text-black">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="outline-black outline-4 m-4 shadow-xl text-black rounded-md"
                  placeholder="First Name"
                ></input>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

function typewriter() {
  const words = ["[Pie charts", "[Line Graph", "[Bar Graph", "[Data Hub]"];
  const tag = document.getElementById("type");
  let currentWordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[currentWordIndex];
    const part = isDeleting
      ? currentWord.slice(0, charIndex--)
      : currentWord.slice(0, charIndex++);
    tag.textContent = part;

    if (!isDeleting && charIndex === currentWord.length + 1) {
      // End of word reached, start deleting for all but last word
      if (currentWordIndex < words.length - 1) {
        isDeleting = true;
        // Add a pause before deleting
        setTimeout(type, 500);
      }
    } else if (isDeleting && charIndex === 1) {
      // Word completely deleted, move to next word
      isDeleting = false;
      currentWordIndex++;
      if (currentWordIndex === words.length - 1) {
        // Typing the last word, no deletion after
        setTimeout(type, 100);
      } else {
        // Add a pause before typing next word
        setTimeout(type, 500);
      }
    } else {
      // Continue typing or deleting
      setTimeout(type, 100);
    }
  }

  type(); // Start the typewriter effect
}

function cleanReviews(reviewsData) {
  const label = Object.keys(reviewsData);
  var numericalData = new Array();
  for (let i = 0; i < label.length; i++) {
    numericalData.push(reviewsData[label[i]]);
  }
  console.log(numericalData);
  return [label, numericalData];
}
