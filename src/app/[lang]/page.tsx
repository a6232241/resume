import DayNightVisuals from "@src/components/DayNightVisuals";
import { getDictionary } from "@src/util/dictionaries";
import Image from "next/image";

export default async function Home({ params }: { params: Promise<{ lang: "en" | "zh" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = (key: keyof typeof dict) => dict[key] || key;

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <DayNightVisuals />
      <main className="row-start-2 flex flex-col items-start gap-[32px]">
        <header className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">{t("Hello, I'm Kuan-Cheng Tsai")}</h2>
            <p>
              {t(
                "I am a frontend developer specializing in mobile applications with React Native, with over four years of experience, and I also have experience using Next.js for web application development.",
              )}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">{t("I have worked with companies such as")}</p>
            <ul className="flex list-image-none flex-wrap gap-2 text-sm">
              <li>樂創互娛</li>
              <li>|</li>
              <li>Byte x Byte</li>
              <li>|</li>
              <li>智慧價值</li>
            </ul>
          </div>
        </header>

        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{t("Work")}</h2>
          <div>
            <Image src="https://placehold.co/150.png" alt={t("Optimization loading speed")} width={150} height={150} />
            <p>{t("Optimization loading speed")}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
