"use client";
import { useRef, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { HiPause, HiPlay } from "react-icons/hi2";
import { MdSpeed } from "react-icons/md";

const RECURSION_SPEED = 1500;

const leftCallStackTitles = [
  "printRecursively(arr,4)",
  "printRecursively(arr,3)",
  "printRecursively(arr,2)",
  "printRecursively(arr,1)",
  "printRecursively(arr,0)",
  "printRecursively(arr,-1)",
];

const rightCallStackTitles = [
  "printAfterRecursion(arr,4)",
  "printAfterRecursion(arr,3)",
  "printAfterRecursion(arr,2)",
  "printAfterRecursion(arr,1)",
  "printAfterRecursion(arr,0)",
  "printAfterRecursion(arr,-1)",
];

let callsLeft = 0;
let callsRight = 0;
let returnCallsCalled = 0;
const numOfEls = 6;

export default function RecursionVisualizator() {
  let timeout = useRef<ReturnType<typeof setInterval>>();
  const [callStackLeft, setCallStackLeft] = useState<string[]>([]);
  const [callStackRight, setCallStackRight] = useState<string[]>([]);
  const [selectedStack, setSelectedStack] = useState<"left" | "right">("left");
  const [returningCalls, setReturningCalls] = useState(-2);
  const [speed, setSpeed] = useState(1);

  function handleAnimate() {
    // LEFT --------------------------
    if (selectedStack === "left") {
      if (callStackLeft.length === numOfEls) {
        setCallStackLeft([]);
        callsLeft = 0;
        return;
      }
      timeout.current = setInterval(function () {
        if (callsLeft === 6) {
          clearInterval(timeout.current);
          return;
        }
        setCallStackLeft((stack) => [
          ...stack,
          leftCallStackTitles[stack.length],
        ]);
        callsLeft++;
      }, RECURSION_SPEED / speed);
    }
    // RIGHT -----------------------------
    else {
      if (callStackRight.length === numOfEls) {
        setCallStackRight([]);
        callsRight = 0;
        return;
      }
      timeout.current = setInterval(function () {
        if (callsRight === 6) {
          clearInterval(timeout.current);

          timeout.current = setInterval(function () {
            if (returnCallsCalled === 5) {
              clearInterval(timeout.current);
              return;
            }
            setReturningCalls((calls) => {
              return calls === -2 ? callsRight - 2 : calls - 1;
            });
            returnCallsCalled++;
          }, RECURSION_SPEED / speed);
          return;
        }
        setCallStackRight((stack) => [
          ...stack,
          rightCallStackTitles[stack.length],
        ]);
        callsRight++;
      }, RECURSION_SPEED / speed);
    }
  }

  function handleStop() {
    clearInterval(timeout.current);
  }
  return (
    <>
      <div className="flex items-center justify-between w-full gap-10">
        <div className="flex items-center gap-4">
          <button
            onClick={handleAnimate}
            className="flex items-center gap-2 bg-violet-600 rounded-xl px-3 py-1 cursor-pointer hover:bg-white hover:text-violet-600 border-2 hover:border-violet-600 transition-all duration-300"
          >
            {(selectedStack === "left" && callStackLeft.length < numOfEls) ||
            (selectedStack === "right" &&
              callStackRight.length < numOfEls &&
              returningCalls < 0) ? (
              <>
                <span>Animate</span>
                <HiPlay />
              </>
            ) : (
              <>
                <span>Reset</span>
                <HiRefresh />
              </>
            )}
          </button>
          <button
            onClick={handleStop}
            className="flex items-center gap-2 bg-gray-100 rounded-xl border-2 px-3 py-1  cursor-pointer hover:text-violet-600 transition-all duration-300"
          >
            <span>Stop animation</span>
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
        <div
          className={`flex-grow max-w-96 p-4 rounded-lg border-[1px]  border-violet-400 text-center relative text-gray-500`}
        >
          <p>
            {timeout.current && selectedStack === "left"
              ? callStackLeft?.length < numOfEls
                ? `prints ${numOfEls - callStackLeft.length} = arr[${
                    numOfEls - callStackLeft.length - 1
                  }]`
                : "returns"
              : ""}
            {timeout.current && selectedStack === "right"
              ? callStackRight?.length < numOfEls && returningCalls === -1
                ? `calls printAfterRecursion(arr,${
                    numOfEls - callStackRight.length - 1
                  })`
                : returningCalls > -1
                ? `prints ${returningCalls + 1} =  arr[${returningCalls}]`
                : "returns"
              : ""}
          </p>
          <p className="absolute bg-white px-1 -top-3 text-violet-400 left-1/2 -translate-x-1/2 ">
            Call log
          </p>
        </div>
      </div>
      <div className="flex justify-around items-center mt-40">
        <ul
          onClick={() => setSelectedStack("left")}
          className={`cursor-pointer flex flex-col-reverse gap-1 w-48 h-64 p-1 rounded-b-md border-2 border-t-0 ${
            selectedStack === "left" && "border-violet-500"
          } relative`}
        >
          {callStackLeft.map((call, i) => (
            <li
              key={i}
              className={`w-full ${
                i === callStackLeft.length - 1 && selectedStack === "left"
                  ? "bg-violet-700"
                  : "bg-gray-100"
              } rounded-lg p-2 animate-in-custom text-sm text-center`}
            >
              {call}
            </li>
          ))}

          <p
            className={`absolute -bottom-10 left-1/2 -translate-x-1/2 ${
              selectedStack === "left" ? "text-violet-500" : "text-gray-400"
            }`}
          >
            printRecursively
          </p>
        </ul>
        <ul
          onClick={() => setSelectedStack("right")}
          className={`cursor-pointer flex flex-col-reverse gap-1 w-48 h-64 p-1 rounded-b-md border-2 border-t-0 ${
            selectedStack === "right" && "border-violet-500"
          } relative`}
        >
          {callStackRight.map((call, i) => (
            <li
              key={i}
              className={`w-full ${
                (returningCalls === -2
                  ? i === callStackRight.length - 1
                  : returningCalls === i) && selectedStack === "right"
                  ? "bg-violet-700"
                  : "bg-gray-100"
              } rounded-lg p-2 animate-in-custom text-sm text-center`}
            >
              {returningCalls > -2 && returningCalls === i
                ? `cout << ${i + 1}`
                : call}
            </li>
          ))}

          <p
            className={`absolute -bottom-10 left-1/2 -translate-x-1/2 ${
              selectedStack === "right" ? "text-violet-500" : "text-gray-400"
            }`}
          >
            printAfterRecursion
          </p>
        </ul>
      </div>
    </>
  );
}
