import GithubIcon from "@public/github.svg";

interface Props {
  href: string;
}

export default function SourceCodeLink({ href }: Props) {
  return (
    <section className="text-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-105 hover:shadow-lg">
        <GithubIcon width={20} height={20} color="white" />
        View Source Code on GitHub
      </a>
    </section>
  );
}

