import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

import { sayHello } from "../functions/tagging-services/resources";

export const schema = a.schema({
  Post: a
    .model({
      postId: a.id().required(),
      title: a.string().required(),
      content: a.string().required(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      imageUrl: a.string(),
      tags: a.hasMany("PostTag", "postId"), // Link to the PostTag relationship model
      views: a.integer(),
      shareds: a.integer(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Tag: a
    .model({
      tagId: a.id().required(),
      name: a.string().required(),
      className: a.string(),
      posts: a.hasMany("PostTag", "tagId"), // Link to the PostTag relationship model
      categories: a.hasMany("TagCategory", "tagId"), // Link to the TagCategory relationship model
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Category: a
    .model({
      categoryId: a.id().required(),
      name: a.string().required(),
      tags: a.hasMany("TagCategory", "categoryId"), // Link to the TagCategory relationship model
    })
    .authorization((allow) => [allow.publicApiKey()]),

  PostTag: a
    .model({
      postId: a.id().required(),
      tagId: a.id().required(),
      post: a.belongsTo("Post", "postId"),
      tag: a.belongsTo("Tag", "tagId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  TagCategory: a
    .model({
      tagId: a.id().required(),
      categoryId: a.id().required(),
      tag: a.belongsTo("Tag", "tagId"),
      category: a.belongsTo("Category", "categoryId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    
  sayHello: a
    .query()
    .arguments({
      tagsCreated: a.string().array().required(),
      tags: a.string().array().required(),
      categories: a.string().array().required()

    })
    .returns(a.string())
    .handler(a.handler.function(sayHello)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
