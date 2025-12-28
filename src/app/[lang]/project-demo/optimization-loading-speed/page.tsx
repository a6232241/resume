import ReactDevToolsAfter from "@public/work-experience/optimization-loading-speed/react_devtools-after.png";
import ReactDevToolsBefore from "@public/work-experience/optimization-loading-speed/react_devtools-before.png";
import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getTranslations } from "next-intl/server";

const demoMediaItems = [
  {
    type: "video" as const,
    url: "/work-experience/optimization-loading-speed/demo_before.mp4",
    alt: "Optimization Loading Speed - Demo Before",
  },
  {
    type: "video" as const,
    url: "/work-experience/optimization-loading-speed/demo_after.mp4",
    alt: "Optimization Loading Speed - Demo After",
  },
  {
    type: "image" as const,
    url: ReactDevToolsBefore,
    alt: "Optimization Loading Speed - React DevTools Before",
  },
  {
    type: "image" as const,
    url: ReactDevToolsAfter,
    alt: "Optimization Loading Speed - React DevTools After",
  },
];

export default async function OptimizationLoadingSpeedPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });

  const projectDetail = t.raw("projects.optimizationLoadingSpeed.detail");

  return (
    <ProjectPageTemplate
      title={t("projects.optimizationLoadingSpeed.title")}
      description={t("projects.optimizationLoadingSpeed.fullDesc")}
      mediaItems={demoMediaItems}
      projectDetail={projectDetail}
    />
  );
}
