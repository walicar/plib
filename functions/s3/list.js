import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { CognitoIdentityClient, GetCredentialsForIdentityCommand, GetIdCommand} from "@aws-sdk/client-cognito-identity";
import parseCookies from "../util/parseCookies";

export async function onRequestGet({ request, nex, env }) {
  const { IdToken } = parseCookies(request.headers.get("cookie"));
  const cognito = new CognitoIdentityClient({region: env.REGION});
  // Get IdentityId first
  const getId = new GetIdCommand({
    IdentityPoolId: env.COG_IDENTITYPOOL_ID,
    Logins: {
      [`cognito-idp.${env.REGION}.amazonaws.com/${env.COG_USERPOOL_ID}`]: `${IdToken}`
    }
  })
  const { IdentityId } = await cognito.send(getId);
  // Then use IdentityId to get Creds
  const getCreds = new GetCredentialsForIdentityCommand({
    IdentityId: IdentityId,
    Logins: {
      [`cognito-idp.${env.REGION}.amazonaws.com/${env.COG_USERPOOL_ID}`]: `${IdToken}`
    }
  });
  const { Credentials } = await cognito.send(getCreds);
  // Use Creds access S3 Bucket
  const s3 = new S3Client({
    region: env.REGION,
    credentials: {
      accessKeyId: Credentials.AccessKeyId,
      secretAccessKey: Credentials.SecretKey,
      sessionToken: Credentials.SessionToken
    }
  })
  const listObjects = new ListObjectsV2Command({
    Bucket: env.S3_BUCKET
  })
  const { Contents } = await s3.send(listObjects);
  return Response.json(Contents);
}
