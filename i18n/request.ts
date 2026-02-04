import { getRequestConfig } from "next-intl/server";

// List of project keys to load dynamically
const PROJECT_KEYS = ["musicPlayer", "visualStreaming", "aiChatApp", "10xAppSpeed", "berify", "_common"] as const;

type ProjectKey = (typeof PROJECT_KEYS)[number];

// Helper function to safely import a project file
async function importProjectFile(locale: string, projectKey: ProjectKey): Promise<Record<string, unknown>> {
  try {
    const { default: data } = await import(`@public/locales/${locale}/projects/${projectKey}.json`);
    return data;
  } catch (error) {
    console.warn(`Failed to load project file: ${locale}/projects/${projectKey}.json`, error);
    return {};
  }
}

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is always defined, fallback to 'en' if undefined
  const currentLocale = locale || "en";

  // Load index.json and all project files in parallel
  const [indexModule, ...projectModules] = await Promise.all([
    import(`@public/locales/${currentLocale}/index.json`),
    ...PROJECT_KEYS.map((key) => importProjectFile(currentLocale, key)),
  ]);

  // Combine all project files into the projects namespace
  const projects: Record<string, unknown> = {};
  PROJECT_KEYS.forEach((key, index) => {
    const projectData = projectModules[index];
    if (key === "_common") {
      // Spread common strings at the root of projects
      Object.assign(projects, projectData);
    } else {
      projects[key] = projectData;
    }
  });

  return {
    locale: currentLocale,
    messages: {
      ...indexModule.default,
      projects,
    },
  };
});
