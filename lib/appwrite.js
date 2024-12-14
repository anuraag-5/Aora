import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite"

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platfrom: "com.anurag.aora",
    projectId: "67586b220031d656a1ab",
    databaseId: "67587027003a13d6fd96",
    userCollectionId: "675870b60027111287af",
    videosCollectionId: "675870dc0006e11585c7",
    storageId: "675874140038b99c20c0"
}

const client = new Client();

client
   .setEndpoint(config.endpoint)
   .setProject(config.projectId)
   .setPlatform(config.platfrom)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createAccount = async ( email, password, username ) => {
    try {
       const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
       )

       if(!newAccount) throw Error

       const avatarUrl = avatars.getInitials(username)
       await signIn( email, password );

       const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
       )

       return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async ( email, password ) => {
    try {
        const session = await account.createEmailPasswordSession( email, password );
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
    
        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )
    
        if(!currentUser) throw Error
    
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId
        );

        return posts.documents;
    } catch (error) {
        throw Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videosCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        );

        return posts.documents;
    } catch (error) {
        throw Error(error)
    }
}