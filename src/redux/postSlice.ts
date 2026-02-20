import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AsyncDataState, Post } from "../types";

interface PostState{
    posts: Post[];
    status: AsyncDataState;
}

const initialState: PostState = {
    posts: [],
    status: 'pending'
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },

        setStatus: (state, action: PayloadAction<AsyncDataState>) => {
            state.status = action.payload
        }
    }
});

export const postAction = postSlice.actions;
export default postSlice.reducer;