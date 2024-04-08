"use client";
import {
  createChannelInviteLink,
  getChannelInviteLink,
} from "@/utils/channels/channelsApiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { HiOutlineLink } from "react-icons/hi";

export default function InviteToChannel({ channelId }: { channelId: number }) {
  const { data, isLoading } = useQuery({
    queryKey: [`${channelId}-invite`],
    queryFn: () => getChannelInviteLink(channelId),
  });
  const { mutate, isPending } = useMutation({
    mutationKey: [`${channelId}-invite`],
    mutationFn: () => createChannelInviteLink(channelId),
    onSuccess: async (data) => {
      await navigator.clipboard.writeText(
        `${location.origin}/channels/${data.invite_link}`
      );
      toast.success("Copied invite link!");
    },
  });

  const isExpired = data?.link_expire_date
    ? new Date(data?.link_expire_date) < new Date()
    : null;

  async function handleClick() {
    if (!data?.invite_link || isExpired) {
      mutate();
      return;
    }
    await navigator.clipboard.writeText(
      `${location.origin}/channels/${data.invite_link}`
    );
    toast.success("Copied invite link!");
  }

  return (
    <button
      onClick={handleClick}
      className="py-1 px-3 rounded-xl bg-gray-200 transition-all duration-300 hover:text-white hover:bg-indigo-500"
    >
      {isLoading || isPending ? (
        <BiLoaderAlt className="animate-spin" />
      ) : (
        <HiOutlineLink />
      )}
    </button>
  );
}
