import { authenticateUser } from "@/utils/auth/authenticate";
import AddFriendModal from "./AddFriendModal";
import FriendsList from "./FriendsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friends",
  description:
    "Build your prefered community circle by adding friends who use Develop & Visualize.",
};

export default async function FriendsPage() {
  const user = await authenticateUser();
  return (
    <section className="px-6 py-12 relative">
      <h1 className="text-4xl font-semibold">Friends</h1>
      <AddFriendModal user={user} />
      <FriendsList />
    </section>
  );
}
