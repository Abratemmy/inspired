import React, {useState, useRef} from 'react';
import {useDispatch} from "react-redux";
import {commentPost } from "../../actions/posts"

function CommentSection ({post }) {
    console.log(post)

    const [comments, setComments ] = useState(post.comments);
    const [comment, setComment ] = useState("");

    const dispatch = useDispatch();

    const handleClick = async() => {
        const newComments = await dispatch(commentPost(post._id));
        setComments = (newComments);
        setComment(" ")
    }
    const handleChange = (ev) => {
		setComment({
			...comment,
			[ev.target.name]: ev.target.value,
		});
	};

  return (
    <div className='comments'>
        <div className=''>
            {/* {comments.map((c, i) => (
                <div className='' key={i}>
                    {c}
                </div>
            ))} */}
        </div>

        <form>
            <textarea placeholder='write a comment' rows="4"name="comment" required onChange={handleChange}></textarea>
            <input type="text" placeholder="name" required onChange={handleChange}/>
            <button disabled={!comment} onClick={handleClick}>Comment</button>
        </form>

    </div>
  )
}

export default CommentSection