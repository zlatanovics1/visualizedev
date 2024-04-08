"use client";
import { createChannel } from "@/app/actions/channels/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiDocumentAdd } from "react-icons/hi";

export default function AddChannel() {
  const [file, setFile] = useState("");
  return (
    <form
      action={createChannel}
      className=" mx-auto max-w-4xl p-4 rounded-lg border-2 shadow-md flex flex-col gap-4"
    >
      <label htmlFor="channelName">Channel name</label>

      <input
        type="text"
        id="channelName"
        name="channelName"
        className="rounded-xl transition-all duration-300 w-full max-w-96 border-2 mb-4 px-4 py-2 text-gray-400 outline-none  bg-white focus:ring-2 focus:border-transparent focus:ring-indigo-600 "
      />

      <label htmlFor="channelType" className="text-gray-600">
        Channel type
      </label>

      <input
        type="text"
        id="channelType"
        name="channelType"
        className="rounded-xl transition-all duration-300 w-full max-w-96 border-2  mb-4 px-4 py-2 text-gray-400 outline-none  bg-white focus:ring-2 focus:border-transparent focus:ring-indigo-600 "
      />

      <label htmlFor="channelDesc">Channel description</label>
      <textarea
        id="channelDesc"
        name="channelDesc"
        className="rounded-xl transition-all duration-300 w-full max-w-xl border-2 mb-4 px-4 py-2 text-gray-400 outline-none  bg-white focus:ring-2 focus:border-transparent focus:ring-indigo-600 "
      />

      <p>Channel photo</p>
      <label
        htmlFor="channelPhoto"
        className="relative ml-2 px-3 py-1 transition-all duration-300 rounded-xl bg-indigo-600 text-white flex items-center justify-center w-36 gap-2 hover:cursor-pointer hover:ring-2 hover:ring-indigo-600 hover:ring-offset-2 hover:ring-offset-gray-100"
      >
        <span>Choose file</span>
        <HiDocumentAdd />
        <span className="absolute -right-3/4 translate-x-3 text-gray-600">
          {file}
        </span>
      </label>
      <input
        type="file"
        accept="image/png,image/jpeg"
        id="channelPhoto"
        name="channelPhoto"
        className="hidden"
        onChange={(e) => {
          setFile(e.target.value.split("\\").pop() || e.target.value);
        }}
      />

      <button
        onClick={() => toast.loading("Creating channel...")}
        className="self-center  rounded-xl px-8 py-2 border-2 hover:border-indigo-500 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 text-transparent bg-clip-text"
      >
        Create
      </button>
    </form>
  );
}
