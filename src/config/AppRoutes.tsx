import { lazy } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Routes, Route } from 'react-router';

const HomePage = lazy(() => import('../pages/HomePage'));
const PostListPage = lazy(() => import('../pages/PostListPage'));
const PostDetailPage = lazy(() => import('../pages/PostDetailPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));

export const AppRoutes = () => {
    const { isLoading, userInfo } = useAppSelector(state => state.auth);

    if(isLoading || !userInfo) {
        return <Routes>
            <Route path='/login' element={<LoginPage />}/>
        </Routes>
    }

    return <Routes>
        <Route path= '/' element={<HomePage />} />
        <Route path= '/post' element={<PostListPage />} />
        <Route path= '/post/:id' element={<PostDetailPage />} />
        {!userInfo && <Route path='/login' element={<LoginPage />} />}
    </Routes>
}