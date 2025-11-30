import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProjectProps {
  title: string;
  description: string;
  imageUrl: StaticImageData | string;
  link?: string;
}

export default function ProjectCard({ title, description, imageUrl, link }: ProjectProps) {
  const CardContent = (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl dark:bg-white/5">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{CardContent}</Link>;
  }

  return CardContent;
}
