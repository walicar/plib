// return a dict of cookie key value pairs.

export default function parseCookies(string) {
  const list = string.split(";");
  const dict = {};
  list.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    dict[key.trim()] = value;
  });
  return dict;
}
