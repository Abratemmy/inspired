import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { getPost } from "../../actions/posts";
import "./singlepost.css";
import CommentSection from './commentSection';
import Navbar from '../Navbar/Navbar';
// import { Helmet } from 'react-helmet';


function Singlepost() {
    const { post } = useSelector((state) => state.postReducer);
    console.log("post", post)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { topic } = useParams()

    useEffect(() => {
        dispatch(getPost(topic))
    }, [topic, navigate])

    // useEffect(() => {
    //     window.location.reload()
    // })
    if (!post) return <div className="loading" style={{ paddingBottom: "30px" }}></div>

    // const showDate = new Date();
    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    // var displaytodaysdate = (days[showDate.getDay()]) + ', ' + showDate.getDate() + ' ' + (months[showDate.getMonth()]) + ' ' + showDate.getFullYear();
    // const toString =showDate.toDateString()

    return (
        <div className=''>

            {/* <Helmet
            title={post && post.topic ? post.topic : null }
            meta = {[
                {"name": "description", "content": post ? post.topic : null}
            ]}
        /> */}

            {/* <Helmet>
            <meta charSet="UTF-8" />
            <title>{post.topic}</title>
            <meta property="og:title" content={post.topic} />
            <meta name="description" content={post.topic} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            
            <meta id="meta-description" name="description"property='og:description' content={post.topic}/>
           
        </Helmet> */}
            <Navbar />
            <div className='singlepost-container'>
                <div className='container'>

                    <div className='row'>
                        <div className='col-lg-1 col-md-1 col-sm12'></div>
                        <div className='col-lg-10 col-md-10 col-sm-12'>
                            <div className='singlepost-content'>
                                <NavLink to="/" className="single-nav">
                                    <div className='single-header'>
                                        Inspired for men
                                    </div>
                                    <div className='single-header'>
                                        Inspired for men
                                    </div>
                                    {/* <FacebookShareButton url={`https://www.inspiredformen.com/${post.topic}`} quote={post.topic} >
                                        <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
                                    </FacebookShareButton>

                                    <WhatsappShareButton title={post.topic}
                                        url={`https://www.inspiredformen.com/${post.topic}`}
                                    >
                                        <WhatsappIcon logoFillColor="white" round={true}></WhatsappIcon>
                                    </WhatsappShareButton> */}
                                    {/* <div className='date'><span>Date:</span> {displaytodaysdate}</div> */}
                                    {/* <div>{toString}</div> */}

                                </NavLink>

                            </div>

                            <div className='title-middle'>
                                <div className='topic'>{post.topic}</div>
                                <div className='sub-link'><Link to="/" className='Link'>Inspired For Men Forum</Link> <span> / </span><span><Link to="/" className='Link'>General</Link></span>
                                    <span> / </span> <span> <Link to="/" className='Link'>{post.category}</Link> </span> <span> / </span> <span><Link to={`/${(post.topic)}`} className='Link'>{post.topic}</Link></span>
                                    <span className='comment'>{(post.usercomment).length === 0 || (post.usercomment).length === 1 ? <div>({(post.usercomment).length} comment)</div> :
                                        <div>({(post.usercomment).length} comments)</div>}   </span>
                                </div>
                            </div>

                            <div className='singlepost-content'>
                                <div className='singlepost-top'>
                                    <span>{post.topic}</span> <span className='by'>by</span> <span className='poster'>{post.postername}</span>
                                    <span className='colon'> :</span>
                                    <span className='time'> {moment(post.createdAt).format("DD.MMa")}</span>
                                    <span className='on'> on</span> <span className='time'>{moment(post.createdAt).format("MMM.D")}</span>
                                </div>
                                {/* <div className='singlepost-topic'>{post.topic}</div> */}
                                {/* <p>Category: <span>{post.category}</span></p> */}


                                <div className='singlepost-other'>
                                    {post.image !== "" ? <img src={post.image} alt={post.topic} width="100%" /> : null}
                                    <div className='singlepost-message'>
                                        <p dangerouslySetInnerHTML={{ __html: post.message }} />
                                    </div>

                                    {post.video !== "" ? <div>Check the video url: <a href={post.video} target="_blank" rel="noopener noreferrer">{post.video}</a> </div> : null}

                                    <hr />

                                    <div className='comment-section'>
                                        <h3><CommentSection post={post} /></h3>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-1 col-md-1 col-sm12'></div>

                    </div>

                </div>
            </div>

        </div >
    )
}

export default Singlepost