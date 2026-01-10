export function highlightCode(code: string, terms: string[]): React.ReactNode {
  if (!terms || terms.length === 0) return code;

  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    let result: React.ReactNode[] = [];
    let currentText = line;
    let keyIndex = 0;

    // Process each highlight term
    terms.forEach((term) => {
      const parts = currentText.split(term);
      if (parts.length > 1) {
        const newResult: React.ReactNode[] = [];
        parts.forEach((part, i) => {
          if (part) {
            newResult.push(<span key={`${lineIndex}-${keyIndex++}`}>{part}</span>);
          }
          if (i < parts.length - 1) {
            newResult.push(
              <span
                key={`${lineIndex}-hl-${keyIndex++}`}
                className="rounded bg-yellow-500/30 px-1 font-bold text-yellow-200">
                {term}
              </span>,
            );
          }
        });
        result = newResult;
        currentText = parts.join("");
      }
    });

    if (result.length === 0) {
      result = [<span key={`${lineIndex}-text`}>{line}</span>];
    }

    return (
      <div key={lineIndex} className="leading-relaxed">
        {result}
      </div>
    );
  });
}

