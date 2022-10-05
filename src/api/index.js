import axios from "axios";
const API = axios.create({ baseURL: 'https://inspiredformen-server.onrender.com'});

export const fetchPost = (topic) => API.get(`/posts/${topic}`);

export const fetchPosts = () =>API.get('/posts');

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const comment= (value, id) => API.post(`/posts/${id}/commentPost`, {value});

export const fetchcomment= (id) => API.get(`/posts/${id}/commentPost`);


export  const signIn = (values) => API.post('/user/signin', values)
export  const signUp = (values) => API.post('/user/signup', values)



// API.interceptors.request.use((req) => {
//     if(localStorage.getItem('profile')){
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }

//     return req;
// })




