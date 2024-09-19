// import { useSSRFetch } from "@/app/dashboard/utils/serverSideFetcher";
// import { cookies } from "next/headers";

// export async function POST() {
//   const res = await useSSRFetch().protectedFetcher("logout", {
//     method: "POST",
//     headers: {
//       Cookie: `access_token=${
//         cookies().get("access_token")?.value
//       };refresh_jti=${cookies().get("refresh_jti")?.value}`,
//     },
//   });

//   const data = await res.json();

//   return Response.json({ data });
// }
