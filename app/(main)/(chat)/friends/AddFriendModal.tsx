"use client";

import Modal from "@/components/ui/Modal";
import AddFriendMainWindow from "./AddFriendMainWindow";
import { PiPlus } from "react-icons/pi";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/db-derivated-types";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setUser } from "@/store/slices/userSlice";

export default function AddFriendModal({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  queryClient.prefetchQuery({ queryKey: ["add friend default"] });
  return (
    <Modal>
      <Modal.Open opens="modal">
        <button className="float-right flex gap-1 items-center rounded-xl border-2 bg-violet-600 text-preserve-white px-4 py-2 hover:bg-gray-100 hover:text-violet-600 hover:border-violet-600 absolute top-12 right-6 transition-all duration-300 cursor-pointer">
          <span>Add friend</span>
          <PiPlus />
        </button>
      </Modal.Open>
      <Modal.Window
        windowName="modal"
        className="w-full max-w-2xl overflow-y-scroll"
      >
        <AddFriendMainWindow />
      </Modal.Window>
    </Modal>
  );
}
