import appwriteDatabase from "../appwrite/appwriteDatabase";
import appwriteBucket from "../appwrite/appwriteBucket";
import { StoreAllFilesInStore, StoreAllPostsInStore } from '../store/dataSlice'


const UpdateStore = (dispatch, caller) => {
    console.log('Update Store Called by ', caller);
    
    appwriteDatabase.GetPosts()
        .then((response) => {
            dispatch(StoreAllPostsInStore(response))
            const filesURL = {}
            response.documents.forEach((document) => {
                filesURL[document.imageId] = appwriteBucket.GetFilePreview(document.imageId)
            })
            dispatch(StoreAllFilesInStore({'filesURL': filesURL}))
    })
}

export default UpdateStore