"use client";
{
  /* <meta name="viewport" content="width=device-width, initial-scale=1" />; */
}
import Image from "next/image";
import NavBar from "@/components/navbar.js";
import Chart from "chart.js/auto";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Code to run when dependencies change
    typewriter();
  }, []);
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-between">
      <div className="bg-gradient-to-r from-rose-100 to-teal-100  w-full min-h-screen">
        <NavBar></NavBar>
        <div className="">
          <img
            src="/images/store.png"
            className=" absolute mt-96 mr-96  md:w-[500px] md:h-[500px]   sm:w-[100px] sm:h-[100px]"
          />
          <div className="flex w-screen justify-center flex-col items-center mt-10 ">
            <div className="flex flex-row pr-[10%] mt-48">
              <h1 className="md:text-[70px] sm:text-[70px] text-gray-600 mt-2 font-bold ">
                Slice of PI
              </h1>
              <img
                src="/images/Pizza-icon.png "
                className=" hover:animate-spin  md:w-48 md:h-48 sm:w-4 sm:h-4"
              />
            </div>
            <p className="font-bold text-gray-700 text-[70px]" id="type"></p>
          </div>
        </div>
      </div>
    </main>
  );
}

function typewriter() {
  const words = ["Pie charts", "Line Graph", "Bar Graph", "[Data Hub]"];
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
    } else if (isDeleting && charIndex === 0) {
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
