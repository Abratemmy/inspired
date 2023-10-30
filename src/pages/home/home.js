import React, { useState, useEffect } from "react";
import "./home.css";
import moment from "moment";
import { BiChevronRight } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import logo from "../../image/winner2.jpg"
import bannerlogo from "../../image/logo1.jpeg"
import { BiSearch } from 'react-icons/bi'
// import Helmet from 'react-helmet'

function Home() {
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  var displaytodaysdate = (days[date.getDay()]) + ', ' + date.getDate() + ' ' + (months[date.getMonth()]) + ', ' + date.getFullYear();

  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState('');

  const checkDuplicateCategory = (inputarray) => {
    const duplicates = inputarray.filter((item, index) => inputarray.indexOf(item) === index);
    return Array.from(new Set(duplicates))
  }

  const [active, setActive] = useState('all');
  const [activeall, setActiveall] = useState(true);

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
            <div className="home-banner">
              <div className="banner-text">
                <div className="bannerImage">
                  <img src={bannerlogo} alt="" />
                </div>
                <div className="banner-content">
                  <div className="welcome">Welcome!!!</div>
                  <div className="animate-container">
                    <h1 className="animate-character"><span> INSPIRED FOR MEN</span></h1>
                  </div>

                  <p>
                    For Men: Impacting life, fulfilling destinies
                  </p>
                </div>
              </div>
            </div>

            <div className="home-content">
              <div className="container">

                <div className="forumContainer">
                  <div className="left">
                    <div className="text">Inspired for men Forum</div>
                    <div className="text">Inspired for men Forum</div>
                  </div>
                  <div className="right">
                    <span>{displaytodaysdate}</span>
                  </div>
                </div>

                <div className="searchContainer">
                  <div className="searchWrapper">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Topic" />
                    <div className="searchBtn" onClick={() => setSearched(searchTerm)}>
                      <BiSearch className="icon" />
                    </div>
                  </div>
                </div>

                <div className="display-posts">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12 order-md-2" style={{ paddingBottom: '20px' }}>
                      <div className="home-category">
                        <div className="text">Search post by Category ({posts.length})</div>

                        <div className={activeall ? "category categoryactive" : 'category'} value="all"
                          onClick={() => {
                            setFilter(posts)
                            setActive(null)
                            setActiveall(true)
                          }}
                        >
                          All category
                        </div>
                        {checkDuplicateCategory(posts.map((category) => {
                          return category.category
                        })).map((value, index) => {
                          return (
                            <div key={index} onClick={() => {
                              setActive(index)
                              filterTemplate(value)
                              setActiveall(false)
                            }}
                              className={active === index ? "category categoryactive" : 'category'}
                            >
                              {value}
                            </div>
                          )
                        })
                        }
                      </div>
                    </div>

                    <div className="col-lg-9 col-md-9 col-sm-12 order-md-1">
                      {/* .sort() only works on arrays, if it is not defined, it means the filter state hasn't gotten the value yet and turned into an array */}
                      {Array.isArray(filter) ? (
                        filter.filter((val) => {
                          if (searchTerm === "") {
                            return val
                          } else if (val.topic.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                          } else if (searched === "") {
                            return val
                          } else if (val.topic.toLowerCase().includes(searched.toLowerCase())) {
                            return val
                          }
                        })
                          .sort(
                            (a, b) =>
                              moment(new Date(b.createdAt)) - moment(new Date(a.createdAt))
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


                  </div>

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