import Navbar from "../../utils/Navigation/Navbar";
import { useState, useEffect, useRef } from "react";
import classes from "../Search/css/HomeSearch.module.css";
import { useNavigate, useParams } from "react-router-dom";

import HeaderSection from "../../components/Header/HeaderSection";
import Table from "../../components/Table/Table";
import SubmitButton from "../../UI/Button/SubmitButton";

import IntermediateRows from "../../components/IntermediateRows/IntermediateRows";
import Carrousel from "../../components/Carrousel/Carrousel";
import Footer from "../../utils/Footer/Footer";

function Index() {
  const [components, setComponents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { id } = useParams(); // Get the value of id from the URL
  const [currentPage, setCurrentPage] = useState(id ? parseInt(id) : 1);

  const itemsPerPage = 15; // Number of items per page
  const navigate = useNavigate();
  // Sort the table
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  // Handle the filter
  const [enteredValue, setEnteredValue] = useState(""); // New state
  const [enteredSource, setEnteredSource] = useState(""); // New state

  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false); // Change to `true` when the user logs in
  const tableRef = useRef(null); // Create a reference for the table
  // Fanfiction selection
  const [modelToQuery, setModelToQuery] = useState("HarryP");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      let apiUrl = `http://localhost:8000/library/?page=${currentPage}&perPage=${itemsPerPage}&sortField=${sortBy}&sortOrder=${sortOrder}&modelToQuery=${modelToQuery}`;

      if (enteredValue) {
        const encodedValue = encodeURIComponent(enteredValue);
        apiUrl += `&filterValue=${encodedValue}`;
      }

      if (enteredSource) {
        const encodedSource = encodeURIComponent(enteredSource);
        apiUrl += `&SourceValue=${encodedSource}`;
      }

      fetch(apiUrl, {
        headers: {
          "auth-token": storedToken,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          console.log(data);
          setComponents(data.data);
          setTotalPages(data.totalPages);
          setUserIsLoggedIn(true);
        })
        .catch((error) => {
          setUserIsLoggedIn(false);
          navigate(`/login`);
        });
    } else {
      setUserIsLoggedIn(false);
      navigate(`/login`);
    }
  }, [
    currentPage,
    sortBy,
    sortOrder,
    enteredValue,
    enteredSource,
    modelToQuery,
  ]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      navigate(`/index/Page/${newPage}`);
      setCurrentPage(newPage);
      window.scrollTo({ top: -50, behavior: "smooth" });
    } else if (newPage < 1) {
      setCurrentPage(1);
      navigate(`/index`);
    }
  };

  const handleSortUpdate = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleEnteredValueChange = (value) => {
    setCurrentPage(1);
    setEnteredValue(value);
  };

  const handleEnteredSourceChange = (value) => {
    setCurrentPage(1);
    setEnteredSource(value);
  };

  const handleImageClick = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <HeaderSection></HeaderSection>
      <div className={classes.line}></div>
      <img
        className={classes.backimages}
        src="/images/1768.png"
        alt="My Image"
      />
      <IntermediateRows></IntermediateRows>
      <div className={classes.landContainer}>
        <span>
          “Fanfiction is a place where dreams and reality collide. It’s pure
          magic!”
        </span>
      </div>

      <div>
        {userIsLoggedIn && (
          <>
            <Carrousel
              imagenClick={handleImageClick}
              setModel={setModelToQuery}
            ></Carrousel>

            <div className={classes.lineTable} ref={tableRef}></div>
            <SubmitButton
              current={currentPage}
              total={totalPages}
              onPageChange={handlePageChange}
              onImageClick={handleImageClick}
            ></SubmitButton>

            <div className={classes.Container}>
              <Table
                data={components}
                handleSort={handleSortUpdate}
                sort={sortOrder}
                sortBy={sortBy}
                onEnteredValueChange={handleEnteredValueChange}
                onEnteredSourceChange={handleEnteredSourceChange}
              ></Table>
              <SubmitButton
                current={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
                onImageClick={handleImageClick}
              ></SubmitButton>
            </div>
          </>
        )}
        <div className={classes.landContainerLog}>
          <div className={classes.landContainerLogWrapper}>
            <span>
              Ready for an unforgettable adventure? Join the Fanfiction Hub
              community today and share your tales!
            </span>
            <div className={classes.LastButton}>
              <button onClick={(e) => navigate("/register")}>Sign Up</button>
              <button style={{ backgroundColor: "orange" }}>Learn More</button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Index;
