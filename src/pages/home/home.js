import React, { useState, useEffect } from "react";
import "./home.css";
import moment from "moment";
import { BiChevronLeft, BiChevronRight, BiTime } from "react-icons/bi";
import { BsFillFilePersonFill } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { NavLink, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Home() {
  const [active, setActive] = useState("");
 
  const handleActive = (event) => {
    setActive(event.target.id);
    
  }



  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer);
  const navigate = useNavigate();

  const [filter, setFilter] = useState([ ]);

  const filterTemplate = (cat) => {
    const updatedList = posts.filter((x) => x.category.toLowerCase() === cat);
    setFilter(updatedList)
  };


  // const filterTemplate = (cat) => {
  //   const updatedList = posts.filter ?"hello" : " no post";
  //   setFilter(updatedList)
  // };
  // console.log("filtertremplatr", posts);

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

  //  Make the useEffect here have a second dependency of the route url change(navigation) with 'posts'
  
  
  useEffect(() => {
    setFilter(posts);
  }, [posts, navigate]);

  return (
    <div className="home-container">
      <div className="home-banner">
        <div className="banner-text">
          <h1>INSPIRED FOR MEN</h1>
          <p>
            The mark of a great man is one who knows how to set aside the
            important things in order to accomplish the vital ones
          </p>
        </div>
      </div>

      <div className="home-content">
        <div className="container">
          <div className="display-posts">
            {/* don't use posts exac */}
            {!posts.length ? (
              <div className="loading" style={{ paddingBottom: "30px" }}></div>
            ) : (
              <>
                <div className="row">
                  <div className="col-lg-9 col-md-9 col-sm-12">
                    {/* .sort() only works on arrays, if it is not defined, it means the filter state hasn't gotten the value yet and turned into an array */}
                    {Array.isArray(filter) ?(
                      filter
                        .sort(
                          (a, b) =>
                            moment(new Date(b.id)) - moment(new Date(a.id))
                        )
                        .slice(pagesVisited, pagesVisited + imagePerPage)
                        .map((post, i) => (
                          <div className="post-row">
                            <NavLink
                              to={`/${post._id}`}
                              className="blogpost-nav" key={i}
                            >
                              <div className="post-container">
                                <div className="topic">
                                  <span>
                                  <BiChevronLeft className="homearrow" />
                                  <BiChevronLeft className="homearrow arrow-right" />
                                  </span>
                                  <span className="post-topic">{post.topic}</span>
                                  <span>
                                  <BiChevronRight className="homearrow" />
                                  <BiChevronRight className="homearrow arrow-right" />
                                  </span>
                                </div>

                                <div className="home-bottom">
                                  <span style={{ paddingLeft: "3px" }}>
                                    <BiTime className="icon" />{" "}
                                    <span className="content">
                                      {moment(post.createdAt).fromNow()}
                                    </span>
                                  </span>
                                  <span>
                                    <BsFillFilePersonFill className="icon" />
                                    <span className="content">
                                      {post.postername}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </NavLink>
                          </div>
                        ))
                    ):  (
                      // Loading state
                      <div>Loading ...</div>
                    ) }
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

                <ReactPaginate
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
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
  );
}

export default Home;
