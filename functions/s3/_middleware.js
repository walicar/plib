// middleware to check if session is expired
import parseCookies from "../util/parseCookies";
import isExpired from "../util/isExpired";

export async function onRequest({ request, next }) {
  const { ExpiresAt } = parseCookies(request.headers.get("cookie"));
  if (isExpired(ExpiresAt)) {
    return new Response("Unauthorized", { status: 401 });
  } else {
    return next();
  }
}
