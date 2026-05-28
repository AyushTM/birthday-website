import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { MusicToggle } from "@/components/MusicToggle";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center gradient-romance px-4">
      <div className="glass max-w-md text-center p-10 rounded-3xl">
        <h1 className="text-7xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page is missing — but the celebration isn't.</p>
        <div className="mt-6">
          <Link to="/" className="btn-festive inline-flex">Back to celebration</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center gradient-romance px-4">
      <div className="glass max-w-md text-center p-10 rounded-3xl">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again, the party is waiting.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-festive">Try again</button>
          <a href="/" className="btn-festive btn-gold">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Happy Birthday — A Wish For You" },
      { name: "description", content: "An animated, interactive birthday wish website with surprises, memories, and an emotional message." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Happy Birthday — A Wish For You" },
      { property: "og:description", content: "An animated birthday wish with surprises, memories, and a heartfelt message." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;800&family=Dancing+Script:wght@600;700&family=Poppins:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <MusicToggle />
      <Outlet />
    </QueryClientProvider>
  );
}
