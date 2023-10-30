/**
 * @todo handle case where there is no content-type
 */

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  CognitoIdentityClient,
  GetCredentialsForIdentityCommand,
  GetIdCommand,
} from "@aws-sdk/client-cognito-identity";
import parseCookies from "../util/parseCookies";

export async function onRequestGet({ request, nex, env }) {
  // Check search params for a prefix
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const path = params.get("path");
  if (!path) {
    return new Response("Bad Request", {
      status: 400,
    });
  }

  const { IdToken } = parseCookies(request.headers.get("cookie"));
  const cognito = new CognitoIdentityClient({ region: env.REGION });
  // Get IdentityId first
  const getId = new GetIdCommand({
    IdentityPoolId: env.COG_IDENTITYPOOL_ID,
    Logins: {
      [`cognito-idp.${env.REGION}.amazonaws.com/${env.COG_USERPOOL_ID}`]: `${IdToken}`,
    },
  });
  const { IdentityId } = await cognito.send(getId);
  // Then use IdentityId to get Creds
  const getCreds = new GetCredentialsForIdentityCommand({
    IdentityId: IdentityId,
    Logins: {
      [`cognito-idp.${env.REGION}.amazonaws.com/${env.COG_USERPOOL_ID}`]: `${IdToken}`,
    },
  });
  const { Credentials } = await cognito.send(getCreds);
  // Use Creds access S3 Bucket
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
    Key: path
  });
  const { ContentType, Body } = await s3.send(getObject);
  return new Response(Body, {
    headers: {
        "Content-Type": ContentType,
        "Content-Disposition": `attachment; filename=${path}`
    }
  });
}