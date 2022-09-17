import React, {useState, useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import {commentPost } from "../../actions/posts";
import axios from 'axios';
import { useParams} from 'react-router-dom';
import "./commentsection.css"

function CommentSection ({post }) {
    console.log("comment post", post)
    
    const [comments, setComments ] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() =>{
        const fetchBlogs = async () =>{
            setLoading(true);
            const res = await axios.get(`https://inspiredformen.herokuapp.com/posts/${id}/commentPost`);
            setComments (res.data);
            setLoading(false);
            console.log("commentblog", res.data)
        }
        fetchBlogs()
    }, []);


    const [comment, setComment ] = useState({
        comment: "",
        postedBy: "",
    });
    const handleChange = (ev) => {
		setComment({
			...comment,
			[ev.target.name]: ev.target.value,
		});
	};

    // const dispatch = useDispatch();

    const handleClick = async(e) => {
        e.preventDefault()
        console.log("Frontend comment", comment);
        const newComments = await commentPost(comment, post._id);
        setComments(newComments)
        console.log("comment display", comments)
    }
  

  return (
    <div className='comments'>
        <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
                <div className=''>
                <h6>Comment section</h6>
                <hr />
                    {comments.map((c, i) => (
                        <div className='display-comments' key={i}>
                            
                            <div className='name'>{c.postedBy}</div>
                            <div className='comment'>{c.comment} </div>
                        
                        </div>
                    ))}
                </div>
            </div>

            <div className='col-lg-6 col-md-6 col-sm-12'>
                <form className='comment-form'>
                    <textarea placeholder='write a comment'className='comment-textarea' rows="4"name="comment"  required onChange={handleChange}></textarea>
                    <input type="text"className='comment-input' placeholder="name" name="postedBy"required onChange={handleChange}/>
                    <button disabled={!comment.comment && !comment.postedBy} onClick={handleClick} className="comment-btn">Comment</button>
                </form>
            </div>
        </div>
        

        

    </div>
  )
}

export default CommentSection