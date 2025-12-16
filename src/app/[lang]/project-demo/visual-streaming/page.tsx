import Demo00 from "@public/work-projects/visual-streaming/demo_00.png";
import Demo01 from "@public/work-projects/visual-streaming/demo_01.png";
import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
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

  return (
    <ProjectPageTemplate
      authorName="Kuan-Cheng Cai"
      authorAvatar="/favicon.ico"
      title="Visual Streaming"
      description={t(
        "This is a simple 2D face swap application, allowing users to replace their face with another person's face, Initially, the manager wanted to use existing streaming platforms to let users switch faces in real-time, but due to the performance of current mobile phones or personal computers, it was too difficult to achieve, Therefore, traditional mathematical formulas were used to implement the face swap logic, This project was developed using React Native and implemented the face swap logic using native modules Kotlin, Objective-C, C++, and OpenCV",
      )}
      mediaItems={demoMediaItems}
      backLink="/"
    />
  );
}
