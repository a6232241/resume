import { Circle, Database, Network, Server, Smartphone, Zap } from "lucide-react";

interface BerifyEngineeringSectionProps {
  architectureFlowData: {
    title: string;
    steps: Array<{ step: string; title: string; desc: string; metric?: string }>;
  };
  architectureMetrics: {
    title: string;
    list: Array<{
      title: string;
      metric: string;
      desc: string | string[];
    }>;
  };
}

export const BerifyEngineeringSection = ({
  architectureFlowData,
  architectureMetrics,
}: BerifyEngineeringSectionProps) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-sm transition-all dark:border-gray-800 dark:bg-gray-900/50">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <Network className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{architectureFlowData.title}</h2>
      </div>

      {/* Process Flow (Condensed) */}
      <div className="mb-6">
        <div className="relative flex flex-col gap-2 md:flex-row md:items-start md:gap-0">
          {architectureFlowData.steps.map((step, index) => {
            const icons = [Smartphone, Server, Database, Zap];
            const StepIcon = icons[index] || Circle;

            return (
              <div key={index} className="group relative flex flex-1 flex-col items-center text-center">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gray-50 text-gray-400 ring-1 ring-gray-200 transition-all group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:ring-blue-200 dark:bg-gray-800 dark:text-gray-500 dark:ring-gray-700 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400 dark:group-hover:ring-blue-800">
                  <StepIcon className="h-4 w-4" />
                </div>

                <div className="px-1">
                  <div className="mb-0.5 text-base font-bold text-gray-900 dark:text-white">{step.title}</div>
                  <div className="scale-90 text-sm text-gray-500 dark:text-gray-200">{step.desc}</div>
                </div>

                {/* Connector Line */}
                {index < architectureFlowData.steps.length - 1 && (
                  <div className="absolute top-4 left-1/2 -z-10 hidden w-full -translate-y-1/2 px-8 md:block">
                    <div className="h-px w-full border-t border-dashed border-gray-200 dark:border-gray-800"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Engineering Ownership Section */}
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          <Server className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{architectureMetrics.title}</h2>
      </div>

      {/* Metrics Grid (3 Columns) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {architectureMetrics.list.map((item, index) => {
          return (
            <div
              key={index}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all dark:border-gray-800 dark:bg-gray-900">
              {/* --- System Context Layer (Top - Dark) --- */}
              <div className="flex min-h-[6rem] flex-col justify-between bg-gray-50 px-5 py-5 dark:bg-gray-800/50">
                <div className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  {item.title}
                </div>
                <div className="text-lg leading-tight font-bold text-gray-900 dark:text-white">{item.metric}</div>
              </div>

              {/* --- Separator Line --- */}
              <div className="h-px w-full bg-purple-100 dark:bg-purple-900/50"></div>

              {/* --- Individual Impact Layer (Bottom - Light) --- */}
              <div className="flex flex-1 flex-col p-5 pt-6">
                {/* Action Items */}
                <div className="mt-auto text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  <ul className="flex flex-col gap-3 pl-1">
                    {Array.isArray(item.desc) ? (
                      item.desc.map((point: string, idx: number) => {
                        return (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-400 dark:bg-purple-500" />
                            <span className="leading-snug">{point}</span>
                          </li>
                        );
                      })
                    ) : (
                      <span className="leading-snug">{item.desc}</span>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
