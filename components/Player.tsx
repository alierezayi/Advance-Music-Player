"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";
import useOpenPlayerContent from "@/hooks/useOpenPlayerContent";

import PlayerContent from "./PlayerContent";
import { useState } from "react";

const Player = () => {
  const player = usePlayer();

  const { song } = useGetSongById(player.activeId);

  const { open } = useOpenPlayerContent();

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className={`
        ${open ? "absolute" : "fixed"} 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        ${open ? "h-full" : "h-[80px]"}
        px-4
        transition-all
        duration-700
        ease-in-out
        ${open && "bg-neutral-900"}
        rounded-lg
      `}
    >
      <PlayerContent song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
