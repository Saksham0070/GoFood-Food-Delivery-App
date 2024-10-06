import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import image2 from "../Images/anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg";
import image1 from "../Images/chad-montano-MqT0asuoIcU-unsplash.jpg";
import image3 from "../Images/davide-cantelli-jpkfc5_d-DI-unsplash.jpg";

const Home = () => {
  const [search, setsearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodItems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      console.log("API Response:", response);
      setFoodItems(response[0]); // Assuming the first object in the response is foodItems
      setFoodCategory(response[1]); // Assuming the second object in the response is foodCategory
    } catch (err) {
      console.log("Error Fetching Data", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src={image1}
              className="d-block w-100"
              alt="First slide"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <div class="d-flex justify-content-center">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
                {/* <button class="btn btn-outline-success" type="submit"> */}
                {/* Search
              </button> */}
              </div>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src={image2}
              className="d-block w-100"
              alt="Second slide"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={image3}
              className="d-block w-100"
              alt="Third slide"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCategory.length > 0 ? (
          foodCategory.map((category) => (
            <div key={category.CategoryName}>
              <h2>{category.CategoryName}</h2>
              <hr />
              <div className="row mb-3">
                {foodItems.length > 0 ? (
                  foodItems
                    .filter(
                      (item) =>
                        item.CategoryName === category.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteritem) => {
                      console.log("Filter Item:", filteritem); // Log entire food item to see if options exist
                      console.log(
                        "Options for this item:",
                        filteritem.options[0]
                      ); // Log options array

                      return (
                        <div
                          key={filteritem.name}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            // name={filteritem.name}
                            // img={filteritem.img}
                            // description={filteritem.description}
                            foodItem = {filteritem}
                            options={
                               filteritem.options
                                
                            } // Fallback if options are not present
                          />
                        </div>
                      );
                    })
                ) : (
                  <p>No items available for this category.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
