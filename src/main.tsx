import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TestUi } from './TestUi.tsx'

// import './index.css'
// import App from './App.tsx'
// import { PostList } from './PostList.tsx'
// import { LearningHooks } from './LearningHooks.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'

const LearningHookPage = lazy(() => import('./LearningHooks')); 
const PostPage = lazy(() => import('./PostList'));
const PostDetailPage = lazy(() => import('./PostDetail'));
//const ToDo= lazy(() => import('./ToDo'));
// kalau pake lazy harus pake export default
// export function a(){} -> import {a} from "/a"
//export default function a(){} -> import a from "/a" (bedanya ada {a} sama a)

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <PostList/>
  //   {/* <LearningHooks/> */}
  // </StrictMode>

  //jadi ini tuh supaya bisa pindah urlnya gitu, soalnya kalau kaya yang diatas itu tuh cuman mengubah isi main.tsx kalau ini beda post ya post
  <BrowserRouter>
    <Routes>
      <Route path="/learning-hooks" element={
        <LearningHookPage />
      }></Route>
      <Route path='/post' element={
        <PostPage />
      }></Route>
      <Route path='/post/:id' element = {
        <PostDetailPage />
      }></Route>
      {/* <Route path='/todo' element={
        <ToDo />
      }></Route> */}
    </Routes>
  </BrowserRouter>
  
)
