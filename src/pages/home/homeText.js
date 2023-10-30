import React, { useState, useEffect } from "react";
import "./home.css";
import moment from "moment";
import { BiChevronRight } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import logo from "../../image/winner2.jpg"
import Navbar from "../Navbar/Navbar.js"
// import Helmet from 'react-helmet'

function Home() {

    const dispatch = useDispatch();

    const posts = useSelector((state) => state.postReducer);
    const navigate = useNavigate();

    const [filter, setFilter] = useState([]);

    const filterTemplate = (cat) => {
        const updatedList = posts.filter((x) => x.category.toLowerCase() === cat);
        setFilter(updatedList)
    };


    const [pageNumber, setPageNumber] = useState(0);
    const imagePerPage = 10;
    const pagesVisited = pageNumber * imagePerPage;

    const pageCount = Math.ceil(filter.length / imagePerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
        window.scrollTo(0, 120);
    };

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    // let name = topic
    // name = name.replace(/\s+/g, '-');
    // const url = `/lookup/${name}`


    //  Make the useEffect here have a second dependency of the route url change(navigation) with 'posts'


    useEffect(() => {
        setFilter(posts);
    }, [posts, navigate]);



    return (
        <>

            <div className="home-container">
                {/* don't use posts exac */}
                {!posts.length ? (
                    <div className="loading" style={{ paddingBottom: "30px" }}></div>
                ) : (

                    <div>
                        <Navbar />
                        <div className="home-banner">
                            <div className="banner-text">
                                <h1><span>I</span><span>N</span><span>S</span><span>I</span><span>R</span><span>E</span><span>D</span> <span>F</span>
                                    <span>O</span><span>R</span> <span>M</span><span>E</span><span>N</span></h1>
                                <p>
                                    For Men: Impacting life, fulfilling destinies
                                </p>
                            </div>
                        </div>

                        <div className="home-content">
                            <div className="container">
                                <div className="display-posts">
                                    <div className="row">
                                        <div className="col-lg-9 col-md-9 col-sm-12">
                                            {/* .sort() only works on arrays, if it is not defined, it means the filter state hasn't gotten the value yet and turned into an array */}
                                            {Array.isArray(filter) ? (
                                                filter
                                                    .sort(
                                                        (a, b) =>
                                                            moment(new Date(b.id)) - moment(new Date(a.id))
                                                    )
                                                    .slice(pagesVisited, pagesVisited + imagePerPage)
                                                    .map((post, i) => (
                                                        <>
                                                            <div className="post-row" key={i}>
                                                                <div className="top">
                                                                    <div className="posterby">{post.postername}</div>
                                                                    <div className="date">{moment(post.createdAt).format("DD")}/{moment(post.createdAt).format("MM")}/{moment(post.createdAt).format("YYYY")}</div>
                                                                </div>

                                                                <Link
                                                                    to={`/${post.topic.split(" ").join("-")}`}
                                                                    className="blogpost-nav"
                                                                >
                                                                    <div className="post-container">
                                                                        <img src={logo} alt="logo" />

                                                                        <div className="other-content">
                                                                            <div className="post-topic">{post.topic} - <span>Inspired For Men</span></div>
                                                                            <div className="category"> Topics <span><BiChevronRight /></span> Forums <BiChevronRight /> General Discussions <span><BiChevronRight /></span> {post.category}</div>
                                                                            <a href="https://inspiredformen.com" target="_blank" rel="noopener noreferrer">inspiredformen.com</a>
                                                                        </div>

                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    ))
                                            ) : (
                                                // Loading state
                                                <div>Loading ...</div>
                                            )}
                                        </div>

                                        <div className="col-lg-3 col-md-3 col-sm-12">
                                            <div className="home-category " id="myDIV">
                                                <div className="text">Search post by Category ({posts.length})</div>
                                                <button
                                                    className="home-btn activeclass"
                                                    onClick={() => setFilter(posts)}
                                                >
                                                    All Category <span></span>
                                                </button>
                                                <button
                                                    className="home-btn"
                                                    onClick={() => filterTemplate("health")}
                                                >
                                                    Men's Wellness <span></span>
                                                </button>
                                                <button
                                                    className="home-btn"
                                                    onClick={() => filterTemplate("life")}
                                                >
                                                    Life <span></span>{" "}
                                                </button>
                                                <button
                                                    className="home-btn"
                                                    onClick={() => filterTemplate("relationship")}
                                                >
                                                    Relationship <span></span>{" "}
                                                </button>
                                                <button
                                                    className="home-btn"
                                                    onClick={() => filterTemplate("finance")}
                                                >
                                                    Finance <span></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        imagePerPage <= 10 ? null : (
                                            <ReactPaginate
                                                previousLabel={"Prev"}
                                                nextLabel={"Next"}
                                                breakLabel={'...'}
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                marginPagesDisplayed={3}
                                                pageRangeDisplayed={6}
                                                containerClassName={"paginationBttns"}
                                                previousLinkClassName={"previousBttn"}
                                                nextLinkClassName={"nextBttn"}
                                                activeClassName={"paginationActive"}
                                            />
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;