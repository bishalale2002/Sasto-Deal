import React, { useState, useEffect } from "react";
import Layouts from "./../components/layout/Layouts";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  // Filter function
  const handleFilter = (value, id) => {
    let updatedChecked = [...checked];

    if (value) {
      updatedChecked.push(id); // Push the category ID when checked
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== id); // Remove it when unchecked
    }

    setChecked(updatedChecked); // Update the checked state
  };

  // Fetching categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Fetch products from API
  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProducts(data?.products);
      } else {
        console.log("Failed to fetch products");
      }
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layouts title={"All Products Best-offer"}>
      <div className="row mt-3">
        <div className="col-md-3 ">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                checked={checked.includes(c._id)} // Check if the checkbox should be checked
                onChange={(e) => handleFilter(e.target.checked, c._id)} // Pass the correct ID
              >
                {c.name}{" "}
              </Checkbox>
            ))}
          </div>
          <h6 className="text-center">Filter By Price</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((m) => (
                <div key={m._id}>
                  <Radio value={m.array}>{m.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>

        <div className="col-md-9">
          <h2 className="text-center">All Products</h2>
          {JSON.stringify(radio, null, 4)}{" "}
          {/* Display checked category IDs for debugging */}
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
                >
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${product._id}`} // Display product photo
                      className="card-img-top"
                      alt={product.name}
                      style={{
                        height: "200px",
                        objectFit: "cover", // Ensures the image covers the card without distortion
                        objectPosition: "center", // Centers the image inside the card
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 60)}...
                      </p>
                      <p className="card-text">Price: ${product.price}</p>
                      <button className="btn btn-primary ms-1">
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </Layouts>
  );
}
