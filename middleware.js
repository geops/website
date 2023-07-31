import { match } from "@formatjs/intl-localematcher";
import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
let { locales, defaultLocale } = i18n;

// Get the preferred locale, similar to above or using a library
function getLocale() {
  // These 2 lines are there to select automatically the language from browser lamnguage
  // but we don't want that
  // let languages = new Negotiator({
  //   headers: { "accept-language": request.headers.get("accept-language") },
  // }).languages();
  return match([], locales, defaultLocale); // -> 'en-US'
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every((locale) => {
    return !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`;
  });

  // const pathnameLocale = pathname.split("/")[1];

  // Redirect if there is no or wrong locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const paths = pathname.split("/");
    const pathLocale = paths[1];

    // Redirect to default langague when a wrong locale code is used
    if (
      pathLocale &&
      /^[A-Za-z]{2,4}([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$/.test(
        pathLocale,
      ) &&
      pathLocale !== "blog"
    ) {
      paths.splice(1, 1);
      const newPathname = paths.join("/");
      // redirect to german if the locale path doesn'exist
      return NextResponse.redirect(
        new URL(`/${locale}${newPathname ? newPathname : "/"}`, request.url),
      );
    }
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|favicon.ico|admin|sitemap|images|config.yml).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
