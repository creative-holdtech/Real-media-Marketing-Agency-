import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { JsonLd } from "../components/json-ld";
import appCss from "../styles.css?url";
import { NavProvider } from "../components/nav-context";
import { HubSpotTracking } from "../components/hubspot-tracking";
import { SmoothScrollProvider } from "../components/smooth-scroll-provider";
import { PageTransitionCurtain } from "../components/page-transition";
import { PremiumCursor } from "../components/premium-cursor";
import { fetchNavigation } from "../lib/payload/navigation";
import { buildPageHead, organizationJsonLd } from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => ({
    navigation: await fetchNavigation(),
  }),
  head: () => {
    const seo = buildPageHead({
      title: "R-M — Marketing Agency",
      description: "R-M is a marketing agency for founders building in EU and MENA.",
      pathname: "/",
    });
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        ...(import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
          ? [
              {
                name: "google-site-verification",
                content: String(import.meta.env.VITE_GOOGLE_SITE_VERIFICATION),
              },
            ]
          : []),
        ...seo.meta,
      ],
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "sitemap", type: "application/xml", title: "Sitemap", href: "/sitemap.xml" },
        { rel: "stylesheet", href: appCss },
        // Manrope — site-wide base typeface (loaded globally, matches the home page).
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
        },
        ...seo.links,
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <JsonLd data={organizationJsonLd()} />
        {children}
        <HubSpotTracking />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { navigation } = Route.useLoaderData();

  return (
    <QueryClientProvider client={queryClient}>
      <NavProvider items={navigation}>
        <SmoothScrollProvider>
          <PremiumCursor />
          <Outlet />
          <PageTransitionCurtain />
        </SmoothScrollProvider>
      </NavProvider>
    </QueryClientProvider>
  );
}
