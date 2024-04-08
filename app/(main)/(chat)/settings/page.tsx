import SettingsAuthForm from "./SettingsAuthForm";
import SettingsForm from "./SettingsForm";
import { redirect } from "next/navigation";
import { getServerUserData } from "@/utils/auth/getServerUserData";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Change your account credentials and settings",
};

export default async function Settings() {
  const user = await getServerUserData();
  if (!user) redirect("/signup");
  return (
    <section className="px-6 py-12">
      <h1 className="text-4xl font-semibold mb-12">Settings</h1>
      <SettingsForm user={user} />
      <SettingsAuthForm />
    </section>
  );
}
