import React, {useState, useEffect} from 'react'
import "./home.css";
import moment from "moment";
import {BiChevronLeft, BiChevronRight, BiTime} from "react-icons/bi";
import {BsFillFilePersonFill} from "react-icons/bs";

import {useDispatch, useSelector} from "react-redux";
import { getPosts} from "../../actions/posts";
import { NavLink } from 'react-router-dom';
import ReactPaginate from "react-paginate"


function Home() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.postReducer)
    const [filter, setFilter] = useState(posts);
    console.log("filter", filter)

   
    const filterTemplate = (cat) =>{
        const updatedList = posts.filter((x) =>x.category.toLowerCase() === cat);   
        setFilter(updatedList);
    }
    console.log('filtertremplatr',posts)

    const [pageNumber, setPageNumber] = useState(0)
    const imagePerPage = 10
    const pagesVisited = pageNumber * imagePerPage

    const pageCount = Math.ceil(filter.length / imagePerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
        window.scrollTo(0, 120)
    }

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

  return (
    <div className='home-container'>
        <div className='home-banner'>
        <div className='banner-text'>
            <h1>INSPIRED FOR MEN</h1>
            <p>The mark of a great man is one who knows how to set aside the important things in order to accomplish the vital ones</p>
        
            </div>
        </div>

        <div className='home-content'>
            <div className='container'>
                <div className='display-posts'>   
                    {!posts.length ? <div className="loading" style={{paddingBottom: "30px"}}></div> : (
                        <>
                            <div className='row'>
                                <div className='col-lg-9 col-md-9 col-sm-12'> 
                                    {filter.sort((a, b) => moment(new Date(b.id))- moment(new Date(a.id))).slice(pagesVisited, pagesVisited + imagePerPage).map((post, i) => (
                                        <div className='post-row'>
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
                                        
                                    ))}
                                </div>

                                
                                <div className='col-lg-3 col-md-3 col-sm-12'>
                                    <div className='home-category ' id="myDIV">
                                        <div className='text'>Search post by Category</div>
                                        <button className='home-btn activeclass' onClick={()=>setFilter(posts)}>All Category <span>{posts.length}</span></button>
                                        <button className='home-btn' onClick={()=>filterTemplate("health")}>Men's Wellness <span>{posts.length}</span></button>
                                        <button className='home-btn' onClick={()=>filterTemplate("life")}>Life  <span>{posts.length}</span> </button>
                                        <button className='home-btn' onClick={()=>filterTemplate("relationship")}>Relationship <span>{posts.length}</span> </button>
                                        <button className='home-btn' onClick={()=>filterTemplate("finance")}>Finance <span>{posts.length}</span></button>
                                    </div>
                                </div>
                            </div>

                            <ReactPaginate
                                    // previousLabel={"Prev"}
                                    // nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange= {changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    activeClassName={"paginationActive"}
                                 />
                        </>
                    )}
                </div>
                    </div>

                </div>
            </div>
       
  )
}

export default Home