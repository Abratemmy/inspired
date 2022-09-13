import React, {useState, useRef} from 'react';
import {useDispatch} from "react-redux";
import {commentPost } from "../../actions/posts";

function WriteComment ({post} ) {
    console.log(post)

    const [comment, setComment ] = useState("");
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(commentPost(post._id))
    }
  return (
    <div>
        <form>
            <textarea placeholder='write a comment' rows="4"name="comment" required multiline onChange={(e) => setComment(e.target.value)}></textarea>
            <input type="text" placeholder="name" required onChange={(e) => setComment(e.target.value)}/>
            <button disabled={!comment} onClick={handleClick}>Post</button>
        </form>
    </div>
  )
}

export default WriteComment