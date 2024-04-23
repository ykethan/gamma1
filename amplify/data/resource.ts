import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
  Member: a
    .model({
      name: a.string().required(),
      // 1. Create a reference field
      teamId: a.id(),
      // 2. Create a belongsTo relationship with the reference field
      team: a.belongsTo("Team", "teamId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Team: a
    .model({
      mantra: a.string().required(),
      // 3. Create a hasMany relationship with the reference field
      //    from the `Member`s model.
      members: a.hasMany("Member", "teamId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Cart: a
    .model({
      items: a.string().required().array(),
      // 1. Create reference field
      customerId: a.id(),
      // 2. Create relationship field with the reference field
      customer: a.belongsTo("Customer", "customerId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Customer: a
    .model({
      name: a.string(),
      // 3. Create relationship field with the reference field
      //    from the Cart model
      activeCart: a.hasOne("Cart", "customerId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  PostTag: a
    .model({
      // 1. Create reference fields to both ends of
      //    the many-to-many relationship
      postId: a.id().required(),
      tagId: a.id().required(),
      // 2. Create relationship fields to both ends of
      //    the many-to-many relationship using their
      //    respective reference fields
      post: a.belongsTo("Post", "postId"),
      tag: a.belongsTo("Tag", "tagId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Post: a
    .model({
      title: a.string(),
      content: a.string(),
      // 3. Add relationship field to the join model
      //    with the reference of `postId`
      tags: a.hasMany("PostTag", "postId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Tag: a
    .model({
      name: a.string(),
      // 4. Add relationship field to the join model
      //    with the reference of `tagId`
      posts: a.hasMany("PostTag", "tagId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Poster: a
    .model({
      title: a.string().required(),
      content: a.string().required(),
      authorId: a.id(),
      author: a.belongsTo("Person", "authorId"),
      editorId: a.id(),
      editor: a.belongsTo("Person", "editorId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  Person: a
    .model({
      name: a.string(),
      editedPosts: a.hasMany("Poster", "editorId"),
      authoredPosts: a.hasMany("Poster", "authorId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
    apiKeyAuthorizationMode: {
      expiresInDays: 17,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
