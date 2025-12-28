import HomeScreenDark from "@public/side-projects/music-player/home_screen-dark_theme.png";
import HomeScreenLight from "@public/side-projects/music-player/home_screen-light_theme.png";
import LaunchScreenDark from "@public/side-projects/music-player/launch_screen-dark_theme.png";
import LaunchScreenLight from "@public/side-projects/music-player/launch_screen-light_theme.png";
import ProfileScreenDark from "@public/side-projects/music-player/profile_screen-dark_theme.png";
import ProfileScreenLight from "@public/side-projects/music-player/profile_screen-light_theme.png";
import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getTranslations } from "next-intl/server";

const demoMediaItems = [
  {
    type: "video" as const,
    url: "/side-projects/music-player/show_music_detail_modal.mp4",
    alt: "Music Player - Show Music Detail Modal - Light Theme",
  },
  {
    type: "video" as const,
    url: "/side-projects/music-player/filter_music.mp4",
    alt: "Music Player - Filter Music - Light Theme",
  },
  {
    type: "video" as const,
    url: "/side-projects/music-player/download_all_audios.mp4",
    alt: "Music Player - Download All Audios - Light Theme",
  },
  {
    type: "image" as const,
    url: LaunchScreenLight,
    alt: "Music Player - Launch Screen - Light Theme",
  },
  {
    type: "image" as const,
    url: LaunchScreenDark,
    alt: "Music Player - Launch Screen - Dark Theme",
  },
  {
    type: "image" as const,
    url: HomeScreenLight,
    alt: "Music Player - Home Screen - Light Theme",
  },
  {
    type: "image" as const,
    url: HomeScreenDark,
    alt: "Music Player - Home Screen - Dark Theme",
  },

  {
    type: "image" as const,
    url: ProfileScreenLight,
    alt: "Music Player - Profile Screen - Light Theme",
  },
  {
    type: "image" as const,
    url: ProfileScreenDark,
    alt: "Music Player - Profile Screen - Dark Theme",
  },
];

export default async function MusicPlayerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });

  const projectDetail = t.raw("projects.musicPlayer.detail");

  return (
    <ProjectPageTemplate
      title="Music Player"
      description={t("projects.musicPlayer.fullDesc")}
      mediaItems={demoMediaItems}
      projectDetail={projectDetail}
      sourceCodeLink="https://github.com/a6232241/music-player"
    />
  );
}
