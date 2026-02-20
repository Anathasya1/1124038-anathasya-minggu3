import { useCallback, useMemo, useState } from "react";
import type { AsyncDataState, Post } from "../types";
import { useAppSelector } from "./useAppSelector";
import { postAction } from "../redux/postSlice";
import { useAppDispatch } from "./useAppDispatch";

export function usePosts() {
    // const [posts, setPosts] = useState<Post[]>([]);
    // const [state, setState] = useState<AsyncDataState>('pending');
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.post.posts);
    const status = useAppSelector(state => state.post.status);

    const reload = useCallback(async () => {
        dispatch(postAction.setStatus('loading'))

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/post', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "content-type": "aplication/json"
                }
            })

            if (response.status !== 200) {
                alert("fail to reload post");
                return;
            }
            const data = await response.json();
            dispatch(postAction.setPosts(data.records || []))
            dispatch(postAction.setStatus('fulfilled'))

        } catch (error) {
            console.error("Fetch posts error:", error);
            dispatch(postAction.setStatus('error'))
            // setPosts([]);
        }
    }, [dispatch]);

    return useMemo(() => {
        return {
            posts,
            reload,
            state: status,
        }
    }, [posts, reload, status]);
}