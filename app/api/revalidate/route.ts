import { revalidateTag } from "next/cache";

export async function GET() {
  revalidateTag("cache-component-isr", "max");
  return Response.json({ revalidated: true, now: Date.now() });
}
