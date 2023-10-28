// import { InitiateAuthCommand, InitiateAuthCommandInput, InitiateAuthCommandOutput, CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider"

export function onRequestPost({ request, next, env }) {
  console.log(request);
  return new Response("nice", {
    headers: {
      "Set-Cookie": "coffee=good; HttpOnly; Secure",
    },
  });
}
