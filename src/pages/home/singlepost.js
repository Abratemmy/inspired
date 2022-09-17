import React, { useEffect} from 'react'
import { NavLink, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment';
import {getPost} from "../../actions/posts";
import "./singlepost.css";
import CommentSection from './commentSection';
import {BiArrowBack} from "react-icons/bi"


function Singlepost() {
    const {post, posts, loading} =  useSelector((state) => state.postReducer);
    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])


   const Loading = () =>{
       return(
           <>
            <div className="loading"></div>
           </>
   )}

    if(!post) return null

  return (
    <div className='singlepost-container'>
        
        <div className='container'>
           
                <div className='row'>
                    <div className='col-lg-1 col-md-1 col-sm12'></div>
                    <div className='col-lg-10 col-md-10 col-sm-12'>
                        <NavLink to="/" className="back-nav">
                            <div className='arrow'><BiArrowBack className="back-arrow" /><span>Back to feeds</span></div>
                        </NavLink>
                        
                        <div className='singlepost-content'>
                            <div className='singlepost-topic'>{post.topic}</div>
                            <p>Category: <span>{post.category}</span></p>
                            <hr />

                            {post.image !== "" ?<img src={post.image} alt={post.topic} width="100%" /> : null}
                            <div className='singlepost-message'>
                                <p dangerouslySetInnerHTML={{__html:post.message}} />
                            </div>

                            {post.video !== "" ? <div>Check the video url: <a href={post.video} target="_blank"  rel="noopener noreferrer">{post.video}</a> </div> : null}

                            <div className='createdby'>
                                <div>Created by: <span>{post.postername}</span></div>
                                <div className='date'>{moment(post.createdAt).fromNow()}</div>
                            </div>


                            <hr />

                            <div className='comment-section'>
                                <h3><CommentSection post={post} /></h3>
                            </div>
                        </div>

                        <NavLink to="/" className="back-nav">
                            <div className='arrow'><BiArrowBack className="back-arrow" /><span> Back to feeds</span></div>
                        </NavLink>
                    </div>
                    <div className='col-lg-1 col-md-1 col-sm12'></div>

                </div>
            
        </div>
    </div>
  )
}

export default Singlepost