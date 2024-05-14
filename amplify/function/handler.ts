import { env } from "$amplify/env/say-hello";

export const handler = async (event: any) => {
  console.log(env.NAME);
  // your function code goes here
  return "Hello, World!";
};
