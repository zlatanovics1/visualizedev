"use client";

import { editUserData } from "@/app/actions/settings/action";
import SaveChangesButton from "@/components/ui/SaveChangesButton";
import { User } from "@/types/db-derivated-types";
import Image from "next/image";
import { MutableRefObject, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";

export default function SettingsForm({ user }: { user: User }) {
  const [username, setUsername] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");
  const fileRef =
    useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;

  async function handleSubmit(formData: FormData) {
    const success = (await editUserData(formData))?.success || true;
    if (!success) toast.error("Could not update user info");
    else toast.success("Updated user info successfully!");
    setIsLoading(false);
  }

  return (
    <form
      className="md:px-4 mb-20"
      action={handleSubmit}
      onSubmit={() => setIsLoading(true)}
    >
      <div className="flex items-center gap-10 md:flex-row flex-col">
        <div className="group relative w-40 h-40 overflow-hidden rounded-full cursor-pointer">
          {user.avatar ? (
            <Image
              src={user.avatar}
              fill
              alt={user.username + " avatar"}
              className="peer"
            />
          ) : (
            <FaUserCircle className="w-full h-full peer" />
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            name="usersImage"
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
          <label
            onClick={() => fileRef.current.click()}
            htmlFor="usersImage"
            aria-label="Change image"
            className="bg-gray-800/50 absolute inset-0 z-20 rounded-full  items-center justify-center  hidden group-hover:flex"
          >
            <HiPencil className="hover:text-indigo-600 w-6 h-6" />
          </label>
        </div>
        <div>
          <input
            onChange={(e) =>
              e.target.value.length >= 6 && setUsername(e.target.value)
            }
            onBlur={(e) =>
              e.target.value.length < 6 &&
              toast.error("Username has to be at least 6 characters long!")
            }
            type="text"
            id="usersname"
            name="username"
            defaultValue={user.username}
            className="px-3 py-1  bg-gray-50 text-gray-400 rounded-md cursor-pointer focus:ring-[1px] focus:ring-indigo-600 outline-none max-w-40"
          />
          <label htmlFor="usersname" aria-label="Change name"></label>
          <br />
          <textarea
            id="usersdesc"
            name="usersdesc"
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={user.description || "Add description..."}
            className="mt-4 px-3 py-1 resize-none bg-gray-50 text-gray-400 rounded-md cursor-pointer focus:ring-[1px] focus:ring-indigo-600 outline-none"
          />
          <label htmlFor="usersdesc" aria-label="Change description"></label>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-8">
        {(username || desc || file) && <SaveChangesButton />}
        {isLoading && (
          <BiLoaderAlt className="animate-spin text-indigo-600 w-6 h-6" />
        )}
      </div>
    </form>
  );
}
