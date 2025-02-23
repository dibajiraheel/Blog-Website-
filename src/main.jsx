import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home, Signup, Login, Post, PostForm, AuthenticationRequired, AuthenticationNotReuqired, MainPage } from "./pages/pages.js"

// const router = createBrowserRouter(createRoutesFromElements(
//   <>
//     <Route path='/' element={<MainPage/>}/>
    
//     <Route path='/' element={<App/>}>
//       <Route path='/home' element={<Home/>}/>
//       <Route path='/login' element={<Login/>}/>
//       <Route path='/signup' element={<Signup/>}/>
//       <Route path='/postform' element={<PostForm/>}/>
//       <Route path='/postform/:id' element={<PostForm/>}/>
//       <Route path='/post/:id' element={<Post/>}/>
//     </Route>
//   </>
// ))


const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<AuthenticationNotReuqired children={<MainPage/>} authenticationRequired={false} />}/>

    <Route path='/' element={<App/>}>
      <Route path='/home' element={<AuthenticationRequired children={<Home/>} authenticationRequired={true} />}/>
      <Route path='/login' element={<AuthenticationNotReuqired children={<Login/>} authenticationRequired={false} />}/>
      <Route path='/signup' element={<AuthenticationNotReuqired children={<Signup/>} authenticationRequired={false} />}/>
      <Route path='/postform' element={<AuthenticationRequired children={<PostForm/>} authenticationRequired={true} />}/>
      <Route path='/postform/:id' element={<AuthenticationRequired children={<PostForm/>} authenticationRequired={true} />}/>
      <Route path='/post/:id' element={<AuthenticationRequired children={<Post/>} authenticationRequired={true} />}/>
    </Route>
  </>
)
)

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
    </Provider>
  // </StrictMode>,
)
