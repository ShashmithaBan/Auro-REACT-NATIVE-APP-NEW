import { Alert } from 'react-native';
import { Account, Avatars, Client, Databases, ID, Query , Storage} from 'react-native-appwrite';

export const config = {
    endpoint : 'https://cloud.appwrite.io/v1',
    platform : "com.apk.auro",
    projectId : "6686e3c700280aa23d21",
    databaseId : "6686e43d003a6eccc5f5",
    userCollectionId : "6686e461002f7aac22e0",
    videoCollectionId : "6686e4fe002702b6ef64",
    storageId:"6686e591000f6469559d"
}
const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
}=config



const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId)
    .setPlatform(config.platform) 
;

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

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

export const signin = async(email,password)=>{
    try {
        const session = await account.createEmailPasswordSession(email,password)
        return session
    } catch (error) {
        throw new Error(error); 
    }
}

export const getCurrentUser = async() =>{
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0]; 
    } catch (error) {
        console.log(error)
    }
}
export const getAllPosts = async() =>{
    try {
     const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId
     )
       return posts.documents 
    } catch (error) {
        console.log(error)
    }
}
export const getLatestPosts = async() =>{
    try {
     const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.orderDesc('createdAt' , Query.limit(7))]
     )
       return posts.documents 
    } catch (error) {
        console.log(error)
    }
}
export const searchPosts = async(query) =>{
    try {
     const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.search('title' , query)]
     )
       return posts.documents 
    } catch (error) {
        console.log(error)
    }
}
export const getUserPosts = async(userId) =>{
    try {
     const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.equal('creator' , userId)]
     )
       return posts.documents 
    } catch (error) {
        console.log(error)
    }
}

export const signOut = async()=>{
    try {
        const session = await account.deleteSession('current ');

        return session; 
    } catch (error) {
        throw new Error(error)
    }
}

export const getFilePreview = async(fileId , type)=>{

    let fileUrl;

    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(storageId,fileId )
        }else if(type === 'image'){
            fileUrl = storage.getFilePreview(storageId,fileId , 2000 ,2000 , 'top' ,100 )
        }else{
            throw new Error("Invalid file type")
        }
        if(!fileUrl)throw new Error;

        return fileUrl; 
    } catch (error) {
        throw new Error(error)
    }

}

export const uploadFile = async(file ,type) =>{
if(!file)return;

 
const assest = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.fileUrl
};

try {
    const uploadedFile = await storage.createFile(
        storageId,
        ID.unique(),
        assest
    )
    const fileUrl = await getFilePreview(uploadedFile.$id , type );
    return fileUrl;
} catch (error) {
    throw new Error(error)
}

}
export const createVideo = async(form)=>{
    try {

        const [thumbnailUrl , videoUrl] = await Promise.all([
            uploadFile(form.thumbnail,'image'),
            uploadFile(form.video , 'video')
        ])
        const newPost = await databases.createDocument(
            databaseId,videoCollectionId,ID.unique(),{
                title:form.title,
                thumbnail:thumbnailUrl,
                video:videoUrl,
                prompt:form.prompt,
                creator:form.userId
            }
        )
    } catch (error) {
        throw new Error(error)
    }
}