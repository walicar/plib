/**
 * @todo test for different auth challenges, 
 *  only works on NEW_PASSWORD_REQUIRED
 */
import { CognitoIdentityProviderClient, RespondToAuthChallengeCommand } from "@aws-sdk/client-cognito-identity-provider";

export async function onRequestPost({ request, next, env }) {
    const { ChallengeName, Session, ChallengeParameters } = await request.json();
    console.log(ChallengeParameters)
    const client = new CognitoIdentityProviderClient({
      region: env.REGION,
    });
    const command = new RespondToAuthChallengeCommand({
      ClientId: env.COG_CLIENT_ID,
      ChallengeName: ChallengeName,
      Session: Session,
      ChallengeResponses: ChallengeParameters
    });

    const { AuthenticationResult } =
      await client.send(command);

    if (AuthenticationResult) {
      const { ExpiresIn, IdToken } = res.AuthenticationResult;
      const headers = new Headers();
  
      headers.append("Set-Cookie", `IdToken=${IdToken}; HttpOnly; Secure`);
      headers.append("Set-Cookie", `ExpiresAt=${Date.now() / 1000 + ExpiresIn};`);

      return new Response("Authenticated", {
        headers: headers,
      });
    }
    return new Response("Something bad happened", { status: 400 })
  }
