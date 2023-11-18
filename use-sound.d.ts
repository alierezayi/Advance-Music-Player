declare module "use-sound" {
  export default function useSound(
    src: string | { [key: string]: string },
    options?: {
      soundEnabled?: boolean;
      volume?: number;
      seek?: any;
      onplay?: () => void;
      onend?: () => void;
      onpause?: () => void;
      format?: string[];
    }
  ): [
    () => void,
    {
      loading: boolean;
      seek: any;
      pause: () => void;
      sound: Howl;
    }
  ];
}
