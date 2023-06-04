"use client";

import MediaItem from "@/components/media-item";
import { Song } from "@/types";
import { FC } from "react";

const SearchContent: FC<{ songs: Song[] }> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col w-full px-6 gap-y-2 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-6 gap-y-2">
      {songs.map((song) => (
        <div className="flex items-center w-full gap-x-4" key={song.id}>
          <div className="flex-1">
            <MediaItem data={song} onClick={() => {}} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
