import ProjectPageTemplate from "@src/components/ProjectPageTemplate";

export default function ProjectDemoPage() {
  const demoMediaItems = [
    {
      type: "image" as const,
      url: "/next.svg",
      alt: "Demo Screenshot 1",
    },
    {
      type: "image" as const,
      url: "/vercel.svg",
      alt: "Demo Screenshot 2",
    },
    {
      type: "image" as const,
      url: "/globe.svg",
      alt: "Demo Screenshot 3",
    },
  ];

  return (
    <ProjectPageTemplate
      authorName="Kai Kuan Cheng"
      authorAvatar="/favicon.ico"
      title="Example Project"
      description="This is a comprehensive project showcase page that demonstrates the ProjectPageTemplate component. The carousel automatically cycles through demo images or videos every second, providing an engaging way to display your project's features. This template is perfect for showcasing both work projects and side projects, with a clean, modern design that adapts to light and dark modes. You can customize the header with your name and avatar, add multiple media items to the carousel, and provide detailed descriptions of your project."
      mediaItems={demoMediaItems}
      backLink="/"
    />
  );
}
