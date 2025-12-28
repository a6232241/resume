import { ProjectDetailData } from "./types";

interface Props {
  data: NonNullable<ProjectDetailData["architecture"]>;
}

export default function ProjectArchitecture({ data }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">🏗️ {data.title}</h2>
      <div className="space-y-3">
        {data.layers.map((layer, idx) => (
          <div
            key={idx}
            className="rounded-lg border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent p-4 dark:from-blue-900/20 dark:to-transparent">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300">
              Layer {idx + 1}: {layer.name}
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {layer.responsibilities?.map((resp, i) => (
                <li key={i} className="flex gap-2">
                  <span>•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
