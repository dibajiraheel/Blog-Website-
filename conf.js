const conf = {
    'projectId': String(import.meta.env.VITE_PROJECT_ID),
    'databaseId': String(import.meta.env.VITE_DATABASE_ID),
    'collectionId': String(import.meta.env.VITE_COLLECTION_ID),
    'bucketId': String(import.meta.env.VITE_BUCKET_ID),
    'appwriteUrl': String(import.meta.env.VITE_APPWRITE_URL),
    'tinyMceApiKey': String(import.meta.env.VITE_TINY_MCE_API_KEY)
}

export default conf