import {Client, Account, ID, Avatars, Databases, Query, Storage} from 'react-native-appwrite';
import {User} from '@/context/GlobalProvider';
import {ImagePickerAsset} from 'expo-image-picker';
// Init your React Native SDK
const client = new Client();

client
   .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
   .setProject(appWriteConfig.projectId) // Your project ID
   .setPlatform(appWriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
// Register User
export const createUser = async (email: string, password: string, username: string) => {
   try {
      const newAccount = await account.create(ID.unique(), email, password, username);
      console.log(newAccount.$id);

      if (!newAccount) throw Error;

      const avatarUrl = avatars.getInitials(username);

      await signIn(email, password);

      const newUser = await databases.createDocument(appWriteConfig.databaseId, appWriteConfig.userCollectionId, ID.unique(), {
         accountId: newAccount.$id,
         email,
         username,
         avatar: avatarUrl,
      });

      const user: User = {
         username: newUser.username,
         email: newUser.email,
         avatar: newUser.avatar,
         accountId: newUser.accountId,
         $id: newUser.$id,
         $createdAt: newUser.$createdAt,
         $updatedAt: newUser.$updatedAt,
         $permissions: newUser.$permissions,
         $databaseId: newUser.$databaseId,
         $collectionId: newUser.$collectionId,
      };
      console.log('New User', newUser);
      return user;
   } catch (error) {
      console.error(error);
      throw new Error('Error creating account');
   }
};

export const signIn = async (email: string, password: string) => {
   try {
      const session = await account.createEmailPasswordSession(email, password);
      if (!session) {
         throw new Error('Error creating session');
      }
      return session;
   } catch (error) {
      console.error(error);
      throw new Error('Error creating session');
   }
};

export const getCurrentUser = async (): Promise<User> => {
   try {
      const CurrentAccount = await account.get();
      if (!CurrentAccount) {
         throw new Error('Error getting user');
      }
      const CurrentUser = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.userCollectionId, [Query.equal('accountId', CurrentAccount.$id)]);

      if (!CurrentUser || CurrentUser.documents.length === 0) {
         throw new Error('Error getting user');
      }

      const userDoc = CurrentUser.documents[0];
      const user: User = {
         username: userDoc.username,
         email: userDoc.email,
         avatar: userDoc.avatar,
         accountId: userDoc.accountId,
         $id: userDoc.$id,
         $createdAt: userDoc.$createdAt,
         $updatedAt: userDoc.$updatedAt,
         $permissions: userDoc.$permissions,
         $databaseId: userDoc.$databaseId,
         $collectionId: userDoc.$collectionId,
      };

      return user;
   } catch (error) {
      console.error(error);
      throw new Error('Error getting user');
   }
};

export const getAllPosts = async () => {
   try {
      const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.picturesCollectionId);
      if (!posts) {
         throw new Error('Error getting posts');
      }
      return posts.documents;
   } catch (error) {
      throw new Error('Error getting posts');
   }
};

export const getLatestPosts = async () => {
   try {
      const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.picturesCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)]);
      if (!posts) {
         throw new Error('Error getting posts');
      }
      return posts.documents;
   } catch (error) {
      throw new Error('Error getting posts');
   }
};
export const searchPost = async (query: string) => {
   try {
      const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.picturesCollectionId, [Query.search('title', query)]);
      if (!posts) {
         throw new Error('Error getting posts');
      }
      return posts.documents;
   } catch (error) {
      throw new Error('Error getting posts');
   }
};

export const getuserPost = async (userId: string) => {
   try {
      const posts = await databases.listDocuments(appWriteConfig.databaseId, appWriteConfig.picturesCollectionId, [Query.equal('creator', userId)]);
      if (!posts) {
         throw new Error('Error getting posts');
      }
      return posts.documents;
   } catch (error) {
      throw new Error('Error getting posts');
   }
};

export async function signOut() {
   try {
      const session = await account.deleteSession('current');

      return session;
   } catch (error) {
      throw new Error('Error signing out');
   }
}

export const getFilePreview = async (fileId, type: string) => {
   let fileUrl;

   try {
      if (type === 'image') {
         fileUrl = storage.getFilePreview(appWriteConfig.storageId, fileId, 2000, 2000);
         console.log('FILE URL', fileUrl);
      }
      if (!fileUrl) {
         throw new Error('Error getting file preview');
      }
      return fileUrl;
   } catch (error) {}
};

interface FileDetails {
   mimeType: string;
   [key: string]: any;
}

export const uploafile = async (file: ImagePickerAsset | null, type: string) => {
   if (!file) {
      throw new Error('No file provided');
   }

   const asset = {
      name: file.fileName || 'default_name',
      type: file.mimeType || 'application/octet-stream',
      size: file.fileSize || 0,
      uri: file.uri,
   };
   try {
      const uploadedFile = await storage.createFile(appWriteConfig.storageId, ID.unique(), asset);
      console.log('UPLOADED FILE', uploadedFile);
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
   } catch (error) {
      throw new Error('Error uploading file');
   }
};
interface PictureForm {
   title: string;
   picture: ImagePickerAsset | null;
   thumbnail: string;
   userId: string;
}

export const uploadPicture = async (form: PictureForm) => {
   try {
      const [picture] = await Promise.all([uploafile(form.picture, 'image')]);

      const newPost = await databases.createDocument(appWriteConfig.databaseId, appWriteConfig.picturesCollectionId, ID.unique(), {
         title: form.title,
         picture: picture,
         thumbnail: picture,
         creator: form.userId,
      });
      return newPost;
   } catch (error) {
      throw new Error('Error uploading picture');
   }
};
