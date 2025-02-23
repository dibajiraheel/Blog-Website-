import { React, useCallback, useEffect, useState } from 'react'
import { RTE, Input, Button, Select } from '../components/index'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import appwriteDatabase from '../appwrite/appwriteDatabase'
import appwriteBucket from '../appwrite/appwriteBucket'
import { AddFileInStore, AddPostInStore } from '../store/dataSlice'
import parse from 'html-react-parser'

const PostForm = () => {
  
  const {handleSubmit, getValues, setValue, control ,watch} = useForm()
  const options = ['active', 'not active']
  const watchedTitle = watch('title')
  const params = useParams().id
  const postsData = useSelector((state) => state.dataStore.allPosts.documents)
  const navigate = useNavigate()
  const [postData, setPostData] = useState(null)
  const userId = useSelector((state) => state.authStore.authStatus ? state.authStore.userData.userId : '')
  const [appwriteState, setAppwriteState] = useState(false)
  const dispatch = useDispatch()
  console.log('POSTS DATA = ', postsData);
  console.log('USER ID = ', userId);
  
  

  useEffect(() => {
    if (params) {
      console.log('PARAMS IN USE EFFECT = ', params);
      
      const post = postsData.filter((postData) => postData.$id == params)
      setPostData(post[0])

      setValue('title', post[0].title)
      setValue('content', parse(post[0].content))
      setValue('status', post[0].status)
    }
  }, [params])

  useEffect(useCallback(() => {
    if (watchedTitle) {
      const slug = watchedTitle.toLowerCase().trim().replace(' ', '-')
      setValue('slug', slug)
      console.log('slug ==', getValues('slug'));
    }
    else {
      setValue('slug', '')
    }
  }), [watchedTitle])


  const handlePost = (data) => {
    // console.log(data);
    const label = document.getElementById('button').lastElementChild.innerHTML
    // console.log(label)
    if (label == 'Post'){
      setAppwriteState(true)
      appwriteBucket.UploadFile(data.file)
      .then((response) => {
        if (response.$id){
          // console.log('FILE ID =', response.$id);
          // console.log(data.content);
          // console.log(typeof(data.content));
          // console.log(String(data.content));
          // console.log(typeof(String(data.content)));
          
          
          
          const currentPost = {'title': data.title, 'content': String(data.content), 'imageId': response.$id, 'status': data.status, 'userId': userId}
          appwriteDatabase.createPost(currentPost, dispatch)
          .then((response) => {
            if (response.$id){
              // console.log('DOCUMENT ID =', response.$id);
              // UpdateStore(dispatch, '/postform')
              dispatch(AddPostInStore(response))
              const imageURL = appwriteBucket.GetFilePreview(response.imageId)

              dispatch(AddFileInStore({'imageId': response.imageId, 'imageURL': imageURL}))
              setAppwriteState(false)
              const navigationURL = `/post/${response.$id}`
              navigate(navigationURL)
            }
          })
        }
      })
    }
    else if (label == 'Update'){
      setAppwriteState(true)
      console.log(postData);
      
      appwriteBucket.DeleteFile(postData.imageId)
      .then((response) => {
        if (response) {
          // console.log('DELETE FILE RESPONSE =', response);
          
          appwriteBucket.UploadFile(data.file)
          .then((response) => {
            if (response.$id) {
              // console.log('FILE ID =', response.$id);

              appwriteDatabase.updatePost({'postId': postData.$id, 'title': data.title, 'content': data.content, 'imageId': response.$id, 'status': data.status, 'userId': userId}, dispatch)
              .then((response) => {
                if (response.$id) {
                  // console.log('DOCUMENT ID =', response.$id);
                  // UpdateStore(dispatch, '/postform')
                  dispatch(AddPostInStore(response))
                  const imageURL = appwriteBucket.GetFilePreview(response.imageId)

                  dispatch(AddFileInStore({'imageId': response.imageId, 'imageURL': imageURL}))
                  setAppwriteState(false)
                  const navigationURL = `/post/${response.$id}`
                  navigate(navigationURL)
                }
              })
            }
          })     
        }
      })
    }
    
    

  }

  return (
    <div className='flex flex-row gap-10'>

        <form onSubmit={handleSubmit(handlePost)} className='flex flex-col md:flex-row md:gap-10' action="">

            <div className='md:px-10'>
              
              <div className='w-full my-5 py-5  border border-green-300 px-5 rounded-2xl hover:border-green-900'>
                <Controller name='title' defaultValue='' control={control} render={({field}) => (
                  <Input label='Title' value={field.value} onChange={field.onChange} />
                )} />
              </div>

              <div className='w-full my-5 py-5 border border-green-300 px-5 rounded-2xl hover:border-green-900'>
                <Controller name='content' defaultValue='' control={control} render={({field}) => (
                  <RTE value={field.value} onChange={field.onChange}/>
                )}/>
              </div>

            </div>

            <div className=''>

              <div className='w-full my-5 py-5 border border-green-300 px-5 rounded-2xl hover:border-green-900'>
                <Controller name='slug' defaultValue='' control={control} render={({field}) => (
                  <Input label='Slug' value={field.value} readOnly={true} />
                )} />              
              </div>  

              <div className='w-full my-5 py-5 border border-green-300 px-5 rounded-2xl hover:border-green-900'>
                <Controller name='status' defaultValue='active' control={control} render={({field}) => (
                  <Select label='Status' options={options} onChange={field.onChange} />
                )}/>              
              </div>  

              <div className='w-full my-5 py-5 border border-green-300 px-5 rounded-2xl hover:border-green-900'>
                <Controller name='file' control={control} render={({field}) => (
                  <Input type='file' onChange={(e) => field.onChange(e.target.files[0])} className='border-yellow-500 w-full px-24'/>
                )} />
              </div>  

              <div className='py-5'>
                <Button type={'submit'} bgColorLight={'bg-green-500'} bgColorMedium={'bg-green-600'} bgColorDark={'bg-green-700'} disable={appwriteState ? true : false } id='button' label={params == undefined ? (appwriteState ? 'Posting ...' : 'Post'): (appwriteState ? 'Updating...' : 'Update')} className='px-5 bg-green-700 hover:bg-green-900 self-center ml-36'/>
              </div>  

            </div>

        </form>


    </div>
  )
}

export default PostForm