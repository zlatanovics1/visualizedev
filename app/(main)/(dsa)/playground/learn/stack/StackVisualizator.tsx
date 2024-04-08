"use client";
import AnimateButton from "@/components/ui/playground/AnimateButton";
import { useRef, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { HiPause, HiPlay } from "react-icons/hi2";
import { MdSpeed } from "react-icons/md";

export default function RecursionVisualizator() {
  const [callStack, setCallStack] = useState<number[]>([]);
  const [topActive, setTopActive] = useState(false);

  function handleTop() {
    setTopActive(true);
    setTimeout(() => {
      setTopActive(false);
    }, 2000);
  }
  function handlePush() {
    setCallStack((stack) => [...stack, stack.length + 1]);
  }

  function handlePop() {
    setCallStack((stack) => stack.slice(0, -1));
  }

  return (
    <>
      <div className="flex flex-col gap-16 justify-center items-center h-full">
        <div
          className={`w-0 h-12 rounded-xl px-4 py-2 flex items-center justify-center transition-all duration-300 text-xl text-gray-400 border-0 ${
            topActive && "w-56 border-2"
          } `}
        >
          {topActive && callStack.at(-1)}
        </div>
        <ul
          className={`cursor-pointer flex flex-col-reverse gap-1 w-48 h-64 p-1 rounded-b-md border-2 border-t-0 border-violet-600 relative `}
        >
          {callStack.map((call, i) => (
            <li
              key={i}
              className={`w-full ${
                i === callStack.length - 1 ? "bg-violet-700" : "bg-gray-100"
              } rounded-lg p-2 animate-in-custom text-sm text-center`}
            >
              {call}
            </li>
          ))}

          <p
            className={`absolute -bottom-10 left-1/2 -translate-x-1/2 
             text-violet-500 `}
          >
            Stack
          </p>
        </ul>

        <div className="flex items-center justify-center gap-16">
          <AnimateButton onClick={handlePush} className="px-5">
            Push
          </AnimateButton>
          <AnimateButton alternate className="px-5" onClick={handleTop}>
            Top
          </AnimateButton>
          <AnimateButton onClick={handlePop} className="px-5">
            Pop
          </AnimateButton>
        </div>
      </div>
    </>
  );
}
