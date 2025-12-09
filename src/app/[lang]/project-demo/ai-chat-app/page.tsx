import EitherChatScreenDarkTheme from "@public/side-projects/ai-chat-app/either_chat_screen-dark_theme.png";
import EitherChatScreenLightTheme from "@public/side-projects/ai-chat-app/either_chat_screen-light_theme.png";
import LaunchScreenDarkTheme from "@public/side-projects/ai-chat-app/launch_screen-dark_theme.png";
import LaunchScreenLightTheme from "@public/side-projects/ai-chat-app/launch_screen-light_theme.png";
import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getDictionary } from "@src/util/dictionaries";

const demoMediaItems = [
  {
    type: "video" as const,
    url: "/side-projects/ai-chat-app/send_message-dark_theme.mp4",
    alt: "AI Chat App - Send Message",
  },
  {
    type: "video" as const,
    url: "/side-projects/ai-chat-app/resend_message-dark_theme.mp4",
    alt: "AI Chat App - Resend Message",
  },
  {
    type: "video" as const,
    url: "/side-projects/ai-chat-app/delete_message-dark_theme.mp4",
    alt: "AI Chat App - Delete Message",
  },
  {
    type: "image" as const,
    url: LaunchScreenDarkTheme,
    alt: "AI Chat App - Launch Screen Dark Theme",
  },
  {
    type: "image" as const,
    url: LaunchScreenLightTheme,
    alt: "AI Chat App - Launch Screen Light Theme",
  },
  {
    type: "image" as const,
    url: EitherChatScreenDarkTheme,
    alt: "AI Chat App - Either Chat Screen Dark Theme",
  },
  {
    type: "image" as const,
    url: EitherChatScreenLightTheme,
    alt: "AI Chat App - Either Chat Screen Light Theme",
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
