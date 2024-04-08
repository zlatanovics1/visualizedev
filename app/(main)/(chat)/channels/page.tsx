import { authenticateUser } from "@/utils/auth/authenticate";
import AddChannel from "./AddChannel";
import ChannelTable from "./ChannelTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Channels",
  description: "Join, invite or create a channel for personalized chat.",
};

export default async function ChannelPage() {
  const user = await authenticateUser();

  return (
    <section className="px-3 py-12 md:px-6">
      <h1 className="mb-12 text-4xl font-semibold px-3 md:px-0">
        Your channels
      </h1>
      <ChannelTable />
      <h2 className="text-center text-3xl font-semibold mt-32 mb-10 px-3 md:px-0">
        Create a channel
      </h2>
      <AddChannel />
    </section>
  );
}
