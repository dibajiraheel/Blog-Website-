import { createSlice } from "@reduxjs/toolkit"
import appwriteDatabase from '../appwrite/appwriteDatabase'
import appwriteBucket from '../appwrite/appwriteBucket'

const initialState = {
    'allPosts': {'total': null, 'documents': []},
    'allFiles': {'filesURL': {}}
}

const dataSlice = createSlice({
    'name': 'dataSlice',
    initialState,
    reducers: {
        'StoreAllPostsInStore': (state, action) => {
                state.allPosts.total = action.payload.total ? action.payload.total : action.payload.totalPosts
                state.allPosts.documents = action.payload.documents
                localStorage.setItem('allPosts', JSON.stringify(state.allPosts))
        },
        'StoreAllFilesInStore': (state, action) => {
                state.allFiles.filesURL = action.payload.filesURL
                localStorage.setItem('allFiles', JSON.stringify(state.allFiles))
        },
        'ClearAllData': (state, action) => {
                state.allPosts.documents = []
                state.allFiles.filesURL = {}
                localStorage.clear()
        },
        'AddPostInStore': (state, action) => {
            state.allPosts.total = (state.allPosts.total || 0) + 1
            state.allPosts.documents.push(action.payload)
            localStorage.setItem('allPosts', JSON.stringify(state.allPosts))
            console.log('LOg state in add post in store', state.allPosts);
            
        },
        'AddFileInStore': (state, action) => {
            state.allFiles.filesURL[action.payload.imageId] = action.payload.imageURL 
            localStorage.setItem('allFiles', JSON.stringify(state.allFiles))
            console.log('LOg state in add file in store', state.allFiles);
        },
        'DeletePostInStore': (state, action) => {
            state.allPosts.total = state.allPosts.total - 1
            const remainingDocuments = state.allPosts.documents.filter((document) => document.$id != action.payload.$id)
            state.allPosts.documents = remainingDocuments
            localStorage.setItem('allPosts', JSON.stringify(state.allPosts))
            console.log('POST DELETED FROM STATE AND LOCAL STORAGE IN STORE', state.allPosts.documents);
        },
        'DeleteFileInStore': (state, action) => {
            const remainingIds = Object.keys(state.allFiles.filesURL).filter((id) => id != action.payload.imageId)
            const remainingFiles = {}
            remainingIds.forEach((id) => remainingFiles[id] = state.allFiles.filesURL[id])
            state.allFiles.filesURL = remainingFiles
            localStorage.setItem('allFiles', JSON.stringify(state.allFiles))
            console.log('FILE DELETED FROM STATE AND LOCAL STORAGE IN STORE', state.allFiles);
        }
    }
})

export const {StoreAllPostsInStore, StoreAllFilesInStore, AddPostInStore, AddFileInStore, DeletePostInStore, DeleteFileInStore, ClearAllData} = dataSlice.actions
export default dataSlice.reducer