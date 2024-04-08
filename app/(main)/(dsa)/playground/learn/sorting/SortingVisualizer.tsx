"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { motion } from "framer-motion";

import toast from "react-hot-toast";
import { MdSpeed } from "react-icons/md";
import { HiPause, HiPlay } from "react-icons/hi";

const SORTING_SPEED = 1000;
const inputRegExp = /\s*-?\d+(\s+-?\d+)*/;
const spring = {
  type: "spring",
  damping: 20,
  stiffness: 100,
};

function toNumberArray(string: string) {
  if (!inputRegExp.test(string)) {
    toast.error("Please enter array in valid format!");
    return [];
  }
  const numArr = string.split(" ").map((number) => Number(number.trim()));

  return numArr;
}

let i = 0;
let swaps = 0;
let timeout: ReturnType<typeof setTimeout>;
let timeouts: ReturnType<typeof setTimeout>[] = [];
// const initialColors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"];

export default function SortingVisualizer() {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [numbers, setNumbers] = useState([1, -1, -2, 5, 2, 9, 0]);
  const [currentIterator, setCurrentIterator] = useState(0);
  const [jod, setJod] = useState(1);
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(1);

  function handleAnimate() {
    setNumbers(toNumberArray(inputRef.current.value));
    i = 0;
    swaps = 0;
    clearTimeout(timeout);
    setActive(true);
    setCurrentIterator(0);
    setJod(1);
  }
  function handleStopContinue() {
    if (active) {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      setActive(false);
    } else {
      setActive(true);
    }
  }

  useEffect(
    function () {
      if (!active) return;
      sortingLoop: for (; i < numbers.length - 1; i++) {
        setTimeout(() => setCurrentIterator(i), SORTING_SPEED / speed);

        for (let j = i + 1; j < numbers.length; j++) {
          setTimeout(() => setJod(j), SORTING_SPEED / speed);
          if (numbers[i] > numbers[j]) {
            timeout = setTimeout(() => {
              setNumbers((numbers) => {
                const colorsTemp = numbers.slice();
                // console.log(i, j);
                const temp = colorsTemp[i];
                colorsTemp[i] = colorsTemp[j];
                colorsTemp[j] = temp;

                return colorsTemp;
              });
            }, (SORTING_SPEED / speed) * swaps);
            timeouts.push(timeout);
            swaps++;
            break sortingLoop;
          }
          if (i === numbers.length - 2 && j === numbers.length - 1) {
            setTimeout(function () {
              setCurrentIterator(-1);
              setJod(-1);
            }, swaps * (SORTING_SPEED / speed + 5));
          }
        }
      }
      return () => clearTimeout(timeout);
    },
    [numbers, active]
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={handleAnimate}
          className="flex items-center gap-2 bg-violet-600 rounded-xl px-3 py-1 cursor-pointer hover:bg-white hover:text-violet-600 border-2 hover:border-violet-600 transition-all duration-300"
        >
          <span>Animate</span>
          <HiPlay />
        </button>
        <button
          onClick={handleStopContinue}
          disabled={currentIterator === -1}
          className="flex items-center gap-2 bg-gray-100 rounded-xl border-2 px-3 py-1  cursor-pointer hover:text-violet-600 transition-all duration-300 disabled:pointer-events-none"
        >
          <span>{active ? "Stop animation" : "Continue Animation"}</span>
          <HiPause />
        </button>

        <select
          name="speed"
          id="speed"
          value={speed}
          onChange={(e) => setSpeed(+e.target.value)}
          className="px-4  py-1 rounded-xl border-2 bg-gray-100 cursor-pointer focus:border-transparent focus:outline-2 focus:outline-violet-600 transition-all duration-300"
        >
          <option value={1}>1x</option>
          <option value={0.5}>0.5x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
        <label htmlFor="speed" aria-label="Animation speed">
          <MdSpeed className="w-5 h-5 -ml-2" />
        </label>
      </div>
      <ul className="flex gap-10 items-center justify-center mt-20">
        {numbers.map((number, ind) => (
          <motion.li
            key={number}
            layout
            transition={spring}
            //   style={{ initialColors[i]}}
            className={`w-16 h-16 rounded-xl flex items-center justify-center border-2  ${
              jod === ind &&
              currentIterator !== numbers.length - 1 &&
              "border-red-500 text-red-500"
            } ${
              currentIterator === ind &&
              currentIterator !== numbers.length - 1 &&
              "border-indigo-600 text-indigo-600"
            } ${ind > currentIterator && ind < jod && "border-green-500"}`}
          >
            {number}
          </motion.li>
        ))}
      </ul>
      <div className="relative  max-w-[30rem]">
        <input
          id="nodes"
          className="w-full rounded-md bg-white text-gray-400 px-4 py-2 border-2 focus:outline-violet-500 peer"
          type="text"
          defaultValue={"1 -1 -2 5 2 9 0"}
          ref={inputRef}
        />
        <label
          htmlFor="nodes"
          className={`absolute   bg-white -top-3 text-gray-300 left-3  transition-all duration-300 peer-focus:left-2  peer-focus:text-violet-500`}
        >
          Array
        </label>
      </div>
    </>
  );
}
