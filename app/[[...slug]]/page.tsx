import { cacheLife, cacheTag } from "next/cache";

export const instant = false;

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

async function getCachedGreeting(slug: string[]) {
  "use cache: remote";
  cacheLife("hours");
  cacheTag("cache-component-isr");

  // Simulate a slow data fetch — this only runs once per cache entry.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return `Cached ${slug} at ${new Date().toLocaleTimeString()}`;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const greeting = await getCachedGreeting(slug);
  
  return (
        <main className="flex flex-col gap-4 p-16">
        <h1 className="text-2xl font-semibold">Cache Components example</h1>

        <section>
            <h2 className="font-medium">Static shell (cached)</h2>
            <p>{greeting}</p>
        </section>
        </main>
    );
}


export async function generateStaticParams() {
    return [{slug: ['paard']}]
}