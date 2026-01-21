const rateLimitStore = new Map(); // key: IP, value: { count, timestamp }

const WINDOW = 60 * 10000; // 1 minute
const LIMIT = 5; // 10 requests per minute
export async function rateLimit(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  const now = Date.now();
  const record = rateLimitStore.get(ip) || { count: 0, timestamp: now };

  // Reset window
  if (now - record.timestamp > WINDOW) {
    record.count = 0;
    record.timestamp = now;
  }

  record.count++;
  rateLimitStore.set(ip, record);

  if (record.count > LIMIT) {
    return new Response("Rate limit exceeded", { status: 429 });
  }
}
