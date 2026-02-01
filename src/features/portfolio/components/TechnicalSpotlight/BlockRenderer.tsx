import { ArchitectureBlock } from "./ArchitectureBlock";
import { ChallengesBlock } from "./ChallengesBlock";
import { ComparisonBlock } from "./ComparisonBlock";
import { GridBlock } from "./GridBlock";
import { ResultBlock } from "./ResultBlock";
import { SimpleListBlock } from "./SimpleListBlock";
import { ContentBlock } from "./types";
import { WorkflowBlock } from "./WorkflowBlock";

export function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "workflow":
      return <WorkflowBlock block={block} />;

    case "grid":
      return <GridBlock block={block} />;

    case "comparison":
      return <ComparisonBlock block={block} />;

    case "list":
      return <SimpleListBlock block={block} />;

    case "challenges":
      return <ChallengesBlock block={block} />;

    case "architecture":
      return <ArchitectureBlock block={block} />;
    // case "decision": -> Handled by specific components or migrated to 'decisions'
    //   return <DecisionBlock block={block} />;
    case "result":
      return <ResultBlock block={block} />;

    default:
      return null;
  }
}

