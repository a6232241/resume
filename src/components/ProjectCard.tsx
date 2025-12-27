import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProjectProps {
  title: string;
  description: string;
  imageUrl?: StaticImageData | string;
  link?: string;
  period?: string;
  technologies?: string[];
  achievements?: string[];
  role?: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  link,
  period,
  technologies = [],
  achievements = [],
  role = "獨立開發",
}: ProjectProps) {
  const CardContent = (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl dark:bg-white/5">
      {/* 圖片區 */}
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        </div>
      )}

      {/* 內容區 */}
      <div className="space-y-3 p-6">
        {/* 標題 */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>

        {/* 核心場景描述 */}
        {description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400" title={description}>
            {description}
          </p>
        )}

        {/* 技術 Tag 橫列 */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-block rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* 成就點 */}
        {achievements.length > 0 && (
          <div className="space-y-1 border-t border-gray-200 pt-2 dark:border-gray-700">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="font-bold text-green-600 dark:text-green-400">✓</span>
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        )}

        {/* 元信息區（時間 + 角色） */}
        <div className="flex items-center justify-between gap-2 border-t border-gray-200 pt-2 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {role && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                {role}
              </span>
            )}
          </div>
          {period && <span className="text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">{period}</span>}
        </div>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{CardContent}</Link>;
  }

  return CardContent;
}
