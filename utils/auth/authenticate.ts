import { redirect } from "next/navigation";
import { getServerUserData } from "./getServerUserData";

export async function authenticateUser() {
  const user = await getServerUserData();
  if (!user) return redirect("/signup");
  return user;
}
