import {
  CognitoIdentityClient,
  GetCredentialsForIdentityCommand,
  GetIdCommand,
} from "@aws-sdk/client-cognito-identity";

export default async function getCreds(IdToken, env) {
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
  return await cognito.send(getCreds);
}
