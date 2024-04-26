import { defineStorage } from "@aws-amplify/backend";
export const storage = defineStorage({
  name: "myTestStorage",
  access: (allow) => allow.groups(["Admin"]),
});
