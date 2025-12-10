import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getDictionary } from "@src/util/dictionaries";

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
];

export default async function OptimizationLoadingSpeedPage({ params }: { params: Promise<{ lang: "en" | "zh" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = (key: keyof typeof dict) => dict[key] || key;

  return (
    <ProjectPageTemplate
      authorName="Kai Kuan Cheng"
      authorAvatar="/favicon.ico"
      title={t("Optimization loading speed")}
      description={t(
        "This was an optimization problem in a work project; the application was extremely slow during login.\n\nThere were two main causes:\n\nfirst, the state was reset twice during login, resulting in two API calls and all components being re-rendered;\n\nsecond, the Redux version was outdated, causing the `selectFromResult` property of `useQuery` to always be re-rendered.\n\nThese two issues were identified using two tools: React Devtools to check the number of re-renders and the Flipper plugin to check state changes.\n\nOnce the causes were found, the problem was essentially solved, and the fix not only resolved the issue but also improved the application's speed.",
      )}
      mediaItems={demoMediaItems}
      backLink={`/${lang}`}
    />
  );
}
