import LoaderSmall from "@/components/ui/LoaderSmall";
import { useAppSelector } from "@/hooks/storeHooks";
import { getUser } from "@/store/slices/userSlice";
import { User } from "@/types/db-derivated-types";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";
import { HiUserAdd } from "react-icons/hi";
import { PiPlus } from "react-icons/pi";

type addState = "idle" | "adding" | "done" | "added";

export default function AddFriendItem({ friend }: { friend: User }) {
  const { username, avatar, id } = friend;
  const queryClient = useQueryClient();
  const [addAction, setAddAction] = useState<addState>("idle");
  const user = useAppSelector(getUser);
  async function handleClick() {
    const requestData = {
      user_id: user.id,
      friend_id: friend.id,
    };
    try {
      setAddAction("adding");
      const data = await fetch(`${location.origin}/routes/friends`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (data.status === 500) throw new Error("Could not add friend");
      setAddAction("done");
      setTimeout(() => setAddAction("added"), 1000);
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    } catch (err: any) {
      toast.error(err.message);
      setAddAction("idle");
    }
  }
  return (
    <li className="flex items-center gap-3 py-4">
      <div className="relative w-8 h-8">
        {avatar ? (
          <Image
            src={avatar}
            alt={`${username} avatar`}
            fill
            className="rounded-full"
          />
        ) : (
          <HiUserAdd className="w-8 h-8" />
        )}
      </div>
      <span>{username}</span>
      <span className="ml-auto">
        {addAction === "idle" ? (
          <PiPlus
            onClick={handleClick}
            className="ml-auto cursor-pointer hover:text-indigo-600 transition-all duration-150"
          />
        ) : addAction === "adding" ? (
          <LoaderSmall />
        ) : (
          addAction !== "added" && <CheckmarkIcon />
        )}
      </span>
    </li>
  );
}
