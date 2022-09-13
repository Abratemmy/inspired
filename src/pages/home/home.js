import React, {useEffect} from 'react'
import "./home.css";
import moment from "moment";
import {BiChevronLeft, BiChevronRight, BiTime} from "react-icons/bi";
import {BsFillFilePersonFill} from "react-icons/bs";
import {AiFillLike} from "react-icons/ai"

import {useDispatch, useSelector} from "react-redux";
import { getPosts, likePost} from "../../actions/posts";
import { NavLink } from 'react-router-dom';


function Home() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.postReducer)
    console.log("logging post[0] alone",posts[0])

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    // const user = JSON.parse(localStorage.getItem('profile'))


    // const Likes = () => {
    //     if(posts.likes.length > 0) {
    //         return (
    //             posts.likes.find((like)=>like === (user.result._id))
    //         ? (
    //             <>{posts.likes.length > 2  ? ` You and ${posts.likes.length - 1} others` : `${posts.likes.length} like${posts.likes.length > 1 ? 's' : ''}`}</>
    //         ) : (
    //             <>{posts.likes.length} {posts.likes.length === 1 ? 'Like' : Likes}</>
    //         )
    //         )
    //     }

    //     return <> <p>Like</p></>
    // }

  return (
    <div className='home-container'>
        <div className='home-banner'>
            <h1>INSPIRED FOR MEN</h1>
        </div>

        <div className='home-content'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-9 col-md-9 col-sm-12'>
                        <div className='display-posts'>   
                            {!posts.length ? <div className="loading" style={{paddingBottom: "30px"}}></div> : (
                                <div className=''>

                                    {posts.sort((a, b) => moment(new Date(b.id))- moment(new Date(a.id))).map((post, i) => (
                                        <div className='row g-0 post-row'>
                                            <div className='col-lg-10 col-md-10 col-sm-12 left'>

                                            <NavLink to= {`/${post._id}`} className="blogpost-nav">
                                                <div className='post-container'>
                                                    <div className='topic'><BiChevronLeft className="arrow"/><BiChevronLeft className="arrow arrow-right"/>
                                                        <span>{post.topic}</span>
                                                        <BiChevronRight className="arrow"/><BiChevronRight className="arrow arrow-right"/>
                                                        
                                                    </div>

                                                    <div className='home-bottom'>
                                                        <span style={{paddingLeft:"3px"}}><BiTime className="icon" /> <span className='content'>{moment(post.createdAt).fromNow()}</span></span>
                                                        <span><BsFillFilePersonFill className='icon'/><span className='content'>{post.postername}</span></span>
                                                    </div>
                                                   
                                                </div>
                                            </NavLink>
                                            </div>

                                            <div className='col-lg-2 col-md-2 col-2m-12'>
                                                <div className='post-container-right'>
                                                    <div className='like'>
                                                        {/* {post.likes.length > 0 ? <>
                                                        (
                                                           {post.likes.find((like) => like === (user.result._id))
                                                                ? (
                                                                    <>{post.likes.length > 2  ? ` You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                                                                ) : (
                                                                    <>{post.likes.length} {post.likes.length === 1 ? 'Like' : Likes}</>
                                                                )
                                                            }
                                                        )
                                                        
                                                        </> : <><p>Like</p></>} */}
                                                    {/* <div> like</div> */}
                                                    
                                                    </div>
                                                    {/* <button disabled={!user.result}  onClick={() => dispatch(likePost(post._id))} className="like-btn">  <AiFillLike className="icon" /></button> */}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    
                                    ))}
                                </div>
                            )}

                            <h1>Hello</h1>
                        </div>
                    </div>

                    <div className='col-lg-3 col-md-3 col-sm-12'>
                        <div className=''>
                            Hello
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Home