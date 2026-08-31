export default function handler(_request, response) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  response.setHeader("Cache-Control", "no-store");
  if (!url || !publishableKey) {
    return response.status(503).json({ error: "Vedøy Login is not configured for this deployment." });
  }

  return response.status(200).json({ url, publishableKey });
}
