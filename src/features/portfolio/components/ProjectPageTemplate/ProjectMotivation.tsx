import { ProjectDetailData } from "./types";

interface Props {
  data: NonNullable<ProjectDetailData["motivation"]>;
}

export default function ProjectMotivation({ data }: Props) {
  return (
    <section className="space-y-4 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-900/20">
      <h2 className="text-2xl font-bold">💡 {data.title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{data.description}</p>
      {data.keyQuestions && (
        <div className="space-y-2 pt-4">
          {data.keyQuestions.map((q, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{idx + 1}️</span>
              <span className="text-gray-700 dark:text-gray-300">{q}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
