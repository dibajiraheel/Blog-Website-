import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import appwriteBucket from '../appwrite/appwriteBucket'





const PostCard = () => {

    const postsData = useSelector((state) => state.dataStore.allPosts.documents)
    const filesURL = useSelector((state) => state.dataStore.allFiles.filesURL)

    console.log('Post Data found in home page from store ', postsData);
    console.log('Files Data found in home page from store ', filesURL);
    
    

    return (
        <div className='lg:flex lg:flex-row lg:gap-5 lg:justify-center lg:items-center lg:flex-wrap flex flex-col justify-center items-center '>

            {postsData.map((postData, index) => (
                <Link to={`/post/${postData.$id}`} key={index} className='w-full lg:hover:scale-105 lg:hover:border-indigo-700 border-4 border-transparent my-5 rounded-4xl overflow-hidden lg:w-1/5 px-3 lg:px-0'>
                    <article className="hover:border-indigo-700 relative overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
                    <img alt="" src={filesURL[postData.imageId]} className="absolute inset-0 h-full w-full object-cover"/>
                    <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
                        <div className="p-4 sm:p-6">
                            <time datetime="2022-10-10" className="block text-xs text-white/90"> 10th Oct 2022 </time>
                            <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">{postData.title}</p>
                        </div>
                    </div>
                    </article>                
                </Link>






                // <Link to={`/post/${postData.$id}`} key={index} className='my-5 border border-purple-500 rounded-2xl bg-black w-1/5 h-72 overflow-hidden hover:bg-gray-900'>
                //     <div className='px-3 py-3 flex flex-col'>
                //         <img className='w-full h-48' src={filesURL[postData.imageId]} alt="Image" />
                //         <h1 className='my-5 text-lg font-bold italic text-center'>{postData.title}</h1>
                //     </div>
                // </Link>
            ))}
            
        </div>
    )
}

export default PostCard