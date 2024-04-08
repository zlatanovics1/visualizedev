"use client";

import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useAppSelector } from "@/hooks/storeHooks";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getMessages, subscribeToChannel } from "@/utils/messages/messagesApi";
import { getUser } from "@/store/slices/userSlice";

import Message from "./Message";
import Loader from "../Loader";
import Empty from "../Empty";
import MessageDate from "./MessageDate";
import { BiLoaderAlt } from "react-icons/bi";

import { Likes, type MessageType } from "@/types/db-derivated-types";
import { getLikes } from "@/utils/messages/likesApi";

function isDifferentDay(day1: string, day2: string | undefined) {
  if (!day2) return true;
  const date1 = new Date(day1);
  const date2 = new Date(day2);
  return date1.getDate() !== date2.getDate();
}

function sameMins(time1: string, time2: string | undefined) {
  if (!time2) return false;
  const date1 = new Date(time1);
  const date2 = new Date(time2);
  return date1.getMinutes() == date2.getMinutes();
}
export default function MessageList({
  channelName = "global",
}: {
  channelName?: string;
}) {
  const queryClient = useQueryClient();

  const user = useAppSelector(getUser);

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<{ data: MessageType[] | null; count: number | null }>({
    queryKey: [`${channelName} messages`],
    queryFn: ({ pageParam = 0 }: { pageParam: unknown }) =>
      getMessages({
        pageParam,
        channelId: channelName === "global" ? "" : channelName,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const currentResults = allPages.reduce(
        (acc, cur) => acc + (cur.data?.length || 0),
        0
      );

      return currentResults < allPages[0]?.count! ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  const {
    data: likesData,
    isLoading: isLoadingLikes,
    error: likesError,
  } = useQuery<Likes[]>({
    queryKey: [`${channelName} likes`],
    queryFn: () => getLikes(channelName === "global" ? "" : channelName),
  });

  const messages = useMemo(
    () => data?.pages.map((page) => page.data).flat() as MessageType[],
    [data?.pages]
  );

  // const likes = useMemo(
  //   () =>
  //     likesData?.length
  //       ? messages?.map((message) =>
  //           likesData.filter((like) => like.message_id === message.id)
  //         )
  //       : undefined,
  //   [likesData]
  // );

  const likes = likesData?.length
    ? messages?.map((message) =>
        likesData.filter((like) => like.message_id === message.id)
      )
    : undefined;

  const intObserver = useRef() as MutableRefObject<IntersectionObserver>;
  const secondLastLIRef = useCallback(
    (li: HTMLLIElement | null) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((li) => {
        if (li[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (li) intObserver.current.observe(li);
    },
    [isLoading, fetchNextPage, hasNextPage]
  );

  useEffect(
    function () {
      const { channelMessage, channelLikes } = subscribeToChannel(
        channelName,
        queryClient,
        user
      );

      return () => {
        channelMessage.unsubscribe();
        channelLikes.unsubscribe();
      };
    },
    [channelName, queryClient]
  );

  if (isLoading || isLoadingLikes)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error || likesError) throw new Error("Could not load messages...");
  if (!data || !data?.pages[0].data?.length)
    return <Empty message="Write the first message on the channel!" />;

  return (
    <ul className="overflow-y-scroll flex flex-col-reverse gap-6 py-6 md:py-4 px-4 relative">
      {messages.map((message, index) => {
        const diffDay = isDifferentDay(
          message.created_at,
          messages[index + 1]?.created_at
        );
        return (
          <>
            <Message
              channelId={channelName === "global" ? null : Number(channelName)}
              message={message}
              likes={likes?.[index]}
              key={message.id}
              userId={user.id}
              sameMin={
                message.author_id === messages[index + 1]?.author_id &&
                sameMins(message.created_at, messages[index + 1]?.created_at)
              }
              sameUser={
                message.author_id === messages[index + 1]?.author_id && !diffDay
              }
              refEl={
                index === messages.length - 2 ? secondLastLIRef : undefined
              }
            />
            {diffDay ? (
              <MessageDate
                key={`${message.id}-date`}
                createdAt={message.created_at}
              />
            ) : null}
          </>
        );
      })}
      {isFetchingNextPage && (
        <div
          key={`isFetchingNextPage`}
          className="flex items-center justify-center m-2"
        >
          <BiLoaderAlt className="animate-spin text-indigo-600" />
        </div>
      )}
    </ul>
  );
}
