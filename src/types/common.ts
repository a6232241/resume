import { StaticImageData } from "next/image";

export interface MediaItem {
  type: "image" | "video";

  url: StaticImageData | string;

  alt?: string;
}
