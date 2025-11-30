import LaunchScreenLight from "@public/side-projects/music_player_00.png";
import LaunchScreenDark from "@public/side-projects/music_player_01.png";
import HomeScreenLight from "@public/side-projects/music_player_02.png";
import HomeScreenDark from "@public/side-projects/music_player_03.png";
import ProfileScreenLight from "@public/side-projects/music_player_06.png";
import ProfileScreenDark from "@public/side-projects/music_player_07.png";
import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getDictionary } from "@src/util/dictionaries";

const demoMediaItems = [
  {
    type: "image" as const,
    url: LaunchScreenLight,
    alt: "launch screen - light mode",
  },
  {
    type: "image" as const,
    url: LaunchScreenDark,
    alt: "launch screen - dark mode",
  },
  {
    type: "image" as const,
    url: HomeScreenLight,
    alt: "home screen - light mode",
  },
  {
    type: "image" as const,
    url: HomeScreenDark,
    alt: "home screen - dark mode",
  },
  {
    type: "video" as const,
    url: "/side-projects/music_player_02.mp4",
    alt: "music detail on modal - light mode",
  },
  {
    type: "video" as const,
    url: "/side-projects/music_player_01.mp4",
    alt: "filter music - light mode",
  },
  {
    type: "video" as const,
    url: "/side-projects/music_player_00.mp4",
    alt: "download all audios - light mode",
  },
  {
    type: "image" as const,
    url: ProfileScreenLight,
    alt: "profile screen - light mode",
  },
  {
    type: "image" as const,
    url: ProfileScreenDark,
    alt: "profile screen - dark mode",
  },
];

export default async function MusicPlayerPage({ params }: { params: Promise<{ lang: "en" | "zh" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = (key: keyof typeof dict) => dict[key] || key;

  return (
    <ProjectPageTemplate
      authorName="Kai Kuan Cheng"
      authorAvatar="/favicon.ico"
      title="Music Player"
      description={t(
        "這是一個音樂播放器應用程式，允許使用者收聽音樂，並在本地儲存音樂列表，確保沒有網路連線時也能播放音樂。並提供過濾功能，可以按照歌手、音樂類別、音樂名稱等進行過濾。\n\n開發主因是想要解決市面上多數音樂播放器沒有過濾功能，以及網路不穩定導致音樂中斷等問題。\n\n該專案採用 Expo 進行開發，並透過 SQLite 作為本地資料庫，後端使用 Node.js，使用 Express.js 進行開發，負責備份資料庫和音樂檔案。\n\n預計未來會用 Google Drive 或其他雲端儲存服務進行備份，以提供更好的使用者體驗。",
      )}
      mediaItems={demoMediaItems}
      backLink="/"
    />
  );
}
