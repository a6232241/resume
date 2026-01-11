export function highlightCode(code: string, terms: string[]): React.ReactNode {
  if (!terms || terms.length === 0) return code;

  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    // 1. Find all matches for all terms
    const matches: { start: number; end: number; term: string }[] = [];
    terms.forEach((term) => {
      if (!term) return;
      let startIndex = 0;
      while (startIndex < line.length) {
        const index = line.indexOf(term, startIndex);
        if (index === -1) break;
        matches.push({ start: index, end: index + term.length, term });
        startIndex = index + 1; // Move forward to find next occurrence
      }
    });

    // 2. Sort matches by start index
    matches.sort((a, b) => a.start - b.start);

    // 3. Filter overlapping matches (simple strategy: keep first/longest)
    const validMatches: typeof matches = [];
    let lastEnd = 0;
    matches.forEach((match) => {
      if (match.start >= lastEnd) {
        validMatches.push(match);
        lastEnd = match.end;
      }
    });

    // 4. Build the result
    if (validMatches.length === 0) {
      return (
        <div key={lineIndex} className="leading-relaxed">
          <span key={`${lineIndex}-text`}>{line}</span>
        </div>
      );
    }

    const result: React.ReactNode[] = [];
    let currentIndex = 0;

    validMatches.forEach((match, i) => {
      // Add text before match
      if (match.start > currentIndex) {
        result.push(<span key={`${lineIndex}-text-${i}`}>{line.substring(currentIndex, match.start)}</span>);
      }
      // Add match
      result.push(
        <span key={`${lineIndex}-hl-${i}`} className="rounded bg-yellow-500/30 px-1 font-bold text-yellow-200">
          {match.term}
        </span>,
      );
      currentIndex = match.end;
    });

    // Add remaining text
    if (currentIndex < line.length) {
      result.push(<span key={`${lineIndex}-text-end`}>{line.substring(currentIndex)}</span>);
    }

    return (
      <div key={lineIndex} className="leading-relaxed">
        {result}
      </div>
    );
  });
}

