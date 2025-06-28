import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const supportLangs = ["en", "zh"];
const staticExt = [
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".ico",
  ".css",
  ".js",
  ".json",
  ".txt",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".otf",
  ".map",
];

const getLang = (request: NextRequest) => {
  const headers = Object.fromEntries(request.headers.entries());
  const negotiator = new Negotiator({ headers });
  const languages = negotiator.languages();
  const defaultLang = "en";
  return match(languages, supportLangs, defaultLang);
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (staticExt.some((ext) => pathname.endsWith(ext))) return;

  const pathnameHasLang = supportLangs.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );
  if (pathnameHasLang) return;

  const lang = getLang(request);
  request.nextUrl.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
