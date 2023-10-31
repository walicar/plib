/**
 * @todo handle case where there is no content-type
 */

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import parseCookies from "../util/parseCookies";
import getCreds from "../util/getCreds";

export async function onRequestGet({ request, env }) {
  // Check search params for a path
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const path = params.get("path");
  if (!path) {
    return new Response("Bad Request", {
      status: 400,
    });
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

  const getObject = new GetObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: path,
  });

  const { ContentType, Body } = await s3.send(getObject);

  return new Response(Body, {
    headers: {
      "Content-Type": ContentType,
      "Content-Disposition": `attachment; filename=${path}`,
    },
  });
}
