import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../components'
import appwriteDatabase from '../appwrite/appwriteDatabase'
import parse from 'html-react-parser'
import { DeleteFileInStore, DeletePostInStore } from '../store/dataSlice'


const Post = () => {

  const postId = useParams().id
  console.log('post id found in params', postId);
  
  const postsData = useSelector((state) => state.dataStore.allPosts.documents)
  console.log('IN POST PAGE DATASTORE',useSelector((state) => state.dataStore))
  console.log('POST DATA FOUND IN POST PAGE', postsData)
  
  const filesData = useSelector((state) => state.dataStore.allFiles.filesURL)
  console.log('FILES DATA FOUND IN POST PAGE', filesData)
  const userId = useSelector((state) => state.authStore.userData.userId)
  console.log('user id found in this state', userId);
  
  const [postData, setPostData] = useState(null)
  const [fileURL, setFileURL] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log('Post Data found in post page', postsData);
  // console.log('Files Data found in post page', filesData);
  
  
  useEffect(() => {
    // console.log('USe Effect Called');
    
    const foundPost = postsData.filter((post) => postId == post.$id)[0]
    console.log('FOUND POST IN POST PAGE = ', foundPost);
    
    console.log('user id found in this post', foundPost ? foundPost.userId : '');
    
    setPostData(foundPost)
    // console.log('Found post', foundPost);
    
  }, [postId, postsData])

  useEffect(() => {
    if (postData){
    Object.keys(filesData).filter((fileId) => {
      // console.log(fileId);
      // console.log('FOUND POST IN FILES = ', postData);
      
      if (fileId == postData.imageId) {
        // console.log('URL FOUND = ', filesData[fileId]);
        
        setFileURL(filesData[fileId])
      }})
    
    console.log('found URL', fileURL);
  }},[postData, filesData])
  


  const handleEdit = () => {
    const link = `/postform/${postData.$id}`
    navigate(link)
  }

  const handleDelete = () => {
    appwriteDatabase.deletePost(postData.$id, dispatch)
    .then((response) => {
      if (response) {
        console.log('DELETE RESPONSE = ', response);
        dispatch(DeletePostInStore(postData))
        dispatch(DeleteFileInStore(postData))
        navigate('/home')
      }
    })
  }

  const handleHome = () => {
    navigate('/home')
  }

  return (
    <div>
    
        <div className={`flex flex-row justify-center gap-10 ${postData? (postData.userId == userId ? '' : 'hidden') : ''}`}>
          <Button bgColorLight={'bg-yellow-500'} bgColorMedium={'bg-yellow-600'} bgColorDark={'bg-yellow-700'} label='Edit' handleClick={handleEdit} className='bg-yellow-300 hover:bg-yellow-500 px-5 text-black' />
          <Button bgColorLight={'bg-blue-500'} bgColorMedium={'bg-blue-600'} bgColorDark={'bg-blue-700'} label='Home' handleClick={handleHome} className='bg-green-300 hover:bg-green-500 px-5 text-black' />
          <Button bgColorLight={'bg-red-500'} bgColorMedium={'bg-red-600'} bgColorDark={'bg-red-700'} label='Delete' handleClick={handleDelete} className='bg-red-300 hover:bg-red-500 px-5 text-black' />
        </div>
        
        <div className='flex flex-col items-center'>
          <img className='px-16 py-3 w-full h-72' src={fileURL} alt="" />
          <h1 className='italic font-bold underline text-3xl my-5'>{postData? postData.title : ''}</h1>
          <h2 className='px-16 italic text-justify'>{postData? parse(postData.content) : ''}</h2>
        </div>

    </div>
  )
}

export default Post