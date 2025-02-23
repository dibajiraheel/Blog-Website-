import { Client, Databases, ID } from "appwrite";
import conf from "../../conf";
import UpdateStore from "../store/updateStore";



class DatabaseClass{
    client
    database

    constructor(){
        this.client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.projectId)
        this.database = new Databases(this.client)
    }

    async createPost({title, content, imageId, status, userId}, dispatch){
        try {
            const postCreated = await this.database.createDocument(conf.databaseId, conf.collectionId, ID.unique(), {title, content, imageId, status, userId})
            if (postCreated) {
                // UpdateStore(dispatch)
                return postCreated
            }else{
                console.log('Some Error Occured While Creating Post')
                return false
            }
        } catch (error) {
            console.log('Create Post Error :: Appwrite Error :: ', error);
        }
    }

    async updatePost({postId, title, content, imageId, status, userId}, dispatch){
        try {
            const postUpdated = await this.database.updateDocument(conf.databaseId, conf.collectionId, postId, {title, content, imageId, status, userId})
            if (postUpdated) {
                UpdateStore(dispatch)
                return postUpdated
            }else{
                console.log('Some Error Occured While Updating Post')
                return false
            }
        } catch (error) {
            console.log('Update Error :: Appwrite Error :: ', error);
        }
    }

    async deletePost(postId, dispatch){
        try {
            const deletedDocument = await this.database.deleteDocument(conf.databaseId, conf.collectionId, postId)
            if (deletedDocument) {
                // UpdateStore(dispatch)
                return deletedDocument
            }else{
                console.log('Some Error Occured While Deleting Post')
                return false
            }
        } catch (error) {
            console.log('Delete Error :: Appwrite Error :: ', error);
        }
    }

    async GetPost(postId){
        try {
            const document = await this.database.getDocument(conf.databaseId, conf.projectId, postId)
            if (document) return document
            else{
                console.log('Some Error Occured While Getting Post')
                return false
            }
        } catch (error) {
            console.log('Get Post Error :: Appwrite Error :: ', error);
        }
    }

    async GetPosts(){
        try {
            const documents = await this.database.listDocuments(conf.databaseId, conf.collectionId)
            if (documents) {
                console.log('Documents found appwrite file', documents);
                return documents
            }
            else{
                console.log('Some Error Occured While Getting Posts')
                return false
            }
        } catch (error) {
            console.log('Get Posts Error :: Appwrite Error :: ', error);
        }
    }
}

const appwriteDatabase = new DatabaseClass()

export default appwriteDatabase