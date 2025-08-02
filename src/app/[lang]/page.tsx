import { getDictionary } from "@src/util/dictionaries";

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 ${className}`}>
    {children}
  </div>
);

export default async function Home({ params }: { params: Promise<{ lang: "en" | "zh" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col items-start gap-[32px]">
        <header className="flex w-full items-center justify-between">
          <div>
            <p className="text-3xl font-semibold tracking-tight">{dict["Kuan-Cheng Tsai"]}</p>
            <p className="text-base text-neutral-400">{dict["Frontend Engineer"]}</p>
          </div>
        </header>

        <p className="text-sm text-neutral-400 italic">{dict["Build fast. Think clean."]}</p>

        <section className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">{dict["About"]}</h2>
          <Card className="p-4">
            <p>
              {
                dict[
                  "I'm a frontend engineer specializing in cross-platform app development using React Native and Next.js."
                ]
              }
            </p>
          </Card>
        </section>

        <section className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">{dict["Experience"]}</h2>
          <Card className="p-4">
            <ul className="list-disc space-y-1 pl-4">
              <li>2024.09 - 現在：Frontend Engineer @ 樂創互娛</li>
              <li>2023.05 - 2024.09：開發者 @ Byte x Byte</li>
              <li>2021.07 - 2023.05：程式設計師 @ 智慧價值</li>
            </ul>
          </Card>
        </section>

        <section className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">{dict["Projects"]}</h2>
          <Card className="p-4">
            <ul className="list-disc space-y-1 pl-4">
              <li>Berify App - React Native + Next.js</li>
              <li>Sport Live Product - 效能優化</li>
              <li>Jubilee 醫療系統 - 圖示化報表開發</li>
            </ul>
          </Card>
        </section>

        <section className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">{dict["Contact"]}</h2>
          <Card className="p-4">
            <ul className="space-y-1">
              <li>Email: blf2556@gmail.com</li>
              <li>GitHub: github.com/a6232241</li>
              <li>LinkedIn: kuan-cheng-cal-766623172</li>
            </ul>
          </Card>
        </section>
      </main>
    </div>
  );
}
