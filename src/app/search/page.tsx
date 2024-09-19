import React from "react";
import Search from "./Search";
import { cookies } from "next/headers";
import { SearchSettings } from "./types";
import { useSSRFetch } from "../dashboard/utils/serverSideFetcher";

async function useSearchSettings(): Promise<SearchSettings> {
  const response: SearchSettings = await useSSRFetch().protectedFetcher(
    "searchSettings",
    {
      method: "GET",
      headers: {
        Cookie: `access_token=${
          cookies().get("access_token")?.value
        };refresh_jti=${cookies().get("refresh_jti")?.value}`,
      },
    }
  );

  return response;
}

const Page = async () => {
  const searchSettings = await useSearchSettings();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mt-8">
        <Search searchSettings={searchSettings} />
      </div>
    </div>
  );
};

export default Page;
