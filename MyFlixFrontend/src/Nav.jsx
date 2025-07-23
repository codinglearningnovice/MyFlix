import React, { useState,useEffect } from 'react'
import "./Nav.css"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Nav() {
    const [show, handleShow] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        window.addEventListener("scroll", () => {
          if (window.scrollY > 100) {
            handleShow(true);
          } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", handleShow);
        }

    },[])

    const searchMovies = () => {
      if (search) {
        console.log("search butto clicked");
        navigate(`/search?query=${search}`);
      }

    }
  
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <Link to={"/"}>
        <img className="nav_logo" src="\myflix.png" alt="MyFlix" />
      </Link>
      <div className="search-btn">
        <input
          type="text"
          value={search}
          placeholder="Search for a movie, tv show, person..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn__btn" onClick={searchMovies}>
          <span className="material-icons-outlined">
            <SearchOutlinedIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Nav