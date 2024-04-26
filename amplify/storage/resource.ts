import { defineStorage } from "@aws-amplify/backend";
export const storage = defineStorage({
  name: "myTestStorage",
  access: (allow) => ({
    "test/*": [allow.groups(["Admins"]).to(["read", "write", "delete"])],
  }),
});
