import Input from "@/components/ui/Input";
import AddFriendItem from "./AddFriendItem";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { debounce } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "@/utils/friends/friendsApi";
import Loader from "@/components/ui/Loader";
import Empty from "@/components/ui/Empty";

export default function AddFriendMainWindow() {
  const [searchQuery, setSearchQuery] = useState("default");
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { data: users, isLoading } = useQuery({
    queryKey: [`add friend ${searchQuery}`],
    queryFn: () => getFriends(searchQuery),
  });
  function handleSearch() {
    if (inputRef.current.value.length < 3) {
      searchQuery !== "default" && setSearchQuery("default");
      return;
    }
    setSearchQuery(inputRef.current.value);
  }
  const debouncedSearch = debounce(handleSearch, 300);

  useEffect(function () {
    inputRef?.current.focus();
  }, []);
  return (
    <>
      <h3 className="text-2xl font-semibold ">Search by username</h3>
      <Input
        ref={inputRef}
        onChange={debouncedSearch}
        name="friend-search"
        className="w-3/4 text-gray-400"
        ariaLabel="Search for a new friend"
      />
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <Loader />
        </div>
      ) : (
        <ul className="divide-y divide-gray-300">
          {!users?.length ? (
            <Empty message="No users found" />
          ) : (
            users.map((user) => <AddFriendItem friend={user} key={user.id} />)
          )}
        </ul>
      )}
    </>
  );
}
