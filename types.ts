// ^======================== types ========================^ //

type BaseAppwriteDocument = {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
};

type UserType = BaseAppwriteDocument & {
  accountId: string;
  avatar: string;
  email: string;
  username: string;
};

export type VideoCardType = BaseAppwriteDocument & {
  prompt: string;
  thumbnail: string;
  title: string;
  users: UserType;
  video: string;
};
