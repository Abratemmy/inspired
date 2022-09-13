import * as api from "../api";

import { FETCH_ALL, UPDATE, FETCH_POST, COMMENT } from "../constants/actionTypes";



export const getPost = (id) => async(dispatch) => {
    try {
        const {data} = await api.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getPosts = () => async(dispatch) => {
    try {
        const {data} = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}


export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        alert("0hpps, Unable to like Post. check your internet")
        console.log(error)
    }
}


export const commentPost = (id) => async(dispatch) => {
    try {
        const { data } = await api.comment( id);
        dispatch({type: COMMENT, payload: data});
        return data.comments;

    } catch (error) {
        console.log(error)
    }
}