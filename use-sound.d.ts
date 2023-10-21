declare module "use-sound" {
  export default function useSound(
    src: string | { [key: string]: string },
    options?: {
      soundEnabled?: boolean;
      volume?: number;
      onplay?: () => void;
      onend?: () => void;
      onpause?: () => void;
      format?: string[];
    }
  ): [
    () => void,
    {
      loading: boolean;
      pause: () => void;
      sound: Howl;
    }
  ];
}

// declare module "use-sound" {
//   const useSound: any; // Replace 'any' with the actual type if you can infer it
//   export default useSound;
// }

// declare module "use-sound" {
//   type UseSoundOptions = {
//     volume?: number;
//     onplay?: () => void;
//     onend?: () => void;
//     onpause?: () => void;
//     format?: string[];
//   };

//   type UseSoundReturn = [
//     () => void, // play function
//     {
//       pause: () => void;
//       sound: Howl; // Assuming 'Howl' is the type for sound from the package
//     }
//   ];

//   export function useSound(
//     url: string,
//     options?: UseSoundOptions
//   ): UseSoundReturn;
// }
