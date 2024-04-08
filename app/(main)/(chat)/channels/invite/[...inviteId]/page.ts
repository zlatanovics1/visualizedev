import { authenticateUser } from "@/utils/auth/authenticate";
import {
  addChannelMember,
  validateInviteLink,
} from "@/utils/channels/channelsApi";
import { notFound, redirect } from "next/navigation";

export default async function Invite({
  params,
}: {
  params: { [key: string]: string };
}) {
  authenticateUser();
  const link_id = params.inviteId.at(0);
  if (!link_id?.length) return notFound();
  const invite_link = `invite/${link_id}`;
  const channel = await validateInviteLink(invite_link);
  if (!channel) return notFound();
  addChannelMember(channel.id);
  redirect(`/channels/${channel.id}`);
}
