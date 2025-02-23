import { Client, Storage, ID } from "appwrite";
import conf from "../../conf";

class bucketClass{
    client
    bucket

    constructor(){
        this.client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.projectId)
        this.bucket = new Storage(this.client)
    }

    async UploadFile(file){
        try {
            const uploadedFile = this.bucket.createFile(conf.bucketId, ID.unique(), file)
            if (uploadedFile) return uploadedFile
            else{
                console.log('Some Error Occured While Uploading FIle')
                return false
            }
        } catch (error) {
            console.log('Upload File Error :: Appwrite Error :: ', error);
        }
    }

    async DeleteFile(fileId){
        try {
            const deletedFile = await this.bucket.deleteFile(conf.bucketId, fileId)
            if (deletedFile) return deletedFile
            else{
                console.log('Some Error Occured While Deleting File');
            }
        } catch (error) {
            console.log('Delete File Error :: Appwrite Error :: ', error);
        }
    }

    async GetFile(fileId){
        try {
            const GetFile = await this.bucket.getFile(conf.bucketId, fileId)
            if (GetFile) return GetFile
            else{
                console.log('Some Error Occured While Getting File');
            }
        } catch (error) {
            console.log('Get File Error :: Appwrite Error :: ', error);
        }
    }


    GetFilePreview(fileId){
        try {
            const GetFilePreview = this.bucket.getFilePreview(conf.bucketId, fileId)
            if (GetFilePreview) return GetFilePreview
            else{
                console.log('Some Error Occured While Getting File Preview');
            }
        } catch (error) {
            console.log('Get File Preview Error :: Appwrite Error :: ', error);
        }
    }

    async GetFiles(){
        try {
            const GetFiles = await this.bucket.listFiles(conf.bucketId)
            if (GetFiles) {
                console.log('GET FILES IN APPWRITE = ', GetFiles);
                
                return GetFiles
            }else{
                console.log('Some Error Occured While Getting Files');
            }
        } catch (error) {
            console.log('Get Files Error :: Appwrite Error :: ', error);
        }
    }
}

const appwriteBucket = new bucketClass()

export default appwriteBucket