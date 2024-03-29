"use client";

import { Song } from "@/types";
import { FC, useEffect, useState } from "react";
import MediaItem from "./media-item";
import LikeButton from "./like-button";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2"
import VolumeSlider from "./slider";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";

const PlayerContent: FC<{
  song: Song;
  songUrl: string;
}> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIdx = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIdx + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIdx = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIdx - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3']
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload()
    }
  }, [sound])

  const handlePlay = () => {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  }

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex justify-start w-full">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
        <div className="flex items-center justify-end w-full col-auto md:hidden">
          <div
            onClick={handlePlay}
            className="items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer"
          >
            <Icon size={30} className="text-black" />
          </div>
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillBackward
          size={30}
          className="transition cursor-pointer text-neutral-400 hover:text-white"
          onClick={onPlayPrevious}
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillForward
          size={30}
          className="transition cursor-pointer text-neutral-400 hover:text-white"
          onClick={onPlayNext}
        />
      </div>

      <div className="justify-end hidden w-full pr-2 md:flex">
        <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={34} />
            <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
