import { ProjectDetailData } from "./types";

interface Props {
  data: NonNullable<ProjectDetailData["learnings"]>;
}

export default function ProjectLearnings({ data }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">💡 個人收穫</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {data.map((learning, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-purple-200 bg-purple-50 p-6 dark:border-purple-900 dark:bg-purple-900/20">
            <h4 className="mb-2 font-semibold text-purple-900 dark:text-purple-300">{learning.title}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{learning.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
