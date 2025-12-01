import Demo00 from "@public/side-projects/visual-streaming/demo_00.png";
import Demo01 from "@public/side-projects/visual-streaming/demo_01.png";
import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getDictionary } from "@src/util/dictionaries";

const demoMediaItems = [
  {
    type: "image" as const,
    url: Demo00,
    alt: "demo_00",
  },
  {
    type: "image" as const,
    url: Demo01,
    alt: "demo_01",
  },
  {
    type: "video" as const,
    url: "/side-projects/visual-streaming/demo_android_00.mp4",
    alt: "demo_android_00",
  },
  {
    type: "video" as const,
    url: "/side-projects/visual-streaming/demo_ios_00.mp4",
    alt: "demo_ios_00",
  },
];

export default async function VisualStreamingPage({ params }: { params: Promise<{ lang: "en" | "zh" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = (key: keyof typeof dict) => dict[key] || key;

  return (
    <ProjectPageTemplate
      authorName="Kai Kuan Cheng"
      authorAvatar="/favicon.ico"
      title="Visual Streaming"
      description={t(
        "This is a simple 2D face swap application, allowing users to replace their face with another person's face. Initially, the manager wanted to use existing streaming platforms to let users switch faces in real-time, but due to the performance of current mobile phones or personal computers, it was too difficult to achieve. Therefore, traditional mathematical formulas were used to implement the face swap logic. This project was developed using React Native and implemented the face swap logic using native modules Kotlin, Objective-C, C++, and OpenCV.",
      )}
      mediaItems={demoMediaItems}
      backLink="/"
    />
  );
}
