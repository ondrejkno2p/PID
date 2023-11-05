import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = (async ({ params }) => {
  try {
    return new Response(JSON.stringify(stop), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({}), { status: 500 });
  }
}) satisfies RequestHandler;
