"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User is not logged in!");
  if (!apiKey) throw new Error("Stream Api key Missing");
  if (!apiSecret) throw new Error("No API SECRET !");

  console.log("Inside token provider here is api key and secret", apiKey, apiSecret)

  const client = new StreamClient(apiKey, apiSecret);  // server ka client jo ki stream se baat krega for token genration
  console.log("created client at nodesdk", client)
  // Because only your server knows the secret, only your server can generate valid access tokens. 
  // This confirms to Stream that the request for a token is coming from a legitimate backend associated with your account.

  const validity = 60 * 60;
  const token = client.generateUserToken({
    user_id: user.id,
    validity_in_seconds: validity,
  });
  console.log("here is token", token)

  return token;
};
