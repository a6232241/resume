import HomeScreenDark from "@public/side-projects/music-player/home_screen-dark_theme.png";
import HomeScreenLight from "@public/side-projects/music-player/home_screen-light_theme.png";
import LaunchScreenDark from "@public/side-projects/music-player/launch_screen-dark_theme.png";
import LaunchScreenLight from "@public/side-projects/music-player/launch_screen-light_theme.png";
import ProfileScreenDark from "@public/side-projects/music-player/profile_screen-dark_theme.png";
import ProfileScreenLight from "@public/side-projects/music-player/profile_screen-light_theme.png";
import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getDictionary } from "@src/util/dictionaries";

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
  const dict = await getDictionary(lang);
  const t = (key: keyof typeof dict) => dict[key] || key;

  return (
    <ProjectPageTemplate
      authorName="Kai Kuan Cheng"
      authorAvatar="/favicon.ico"
      title="Music Player"
      description={t(
        "This is a music player application that allows users to listen to music and store music lists locally, ensuring that music can be played without an internet connection. It also provides a filtering function, allowing users to filter music by artist, music category, music name, etc.\n\nDevelopment was motivated by the fact that most music players on the market do not have a filtering function, and unstable networks can cause music to be interrupted.\n\nThe project uses Expo for development, SQLite as a local database, Node.js as the backend, and Express.js to backup the database and music files.\n\nIn the future, it is expected to use Google Drive or other cloud storage services for backup to provide a better user experience.",
      )}
      mediaItems={demoMediaItems}
      backLink="/"
    />
  );
}
