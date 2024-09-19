import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleUnauthenticatedUser = async () => {
  const accessToken = cookies().get("access_token")?.value;
  const refreshJti = cookies().get("refresh_jti")?.value;
  console.log(accessToken, refreshJti);
  if (!accessToken || !refreshJti) {
    redirect("/login");
  }
};
