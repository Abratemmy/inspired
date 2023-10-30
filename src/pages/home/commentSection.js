import React, { useState } from 'react';
import { commentPost } from "../../actions/posts";
import "./commentsection.css";
import moment from "moment";


function CommentSection({ post }) {
    // console.log("comment post", post)

    const [comments, setComments] = useState(post.usercomment);
    const [comment, setComment] = useState({
        comment: "",
        postedBy: "",
    });
    const [loading, setLoading] = useState(false)
    const handleChange = (ev) => {
        setComment({
            ...comment,
            [ev.target.name]: ev.target.value,
        });
    };
    const [errors, setErrors] = useState({});
    const handleError = (targets) => {
        let errorsValue = {};
        if (!targets.comment) errorsValue.comment = "Type your comment";
        if (!targets.postedBy) errorsValue.postedBy = "Name is required";

        if (Object.keys(errorsValue).length > 0) setErrors({ ...errorsValue });
        else setErrors({});

        return Object.keys(errorsValue).length;

    };
    // const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault()
        let v = handleError(comment);
        // check if there is any eror available and handle here 
        if (v > 0) console.log("error");
        //submit form here if no error availble
        else {
            setLoading(true)
            console.log("Frontend comment", comment);
            const newComments = await commentPost(comment, post._id);
            setComments(newComments);
            clear()
            setLoading(false)
            console.log("comment display", comments)
        }
    }
    const clear = () => {
        // setComments(" ");
        setComment({
            comment: "",
            postedBy: "",
        })
    }

    return (
        <div className='comments'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12' style={{ padding: '20px' }}>
                    <h6>Leave a comment</h6>
                    <form className='comment-form'>
                        <textarea placeholder='write a comment' className='comment-textarea' rows="4" name="comment" value={comment.comment} required onChange={handleChange}></textarea>
                        {errors ? <p> {errors.comment}</p> : ""}
                        <input type="text" className='comment-input' placeholder="name" name="postedBy" value={comment.postedBy} required onChange={handleChange} style={{ textTransform: "capitalize" }} />
                        {errors ? <p> {errors.postedBy}</p> : ""}
                        {loading ?
                            <button type="submit" className='comment-btn' style={{ pointerEvents: 'none' }}>
                                <div class="spinner-grow spinner-grow-sm" role="status"></div>
                                <span>Commenting ...</span>
                            </button>
                            :
                            <button type="submit" onClick={handleClick} className='comment-btn'>Comment</button>
                        }

                    </form>
                </div>

                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <hr />
                    <div className=''>
                        <h6 className="CommentHeader">Comment section</h6>

                        {comments
                            .sort(
                                (a, b) =>
                                    moment(new Date(b.createdAt)) - moment(new Date(a.createdAt))
                            )
                            .map((c, i) => (
                                <div className='display-comments' key={i}>
                                    <div className='name-date'>
                                        <div className='name'>{c.postedBy}</div>
                                        <div className='date'>{moment(c.createdAt).format("MMM D")}</div>
                                    </div>
                                    <div className='comment'>{c.comment} </div>

                                </div>
                            ))}
                    </div>
                </div>

            </div>




        </div>
    )
}

export default CommentSection