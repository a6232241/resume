"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
  appleAppStoreLink?: string;
  googlePlayStoreLink?: string;
}

export function StoreSection({ appleAppStoreLink, googlePlayStoreLink }: Props) {
  const t = useTranslations("projects");

  return (
    <section className={`flex flex-col gap-8`}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("storeTitle")}</h2>

      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row dark:border-gray-800 dark:bg-gray-900/50">
        {/* Left Info */}
        <div className="flex items-center gap-4">
          {/* App Icon Placeholder */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl dark:bg-slate-800">
            📱
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Berify</h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">React Native | TypeScript</p>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex gap-4">
          {appleAppStoreLink && (
            <div className="group relative">
              {/* QR Code Popup */}
              <div className="invisible absolute bottom-full left-1/2 mb-4 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="relative rounded-lg bg-white p-2 shadow-xl">
                  {/* QR Code Placeholder */}
                  <div
                    className="h-[100px] w-[100px] bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(appleAppStoreLink)}')`,
                    }}
                  />
                  {/* Triangle Arrow */}
                  <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-t-white border-r-transparent border-l-transparent" />
                </div>
              </div>

              <Link
                href={appleAppStoreLink}
                target="_blank"
                className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 transition-colors hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20">
                {/* Placeholder for App Store Badge */}
                <span className="font-semibold text-white">App Store</span>
              </Link>
            </div>
          )}
          {googlePlayStoreLink && (
            <div className="group relative">
              {/* QR Code Popup */}
              <div className="invisible absolute bottom-full left-1/2 mb-4 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="relative rounded-lg bg-white p-2 shadow-xl">
                  {/* QR Code Placeholder */}
                  <div
                    className="h-[100px] w-[100px] bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(googlePlayStoreLink)}')`,
                    }}
                  />
                  {/* Triangle Arrow */}
                  <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-t-white border-r-transparent border-l-transparent" />
                </div>
              </div>

              <Link
                href={googlePlayStoreLink}
                target="_blank"
                className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 transition-colors hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20">
                {/* Placeholder for Google Play Badge */}
                <span className="font-semibold text-white">Google Play</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
