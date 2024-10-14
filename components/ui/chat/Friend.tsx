import { User } from "@/types/db-derivated-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { BiDotsVertical, BiTrash } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import { Dot } from "lucide-react";
import Modal, { useModal } from "../Modal";
import ConfirmWindow from "./ConfirmWindow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFriend } from "@/utils/friends/friendsApi";
import toast from "react-hot-toast";

const ddMenuItemClass = "flex items-center gap-1 focus:text-red-600 ";

export default function Friend({
  user,
  active,
}: {
  user: User;
  active?: boolean;
}) {
  const { close } = useModal();
  const queryClient = useQueryClient();
  const { mutate: mutateRemove, isPending: isPendingRemoving } = useMutation({
    mutationKey: ["friends"],
    mutationFn: (id: string) => removeFriend(id),
    onSettled: () => toast.loading("Removing user...", { id: "removingUser" }),
  });
  return (
    <li className="flex gap-4 items-center border rounded-2xl px-3 py-2 cursor-pointer">
      <div className="relative overflow-hidden w-full max-w-20 h-20">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={`${user.username} avatar`}
            fill
            className="rounded-full"
            sizes="20vw"
          />
        ) : (
          <HiUserCircle className="w-full h-full" />
        )}
      </div>
      <div className="flex flex-col gap-1 justify-center grow">
        <p className="font-semibold text-sm flex items-center">
          <span className="">{user.username}</span>
          {active && <Dot className="text-green-500" />}
        </p>
        <p className="text-[12px] text-gray-500">{user.description}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none ">
          <BiDotsVertical className="text-xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Modal.Open opens={user.id + "-window"}>
            <DropdownMenuItem className={ddMenuItemClass}>
              <BiTrash />
              <span>Remove friend</span>
            </DropdownMenuItem>
          </Modal.Open>
          {/* <DropdownMenuItem
            className={ddMenuItemClass + " focus:text-green-500"}
          >
            {/* <BiVolumeMute /> *
            <BiVolumeFull />
            <span>Enable messages</span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal.Window windowName={user.id + "-window"}>
        <ConfirmWindow
          username={user.username}
          close={close}
          onConfirm={() =>
            mutateRemove(user.id, {
              onSuccess: () => {
                toast.dismiss("removingUser");
                toast.success("Removed friend successfully");
                queryClient.invalidateQueries({ queryKey: ["friends"] });
                close();
              },
            })
          }
        />
      </Modal.Window>
    </li>
  );
}
