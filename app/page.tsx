"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();
Amplify.configure(outputs);

export default function Home() {
  const createcall = async (
    username: string,
    firstName: string,
    lastName: string,
    birthdate: string,
    phoneNumber: string
  ) => {
    await client.models.User.create({
      birthdate: "02-04-1998",
      firstName: "kdasdi",
      lastName: "kashi",
      username: "jada",
      phoneNumber: "+1 416-996-9581 ",
      searchTerm: "testterm",
    });
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Amplify</h1>
          <button
            onClick={() =>
              createcall(
                "test",
                "test1",
                "test2",
                "02-04-1999",
                "+1 412-992-9582"
              )
            }
          >
            Create
          </button>
        </main>
      )}
    </Authenticator>
  );
}
