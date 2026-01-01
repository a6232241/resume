import { ProjectPageTemplate } from "@features/portfolio";
import Demo00 from "@public/work-projects/visual-streaming/demo_00.png";
import Demo01 from "@public/work-projects/visual-streaming/demo_01.png";
import { getTranslations } from "next-intl/server";

const demoMediaItems = [
  {
    type: "image" as const,
    url: Demo00,
    alt: "Visual Streaming - Demo 00",
  },
  {
    type: "image" as const,
    url: Demo01,
    alt: "Visual Streaming - Demo 01",
  },
  {
    type: "video" as const,
    url: "/work-projects/visual-streaming/demo_android_00.mp4",
    alt: "Visual Streaming - Demo Android 00",
  },
  {
    type: "video" as const,
    url: "/work-projects/visual-streaming/demo_ios_00.mp4",
    alt: "Visual Streaming - Demo iOS 00",
  },
];

export default async function VisualStreamingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });

  // 從 i18n 取得詳情數據
  const projectDetail = t.raw("projects.visualStreaming.detail");

  return (
    <ProjectPageTemplate
      title="Visual Streaming"
      description={t("projects.visualStreaming.fullDesc")}
      mediaItems={demoMediaItems}
      projectDetail={projectDetail}
    />
  );
}
