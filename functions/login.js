import {
  InitiateAuthCommand,
  CognitoIdentityProviderClient,
  AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider";

export async function onRequestPost({ request, next, env }) {
  const { username, password } = await request.json();
  const client = new CognitoIdentityProviderClient({
    region: env.REGION,
  });
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: env.COG_CLIENT_ID,
  });
  const res = await client.send(command);
  if (res.AuthenticationResult) {
    const { AccessToken, ExpiresIn, IdToken } = res.AuthenticationResult;
    const headers = new Headers();
    //
    headers.append(
      "Set-Cookie",
      `AccessToken=${AccessToken}; HttpOnly; Secure`
    );
    headers.append("Set-Cookie", `IdToken=${IdToken}; HttpOnly; Secure`);
    headers.append("Set-Cookie", `ExpiresAt=${(Date.now()/1000) + ExpiresIn};`);
    //
    return new Response("Authenticated", {
      headers: headers,
    });
  }
  return new Response("Challenge Required", {
    body: JSON.stringify(res),
  });
}
