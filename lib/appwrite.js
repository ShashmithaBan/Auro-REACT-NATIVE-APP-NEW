import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const config = {
    endpoint : 'https://cloud.appwrite.io/v1',
    platform : "com.apk.auro",
    projectId : "6686e3c700280aa23d21",
    databaseId : "6686e43d003a6eccc5f5",
    userCollectionId : "6686e461002f7aac22e0",
    videoCollectionId : "6686e4fe002702b6ef64",
    storageId:"6686e591000f6469559d"
}



const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId)
    .setPlatform(config.platform) 
;

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

export const createUser = async(email , password , username) =>{
    try {
        const newAccount = await account.create(
          ID.unique(),
          email,
          password,
          username
        )
        if(!newAccount) throw Error;

        const avatarUrl = avatar.getInitials(username);

        await signin(email,password )

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
             ID.unique(),
             {
                accountId : newAccount.$id,
                email,
                username,
                avatar:avatarUrl 
             }
        )
        
        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export async function signin(email,password){
    try {
        const session = await account.createEmailPasswordSession(email,password)
        return session
    } catch (error) {
        throw new Error(error); 
    }
}

