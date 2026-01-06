interface LegalDisclaimerProps {
  text: string;
}

export default function LegalDisclaimer({ text }: LegalDisclaimerProps) {
  return (
    <footer className="mt-16 border-t border-white/10 pt-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-500">
          <span className="mr-1 font-medium text-gray-400">⚖️ Disclaimer:</span>
          {text}
        </p>
      </div>
    </footer>
  );
}

