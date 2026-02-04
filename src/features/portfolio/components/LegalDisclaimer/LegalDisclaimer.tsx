export interface LegalDisclaimerProps {
  text: string;
}
export function LegalDisclaimer({ text }: LegalDisclaimerProps) {
  return (
    <footer className="mt-16 border-t border-gray-200 pt-8 dark:border-white/10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          <span className="mr-1 font-medium text-gray-500 dark:text-gray-400">⚖️ Disclaimer:</span>
          {text}
        </p>
      </div>
    </footer>
  );
}
