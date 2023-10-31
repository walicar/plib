import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import getCreds from "../util/getCreds";
import parseCookies from "../util/parseCookies";

export async function onRequestGet({ request, env }) {
  // Check search params for a prefix
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  var prefix = "";
  if (params.get("prefix")) {
    prefix = params.get("prefix");
  }

  const { IdToken } = parseCookies(request.headers.get("cookie"));
  const { Credentials } = await getCreds(IdToken, env);

  const s3 = new S3Client({
    region: env.REGION,
    credentials: {
      accessKeyId: Credentials.AccessKeyId,
      secretAccessKey: Credentials.SecretKey,
      sessionToken: Credentials.SessionToken,
    },
  });

  const listObjects = new ListObjectsV2Command({
    Bucket: env.S3_BUCKET,
    Delimiter: "/",
    Prefix: prefix,
  });

  const { Contents, CommonPrefixes } = await s3.send(listObjects);
  const result = [
    ...(CommonPrefixes ? CommonPrefixes : []),
    ...(Contents ? Contents : []),
  ];
  return Response.json(result);
}
