// middleware to check if session is expired
import parseCookies from "../util/parseCookies";

export async function onRequest({ request, next }) {
  const { ExpiresAt } = parseCookies(request.headers.get("cookie"));
  if (ExpiresAt == undefined || Date.now()/1000 >= ExpiresAt) {
    return new Response("Unauthorized", { status: 401 });
  } else {
    return next();
  }
}
