import { ProjectImageItemProps } from "@src/components/shared";

export type SpotlightIconType = "shield" | "zap" | "database" | "smartphone" | "layout";

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  highlights?: number[];
  tooltips?: Array<{ line: number; content: string }>;
}

export interface SpotlightItem {
  id: string;
  title: string;
  role: string;
  icon: SpotlightIconType;
  summary: string;
  tags: string[];
  challenge: ListBlock;
  analysis?: ListBlock;
  decisions?: DecisionsBlock;
  result: ResultBlock;
  showcase?: ProjectImageItemProps;
  codeSnippetTabs?: Array<CodeSnippet & { label: string }>;
}

export interface ListBlock {
  title: string;
  items: string[];
}

export interface DecisionsBlock {
  title: string;
  items: Array<{
    title: string;
    items: Array<{
      title?: string;
      desc?: string;
      highlight?: boolean;
    }>;
  }>;
}

export interface ResultBlock {
  title: string;
  items: string[];
}
