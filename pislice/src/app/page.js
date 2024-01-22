"use client";

import Image from "next/image";
import NavBar from "@/components/navbar.js";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import BarChart from "@/components/Barcharts";
import PieChart from "@/components/PieCharts";
import LineGraph from "@/components/LineGraph";
import { useEffect, useState } from "react";
import { type } from "os";
import { userAgent } from "next/server";

export default function Home() {
  const [reviews, setReviews] = useState({});
  const [pichart, setPichart] = useState([]);
  const [barChart, setBarChart] = useState([]);
  const [storeOrderData, setStoreOrderData] = useState({});
  const [totalmoney, setTotalMoney] = useState(0);
  const [OrderType, setOrderType] = useState({});
  const [stores, setStores] = useState({});

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

  const fetchYearlyRev = async (year) => {
    try {
      const response = await fetch("/api/order/totalsale/" + year);
      const data = await response.json();
      setTotalMoney(data);
    } catch (error) {
      console.error("Error Reviews", error);
    }
  };

  const fetchPizzatype = async (type) => {
    try {
      const response = await fetch("/api/order/store/" + type);
      const data = await response.json();
      setStoreOrderData(data);
    } catch (error) {
      console.error("Error pizza order type", error);
    }
  };
  const fetchStoreOrder = async () => {
    try {
      const response = await fetch("/api/order/store");
      const data = await response.json();
      setStoreOrderData(data);
    } catch (error) {
      console.error("Error StoreOder", error);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await fetch("/api/stores");
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error("Error Stores", error);
    }
  };
  useEffect(() => {
    fetchReviews();
    fetchStores();
    fetchStoreOrder();
    fetchYearlyRev("2023");
  }, []);

  useEffect(() => {
    setPichart(cleanReviews(reviews));
  }, [reviews]);

  useEffect(() => {
    setBarChart(cleanNumOrderStore(storeOrderData));
  }, [storeOrderData]);

  const setReviewCity = async (city) => {
    try {
      const response = await fetch("/api/reviews/" + city);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error Review by city", error);
    }
  };

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
            <div className="  p-10 flex flex-col w-full h-full   ">
              <div className="flex flex-row justify-between mr-10 ml-10">
                <div className="bg-white p-4 shadow-xl rounded-xl">
                  <div className="">
                    <select
                      onChange={(e) => {
                        setReviewCity(e.target.value);
                      }}
                      className="bg-gray-400 rounded-xl  pl-1 pr-"
                    >
                      {Object.keys(stores).map((key) => (
                        <option key={key} value={stores[key]}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-[400px] h-[400px] ">
                    {pichart && <PieChart test={pichart} />}
                  </div>
                </div>
                <div className="bg-white p-4 shadow-xl rounded-xl">
                  <div className="">
                    <select
                      onChange={(e) => {
                        fetchPizzatype(e.target.value);
                      }}
                      className="bg-gray-400 rounded-xl  pl-1 pr-"
                    >
                      <option value={"*"}>All</option>
                      <option value={"Cheese"}>Cheese</option>
                      <option value={"Pepperoni"}>Pepperoni</option>
                      <option value={"Deluxe"}>Deluxe</option>
                      <option value={"Deluxe"}>Deluxe</option>
                      <option value={"Meatlovers"}>Meatlovers</option>
                    </select>
                  </div>

                  <div className="w-[700px] h-[350px] ">
                    {barChart && <BarChart atrributes={barChart} />}
                  </div>
                </div>
              </div>

              <div className="flex flex-row pt-10 mr-10 ml-10">
                <div className="bg-white p-4 shadow-xl rounded-xl">
                  <div className="w-[600px] h-[300px] ">
                    <LineGraph />
                  </div>
                </div>
                <div className="bg-white p-4 text-black shadow-xl rounded-xl">
                  {totalmoney && <p>Total money made in 2023 {totalmoney}</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100*/}
        <section
          id="contact-us"
          className="min-h-screen  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-orange-100 via-gray-100 to-purple-800 min-w-screen flex flex-col"
        >
          <div className=" font-bold  flex text-[50px]  shadow-xl justify-center">
            <p className="text-transparent bg-clip-text bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-600 via-red-200 to-yellow-100">
              Contact Us
            </p>
          </div>
          <div className="flex justify-center items-center">
            <form className="bg-white shadow-xl rounded-xl mt-10   ">
              <div className="flex flex-col items-center">
                <div className="flex flex-row items-end">
                  <div className="p-5">
                    <label
                      for="first-name"
                      className=" font-bold text-gray-700"
                    >
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="outline-black outline-4 m-4 p-2 shadow-xl text-black rounded-md"
                      placeholder="First Name"
                    ></input>
                  </div>
                  <div className="p-5">
                    <label for="last-name" className="text-gray-700 font-bold">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="outline-black outline-4 m-4 p-2 shadow-xl text-black rounded-md"
                      placeholder="First Name"
                    ></input>
                  </div>
                </div>
                <div className="flex flex-row items-end ">
                  <div className="p-5">
                    <label for="email" className=" font-bold text-gray-700">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      pattern=".+@example\.com"
                      className="outline-black outline-4 m-4 p-2 shadow-xl text-black rounded-md"
                      placeholder="First Name"
                    ></input>
                  </div>
                  <div className="p-5">
                    <label for="phone" className=" font-bold text-gray-700">
                      Phone Number:
                    </label>
                    <input
                      type="number"
                      id="phone"
                      pattern=".+@example\.com"
                      className="outline-black outline-4 m-4 p-2 shadow-xl text-black rounded-md"
                      placeholder="First Name"
                    ></input>
                  </div>
                </div>
                <div className="">
                  <div className="p-5 flex flex-col">
                    <label for="message" className=" font-bold text-gray-700">
                      Message:
                    </label>
                    <textarea
                      type="number"
                      id="message"
                      pattern=".+@example\.com"
                      className="outline-black outline-4 m-4 p-2 shadow-xl text-black rounded-md"
                      placeholder="First Name"
                    ></textarea>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-300 to-purple-400 rounded-lg font-bold text-2xl  p-3 mb-5 mb-5shadow-xl ">
                  <input type="submit" value="Submit" text="submit" />
                </div>
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
  return [label, numericalData];
}

function cleanNumOrderStore(storeOrderData) {
  const label = Object.keys(storeOrderData);
  var numericalData = new Array();
  for (let i = 0; i < label.length; i++) {
    numericalData.push(storeOrderData[label[i]]);
  }
  return [label, numericalData];
}
