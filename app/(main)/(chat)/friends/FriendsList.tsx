"use client";

import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

import { loadFriends } from "@/utils/friends/friendsApi";
import { debounce } from "@/utils/helpers";

import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import Modal from "@/components/ui/Modal";
import Friend from "@/components/ui/chat/Friend";
import Empty from "@/components/ui/Empty";
import { Tables } from "@/database/types/supabase";

export default function FriendsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useQuery<Tables<"users">[]>({
    queryKey: ["friends"],
    queryFn: loadFriends,
  });
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }
  const debouncedHandleChange = debounce(handleChange, 300);
  const filteredData = searchTerm
    ? data
        ?.filter((user) => user.username.includes(searchTerm))
        .sort((user) => (user.username.startsWith(searchTerm) ? -1 : 1))
    : data;

  return (
    <>
      <Input
        onChange={debouncedHandleChange}
        name="friends-list-search"
        ariaLabel="search for a friend"
        className="flex mx-auto sm:mx-0 mt-12 w-full max-w-80 focus:ring-violet-600 "
        placeholder="Search for a friend..."
      />
      {isLoading ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Modal>
          {filteredData?.length ? (
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 mdlg:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((user) => (
                <Friend key={user.id} user={user} />
              ))}
            </ul>
          ) : (
            <Empty
              className="mt-40"
              message="Start by adding your first friend!"
            />
          )}
        </Modal>
      )}
    </>
  );
}
