import CMSDashboardPage from "@public/work-projects/berify/CMS-dashboard_page.png";
import CMSProductSettingPage from "@public/work-projects/berify/CMS-product_setting_page.png";
import CMSRewardsPage from "@public/work-projects/berify/CMS-rewards_page.png";
import HomeScreen from "@public/work-projects/berify/home_screen.png";
import NotificationsScreen from "@public/work-projects/berify/notifications_screen.png";
import ProductDetailScreenShowChat from "@public/work-projects/berify/product_detail_screen-show_chat.png";
import ProductDetailScreen from "@public/work-projects/berify/product_detail_screen.png";
import ProfileScreen from "@public/work-projects/berify/profile_screen.png";
import RewardsScreen from "@public/work-projects/berify/rewards_screen.png";
import ProjectPageTemplate from "@src/components/ProjectPageTemplate";
import { getTranslations } from "next-intl/server";

const demoMediaItems = [
  {
    type: "image" as const,
    url: HomeScreen,
    alt: "Berify - Home Screen",
  },
  {
    type: "image" as const,
    url: ProductDetailScreen,
    alt: "Berify - Product Detail Screen",
  },
  {
    type: "image" as const,
    url: ProductDetailScreenShowChat,
    alt: "Berify - Product Detail Screen - Show Chat",
  },
  {
    type: "image" as const,
    url: RewardsScreen,
    alt: "Berify - Rewards Screen",
  },
  {
    type: "image" as const,
    url: NotificationsScreen,
    alt: "Berify - Notifications Screen",
  },
  {
    type: "image" as const,
    url: ProfileScreen,
    alt: "Berify - Profile Screen",
  },
  {
    type: "image" as const,
    url: CMSDashboardPage,
    alt: "Berify - CMS Dashboard Page",
  },
  {
    type: "image" as const,
    url: CMSProductSettingPage,
    alt: "Berify - CMS Product Setting Page",
  },
  {
    type: "image" as const,
    url: CMSRewardsPage,
    alt: "Berify - CMS Rewards Page",
  },
];

export default async function BerifyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });

  return (
    <ProjectPageTemplate
      authorName="Kai Kuan Cheng"
      authorAvatar="/favicon.ico"
      title="Berify"
      description={t(
        "This is a Web3 smart retail system, Merchants can view, manage, and analyze products through the backend, while consumers can unlock product information, special promotions, NFTs, and gifts by scanning product tags, It also provides third-party wallet integration, allowing users to view cryptocurrencies and NFTs, The application is implemented using React Native, with app clips developed in Swift, It offers scanning functionality and displays simple product descriptions, NextJs is used as the backend server, and the CMS is also developed entirely using NextJs",
      )}
      mediaItems={demoMediaItems}
      backLink={`/${lang}`}
      storeLink={{
        appleAppStoreLink: "https://apps.apple.com/us/app/berify/id1526630785",
        googlePlayStoreLink: "https://play.google.com/store/apps/details?id=com.berify",
      }}
    />
  );
}
