import React, {useState, useRef} from 'react';
import {useDispatch} from "react-redux";
import {commentPost } from "../../actions/posts";
import "./commentsection.css"

function CommentSection ({post }) {
    console.log("comment post", post)

    const [comments, setComments ] = useState([1, 2, 3, 4]);

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

    const dispatch = useDispatch();

    const handleClick = async() => {
        const finalComment = `${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id));
        // setComments = (newComments);
        // setComment(" ")
    }
   

  return (
    <div className='comments'>
        <div className=''>
            {comments.map((c, i) => (
                <div className='' key={i}>
                   Comment  {c}
                </div>
            ))}
        </div>

        <form className='comment-form'>
            <textarea placeholder='write a comment'className='comment-textarea' rows="4"name="comment" value={comment.comment} required onChange={handleChange}></textarea>
            <input type="text"className='comment-input' placeholder="name" name="postedBy" value={comment.postedBy}onChange={handleChange}/>
            <button disabled={!comment.comment && !comment.postedBy} onClick={handleClick}>Comment</button>
        </form>

    </div>
  )
}

export default CommentSection