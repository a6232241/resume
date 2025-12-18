"use client";

import GithubIcon from "@public/github.svg";
import LinkedInIcon from "@public/linkedin.svg";
import { useTheme } from "@src/context/ThemeContext";
import Link from "next/link";

export default function SocialLinks() {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-row items-center gap-4">
      <Link href="https://github.com/a6232241" className="text-lg font-semibold">
        {isDark ? (
          <GithubIcon width={24} height={24} color="var(--color-foreground)" />
        ) : (
          <GithubIcon width={24} height={24} color="var(--color-foreground)" />
        )}
      </Link>
      <Link href="https://www.linkedin.com/in/kuan-cheng-cai-766623172" className="text-lg font-semibold">
        {isDark ? (
          <LinkedInIcon width={24} height={24} color="var(--color-foreground)" />
        ) : (
          <LinkedInIcon width={24} height={24} color="var(--color-foreground)" />
        )}
      </Link>
    </div>
  );
}
