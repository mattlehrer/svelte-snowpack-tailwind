import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export declare class Post {
  readonly id: string;
  readonly data?: string;
  readonly userID: string;
  constructor(init: ModelInit<Post>);
  static copyOf(
    source: Post,
    mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void,
  ): Post;
}

export declare class User {
  readonly id: string;
  readonly email?: string;
  readonly Posts?: (Post | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(
    source: User,
    mutator: (draft: MutableModel<User>) => MutableModel<User> | void,
  ): User;
}
