'use client'
import usePlayer from '@/hooks/usePlayer';
import getImageBySongId from '@/lib/getImageBySongId';
import { Song } from '@/types'
import Image from 'next/image';
import React, { FC } from 'react'

const MediaItem: FC<{
  data: Song,
  onClick?: (id: string) => void;
}> = ({ data, onClick }) => {
  const imageUrl = getImageBySongId(data);
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) { return onClick(data.id) }

    player.setId(data.id);
    return;
  }

  return (
    <div onClick={handleClick} className='flex items-center w-full p-2 rounded-md cursor-pointer gap-x-3 hover:bg-neutral-800/50'>
      <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
        <Image src={imageUrl || "/images/liked.png"} alt='Media Item' className='object-cover' fill />
      </div>
      <div className='flex flex-col overflow-hidden gap-y-1'>
        <p className='text-white truncate'>{data.title}</p>
        <p className='text-sm truncate text-neutral-400'>{data.author}</p>
      </div>
    </div>
  )
}

export default MediaItem