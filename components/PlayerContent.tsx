"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";

import { Song } from "@/libs/types";
import usePlayer from "@/hooks/usePlayer";
import useOpenPlayerContent from "@/hooks/useOpenPlayerContent";
import useLoadImage from "@/hooks/useLoadImage";

import MediaItem from "./MediaItem";
import VolumeSlider from "./VolumeSlider";
import LikedButton from "./LikedButton";

import { IoIosArrowDown } from "react-icons/io";
import DurationSlider from "./DurationSlider";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();

  const { open, onOpen, onClose } = useOpenPlayerContent();

  const imageUrl = useLoadImage(song);

  const [volume, setVolume] = useState(1);
  const [seek, setSeek] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  console.log(sound.duration());

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
      setIsPlaying(true);
    } else {
      pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  if (open) {
    return (
      <div className="relative flex flex-col items-center justify-between h-full py-20 md:py-10 px-2">
        <button onClick={onClose} className="absolute top-3 right-3">
          <IoIosArrowDown size={25} />
        </button>

        <div className="flex flex-col items-center gap-10">
          <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-md">
            <Image
              fill
              src={imageUrl || "/images/music-placeholder.png"}
              alt="Playlist"
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-lg">{song.title}</p>
            <p className="text-neutral-400 text-sm">{song.author}</p>
          </div>
        </div>

        <div className="w-full max-w-2xl flex flex-col gap-7">
          <div>
            <DurationSlider value={seek} onChange={(value) => setSeek(value)} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">0:00</span>
              <span className="text-sm text-neutral-400">3:56</span>
            </div>
          </div>

          <div className="flex items-center justify-between flex-1 w-full">
            <VolumeIcon
              onClick={toggleMute}
              className="cursor-pointer"
              size={25}
            />

            <div
              className="
                  h-full
                  flex 
                  justify-center 
                  items-center 
                  gap-x-7
                  sm:gap-x-10
                "
            >
              <FaBackwardStep
                onClick={onPlayPrevious}
                size={25}
                className="
                    text-neutral-400 
                    cursor-pointer 
                    hover:text-white 
                    transition
                  "
              />
              <div
                onClick={handlePlay}
                className="
                    flex 
                    items-center 
                    justify-center
                    h-12
                    w-12
                    rounded-full 
                    bg-white 
                    p-1 
                    cursor-pointer
                  "
              >
                <Icon size={30} className="text-black" />
              </div>
              <FaForwardStep
                onClick={onPlayNext}
                size={25}
                className="
                    text-neutral-400 
                    cursor-pointer 
                    hover:text-white 
                    transition
                  "
              />
            </div>

            <LikedButton songId={song.id} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} onClick={onOpen} />
          <LikedButton songId={song.id} />
        </div>
      </div>

      <div
        className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center 
            pr-2
          "
      >
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div
        className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-10
          "
      >
        <FaBackwardStep
          onClick={onPlayPrevious}
          size={25}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
        <div
          onClick={handlePlay}
          className="
              flex 
              items-center 
              justify-center
              h-12
              w-12
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
        <FaForwardStep
          onClick={onPlayNext}
          size={25}
          className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
