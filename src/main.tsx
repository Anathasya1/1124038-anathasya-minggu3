import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TestUi } from './TestUi.tsx'

// import './index.css'
// import App from './App.tsx'
// import { PostList } from './PostList.tsx'
// import { LearningHooks } from './LearningHooks.tsx'

import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { BrowserRouter, Route, Routes } from 'react-router'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Layout } from './components/Layout.tsx'
import { AppRoutes } from './config/AppRoutes.tsx'

const LearningHookPage = lazy(() => import('./LearningHooks'));
const PostPage = lazy(() => import('./pages/PostListPage.tsx'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage.tsx'));
const theme = createTheme();
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
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/learning-hooks" element={
  //       <LearningHookPage />
  //     }></Route>
  //     <Route path='/post' element={
  //       <PostPage />
  //     }></Route>
  //     <Route path='/post/:id' element = {
  //       <PostDetailPage />
  //     }></Route>
  //     {/* <Route path='/todo' element={
  //       <ToDo />
  //     }></Route> */}
  //   </Routes>
  // </BrowserRouter>

  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>

)
