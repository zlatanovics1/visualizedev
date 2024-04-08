"use client";

import { MutableRefObject, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { sendMessage } from "@/app/actions/chat/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getClientUserData } from "@/utils/auth/getClientUserData";

import MessageInputSkeleton from "./MessageInputSkeleton";
import toast from "react-hot-toast";
import { HiFolderAdd } from "react-icons/hi";
import { HiOutlineDocument } from "react-icons/hi2";
import { MdSend } from "react-icons/md";

import { MessageType } from "@/types/db-derivated-types";
import { QueryData } from "@/types/react-query-types";
import { setQueryClientData } from "@/utils/messages/setQueryClientData";

export default function MessageInput() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getClientUserData,
  });

  const params = useParams();
  const [file, setFile] = useState("");
  const queryClient = useQueryClient();
  const formRef = useRef() as MutableRefObject<HTMLFormElement>;

  if (isLoading) return <MessageInputSkeleton />;
  function handleClick(e: React.MouseEvent) {
    if (!user?.id)
      toast.error(
        "Only logged in users can send messages. Log in to start a discussion",
        { position: "bottom-right" }
      );
  }

  async function handleSubmit(formData: FormData) {
    const text = formData.get("message") as string;
    const fileData = formData.get("file") as File;
    if (!user || !(text || fileData)) return;
    formRef.current?.reset();

    const queryData: QueryData | undefined = queryClient.getQueryData([
      `${params.channelId || "global"} messages`,
    ]);
    const file = formData.get("file") as File;
    const fileName = file.size ? `${user?.id}-${file.name}` : null;

    const newMessage: MessageType = {
      id: queryData?.pages[0]?.data[0]?.id
        ? queryData?.pages[0]?.data[0].id! + 1
        : 1,
      author_id: user!.id,
      created_at: new Date().toISOString(),
      channel_id: Number(params.channelId) || null,
      file:
        fileName &&
        (params.channelId
          ? process.env.NEXT_PUBLIC_CHANNELS_BUCKET_URL!
          : process.env.NEXT_PUBLIC_UPLOAD_BUCKET_URL!) + fileName,
      is_edited: false,
      text: formData.get("message") as string,
      users: user,
    };

    setQueryClientData(queryClient, newMessage, params.channelId as string);

    // const messageList = document.querySelector(".message-list")!;
    // messageList.scrollTop = messageList.scrollHeight;
    await sendMessage(formData);
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-row-reverse py-2 items-center gap-2  px-4 bg-gray-50 border-t-2 relative"
    >
      <label htmlFor="message" className="hidden" aria-label="send a message">
        Send a message
      </label>
      <input
        disabled={!user?.id}
        type="text"
        name="message"
        id="message"
        aria-label="send a message"
        className="py-2 w-full max-w-xl px-4 rounded-full bg-white text-gray-500 shadow-md border-[1px]"
        // placeholder={`${
        //   user?.id
        //     ? "Send a message..."
        //     : "Only logged in users can send messages!"
        // }`}
      />
      <input
        disabled={!user?.id}
        type="file"
        id="file"
        name="file"
        className="w-0 h-0"
        onChange={(e) =>
          setFile(
            (e.target.value.split("\\").pop()!.length > 20
              ? e.target.value.split("\\").pop()?.slice(10).padEnd(13, ".")
              : e.target.value.split("\\").pop()) || e.target.value
          )
        }
      />
      <label htmlFor="file" onClick={handleClick} aria-label="choose file">
        <HiFolderAdd className="w-6 h-6 cursor-pointer hover:text-indigo-600 transition-all duration-300" />
      </label>
      <button
        className="absolute top-8 right-6"
        aria-label="send a message"
        disabled={!user?.id}
      >
        <MdSend />
      </button>
      {file && (
        <span className="flex items-center gap-1">
          <HiOutlineDocument />
          {file}
        </span>
      )}

      <input
        name="channelId"
        id="channelId"
        className="hidden"
        value={params.channelId}
        readOnly
      />
    </form>
  );
}
