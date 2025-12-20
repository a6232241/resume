import EitherChatScreenDarkTheme from "@public/side-projects/ai-chat-app/either_chat_screen-dark_theme.png";
import EitherChatScreenLightTheme from "@public/side-projects/ai-chat-app/either_chat_screen-light_theme.png";
import LaunchScreenDarkTheme from "@public/side-projects/ai-chat-app/launch_screen-dark_theme.png";
import LaunchScreenLightTheme from "@public/side-projects/ai-chat-app/launch_screen-light_theme.png";
import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getTranslations } from "next-intl/server";

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

export default async function AIChatAppPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });

  return (
    <ProjectPageTemplate
      title="AI Chat App"
      description={t("projects.aiChatApp.fullDesc")}
      mediaItems={demoMediaItems}
      backLink={`/${lang}`}
      sourceCodeLink="https://github.com/a6232241/ai-chat-app"
    />
  );
}
