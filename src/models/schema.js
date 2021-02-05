export const schema = {
  models: {
    Post: {
      name: "Post",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        data: {
          name: "data",
          isArray: false,
          type: "AWSJSON",
          isRequired: false,
          attributes: [],
        },
        userID: {
          name: "userID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: "Posts",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "key",
          properties: {
            name: "byUser",
            fields: ["userID"],
          },
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
    User: {
      name: "User",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        email: {
          name: "email",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        Posts: {
          name: "Posts",
          isArray: true,
          type: {
            model: "Post",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "userID",
          },
        },
      },
      syncable: true,
      pluralName: "Users",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: "a5168efcdb54ef81dd32cc5d3656e926",
};
