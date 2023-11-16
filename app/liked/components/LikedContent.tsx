"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/libs/types";

import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";

import MediaItem from "@/components/MediaItem";
import LikedButton from "@/components/LikedButton";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();

  const onPLay = useOnPlay(songs);

  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Liked Songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPLay(id)} data={song} />
          </div>

          <LikedButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
