import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getDictionary } from "@src/util/dictionaries";

const demoMediaItems = [
  {
    type: "image" as const,
    url: "https://placehold.co/600x800.png?text=AI+Chat+App",
    alt: "AI Chat App - Chat Interface",
  },
  {
    type: "image" as const,
    url: "https://placehold.co/600x800.png?text=Chat+Rooms",
    alt: "AI Chat App - Chat Rooms",
  },
  {
    type: "image" as const,
    url: "https://placehold.co/600x800.png?text=Conversation+History",
    alt: "AI Chat App - Conversation History",
  },
];

export default async function AIChatAppPage({ params }: { params: Promise<{ lang: "en" | "zh" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = (key: keyof typeof dict) => dict[key] || key;

  return (
    <ProjectPageTemplate
      authorName="Kai Kuan Cheng"
      authorAvatar="/favicon.ico"
      title="AI Chat App"
      description={t(
        "This is a simple chat application with artificial intelligence that was created for learning about AI, that allows users to create multiple chat rooms, and keeps memories of conversation. users can also delete conversation history.\n\nThis project was developed using Expo and GitHub models.",
      )}
      mediaItems={demoMediaItems}
      backLink={`/${lang}`}
    />
  );
}
