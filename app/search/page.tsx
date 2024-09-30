import React from "react";
import Search from "./Search";

const Page = async () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mt-8">
        <Search />
      </div>
    </div>
  );
};

export default Page;
