import { MediaItem } from "@src/types";
import Image, { StaticImageData } from "next/image";

interface Props {
  mediaItems: MediaItem[];
  onMediaClick: (index: number) => void;
}

export default function ProjectMedia({ mediaItems, onMediaClick }: Props) {
  const getVideoSrc = (url: string | StaticImageData): string => {
    return typeof url === "string" ? url : url.src;
  };

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">應用展示</h2>
      <div className="flex flex-row flex-nowrap gap-5 overflow-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {mediaItems.map((item, index) => (
          <div
            className="relative flex-shrink-0 flex-grow-0 basis-[200px] cursor-pointer overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-white/5"
            style={{ minHeight: "350px" }}
            key={index}
            onClick={() => onMediaClick(index)}>
            {item.type === "image" ? (
              <Image
                src={item.url}
                alt={item.alt || `Demo ${index + 1}`}
                fill
                className="object-contain transition-transform duration-500 hover:scale-110"
                priority
              />
            ) : (
              <video
                className="h-full w-full object-contain transition-transform duration-500 hover:scale-110"
                autoPlay
                muted
                loop
                playsInline>
                <source src={getVideoSrc(item.url)} type="video/mp4" />
                {item.alt && <p>{item.alt}</p>}
              </video>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
