import Table from "@/components/ui/Table";
import { getChannels } from "@/utils/channels/channelsApi";
import Link from "next/link";
import { IoPeopleCircleOutline } from "react-icons/io5";
import InviteToChannel from "./InviteToChannel";
import Empty from "@/components/ui/Empty";

interface ChannelData {
  name: string;
  creator: string;
  members: number;
  role: string;
  invite: string;
}

const roleColors = {
  admin: "bg-green-500",
  "co-admin": "bg-violet-500",
  member: "bg-indigo-500",
};

export default async function ChannelTable() {
  const result = await getChannels();
  if (!result)
    return (
      <Empty message="Let a friend add you to a channel manually or via invite link!" />
    );
  const { memberData, channelsData } = result;

  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Creator</Table.HeaderCell>
        <Table.HeaderCell>Members</Table.HeaderCell>
        <Table.HeaderCell>Your role</Table.HeaderCell>
        <Table.HeaderCell>Invite</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {channelsData.map((channel) => {
          const role = memberData.find(
            (memberChannel) => memberChannel.channel_id === channel.id
          )!.role;
          return (
            <Table.Row key={channel.id}>
              <Table.Cell className=" flex items-center justify-center gap-2 hover:text-indigo-600 transition-all duration-300 cursor-pointer">
                <IoPeopleCircleOutline className="w-8 h-8 text-indigo-500" />
                <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
              </Table.Cell>
              <Table.Cell>{channel.users?.username}</Table.Cell>
              <Table.Cell>{channel.num_members}</Table.Cell>
              <Table.Cell className="text-nowrap flex items-center justify-center">
                <span
                  className={`rounded-full px-3 py-1 uppercase ${
                    roleColors[role as keyof typeof roleColors]
                  } text-white font-semibold text-xs`}
                >
                  {role}
                </span>
              </Table.Cell>
              <Table.Cell>
                <InviteToChannel channelId={channel.id} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
