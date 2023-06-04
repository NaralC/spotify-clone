import Header from "@/components/header";
import ListItem from "@/components/list-item";
import PageContent from "@/app/(site)/components/page-content";
import getSongs from "@/lib/getSongs";
import Image from "next/image";
import { useState } from "react";

export const revalidate = 0; // No data caching. All data is up to date.

export default async function Home() {
  const songs = await getSongs();
  
  return (
    <div
      className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900"
    >
      <Header>
        <div className="mb-2">
          <h1 
            className="text-3xl font-semibold text-white ">
              Welcome back
          </h1>
          <div 
            className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            <ListItem 
              name="Liked Songs" 
              image="/images/liked.png" 
              href="liked" 
            />
          </div>
        </div>
      </Header>
      <div className="px-6 mt-2 mb-7">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">
            Newest songs
          </h1>
        </div> 
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
