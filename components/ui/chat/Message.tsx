"use client";

import { Likes, MessageType } from "@/types/db-derivated-types";
import { updateLikes } from "@/utils/messages/messagesApi";
import Image from "next/image";
import { memo, useState } from "react";
import { HiUserCircle } from "react-icons/hi2";

function toHoursMins(date: string) {
  const sentDate = new Date(date);
  const hours = String(sentDate.getHours()).padStart(2, "0");
  const mins = String(sentDate.getMinutes()).padStart(2, "0");
  return `${hours}:${mins}`;
}

const Message = memo(function Message({
  channelId,
  message,
  likes,
  sameMin,
  userId,
  sameUser,
  refEl,
}: {
  channelId: number | null;
  message: MessageType;
  likes: Likes[] | undefined;
  userId: string;
  sameMin: boolean;
  sameUser: boolean;
  refEl: ((li: HTMLLIElement) => void) | undefined;
}) {
  const [isLiked, setIsLiked] = useState(function () {
    return likes ? likes.some((like: Likes) => like.user_id === userId) : false;
  });

  const { file: image, text, created_at: createdAt } = message;
  const { username, avatar } = message.users!;

  if (!image && !text) return null;

  const time = toHoursMins(createdAt);
  const reverseDirection = message.author_id === userId;

  async function handleClick(e: React.MouseEvent) {
    await updateLikes(channelId, userId, message.id, isLiked);
    setIsLiked((isLiked: boolean) => !isLiked);
  }
  const numLikes = likes?.length || 0;
  return (
    <li
      ref={refEl}
      className={`flex flex-wrap gap-2 items-end relative ${
        reverseDirection && "flex-row-reverse"
      }`}
    >
      {!sameUser && (
        <>
          <p className={`text-sm  w-full ${reverseDirection && "text-right"}`}>
            {username}
          </p>
        </>
      )}
      {avatar ? (
        <div className="w-10 h-10 overflow-hidden rounded-full relative">
          <Image
            src={avatar}
            width={40}
            height={40}
            priority
            loading="eager"
            alt={`${username} avatar`}
          />
        </div>
      ) : (
        <HiUserCircle className="w-10 h-10" />
      )}
      {image ? (
        <div
          className={`w-60 rounded-xl relative  ${
            text && (reverseDirection ? "rounded-br-sm" : "rounded-bl-sm")
          }`}
        >
          <div onDoubleClick={handleClick} className="relative">
            <div
              className={`relative h-48 overflow-hidden rounded-xl ${
                text && "rounded-b-none"
              }`}
            >
              <Image
                fill
                alt="Image sent by user"
                src={image}
                priority
                loading="eager"
                className="object-cover"
              />
            </div>
            {!text && numLikes > 0 && (
              <span
                className={`absolute text-sm text-red-500 bg-gray-100 p-1 px-2 border-[1px] ${
                  reverseDirection ? "left-2" : "right-2 "
                } -bottom-4 rounded-full`}
              >
                ❤<span className="text-gray-400 ml-2">{numLikes}</span>
              </span>
            )}
          </div>
          {text && (
            <p
              onDoubleClick={handleClick}
              className={`${
                reverseDirection ? "bg-indigo-400 text-gray-200" : "bg-gray-200"
              } p-3 rounded-xl cursor-pointer rounded-t-none`}
            >
              {text}
              {numLikes > 0 && (
                <span
                  className={`flex border-[1px] absolute text-sm text-red-500 bg-gray-100 py-1 px-2 -bottom-4 rounded-full  ${
                    reverseDirection ? "left-2" : "right-2 "
                  }`}
                >
                  ❤<span className="text-gray-400 ml-2">{numLikes}</span>
                </span>
              )}
            </p>
          )}
          {!sameMin && (
            <p
              className={`absolute top-1/2 ${
                reverseDirection ? "-left-16" : "-right-16"
              } -translate-y-1/2 text-gray-300 text-sm`}
            >
              {time}
            </p>
          )}
        </div>
      ) : (
        <p
          onDoubleClick={handleClick}
          className={`click cursor-pointer relative bg-gray-200 p-3 rounded-xl ${
            reverseDirection
              ? "rounded-br-sm bg-indigo-400 text-gray-100"
              : "rounded-bl-sm"
          }`}
        >
          {text}
          {numLikes > 0 && (
            <span
              className={`flex border-[1px] absolute text-xs text-red-500 bg-gray-100 py-1 px-2  -bottom-4 rounded-full ${null}  ${
                text?.length < 6
                  ? reverseDirection
                    ? `${
                        sameMin ? "-left-16" : "-left-28"
                      } translate-x-2 top-3 bottom-auto`
                    : `${
                        sameMin ? "-right-16" : "-right-28"
                      } -translate-x-2 top-3 bottom-auto `
                  : reverseDirection
                  ? "left-3"
                  : "right-3"
              }`}
            >
              ❤<span className="text-gray-400 ml-2">{numLikes}</span>
            </span>
          )}
          {!sameMin && (
            <span
              className={`absolute top-1/2 ${
                reverseDirection ? "-left-12" : "-right-12"
              } -translate-y-1/2 text-gray-300 text-sm`}
            >
              {time}
            </span>
          )}
        </p>
      )}
    </li>
  );
});

export default Message;
