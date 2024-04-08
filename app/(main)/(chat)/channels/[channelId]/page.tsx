import MessageInput from "@/components/ui/chat/MessageInput";
import MessageList from "@/components/ui/chat/MessageList";
import { validateChannel } from "@/utils/channels/channelsApi";

export default async function DynamicChannelPage({
  params,
}: {
  params: { [key: string]: string };
}) {
  const { channelId } = params;
  const result = await validateChannel(channelId);
  if (result.message !== "success")
    return (
      <h1 className="text-xl text-center font-semibold m-10">
        {result.message}
      </h1>
    );
  return (
    <section className="grid grid-rows-[1fr,5rem] grid-cols-1 h-full message-list">
      <MessageList channelName={channelId} />
      <MessageInput />
    </section>
  );
}
