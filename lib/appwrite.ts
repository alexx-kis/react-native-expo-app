import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.aora',
  projectId: '67b2e00a0015403a3844',
  databaseId: '67b2e159001dfb5ab8c9',
  userCollectionId: '67b2e174003039804830',
  videosCollectionId: '67b2e1900022f6ed41e2',
  storageId: '67b2e2a00029bd0d46de'
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videosCollectionId,
  storageId,
} = appwriteConfig;

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      throw Error;
    } else {
      const avatarUrl = avatars.getInitials(username);
      await signIn(email, password);
      const newUser = await databases.createDocument(
        databaseId,
        userCollectionId,
        ID.unique(),
        {
          accountid: newAccount.$id,
          email,
          username,
          avatar: avatarUrl
        }
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error('error');
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unknown error occurred during sign-in');
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    } else {
      const currentUser = await databases.listDocuments(
        databaseId,
        userCollectionId,
        [Query.equal('accountid', currentAccount.$id)]
      );
      if (!currentUser) {
        throw Error;
      } else {
        return currentUser.documents[0];
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.orderDesc('$createdAt')]
    );
    return posts.documents;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videosCollectionId,
      [Query.equal("users.$id", userId)]
    );

    return posts.documents;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error((error as Error).message);
  }
};


export const debugCollection = async () => {
  try {
    const response = await databases.listDocuments(databaseId, videosCollectionId);
    console.log("First document in collection:", response.documents[0]);
  } catch (error) {
    console.error("Error fetching collection schema:", error);
  }
};


// debugCollection()