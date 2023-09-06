/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.currentUser != null);

  useEffect(() => {
    console.log(cat);
    const getProducts = async () => {
      try {
        let likedProductsSet;
        if (isLoggedIn) {
          likedProductsSet = await getLikedProducts();
        }

        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?catergory=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(
          res.data.map((product) => ({
            ...product,
            isLiked: likedProductsSet?.has(product._id) || false,
          }))
        );
        console.log(
          res.data.map((product) => ({
            ...product,
            isLiked: likedProductsSet?.has(product._id) || false,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  const getLikedProducts = async () => {
    try {
      const res = await userRequest.get("/likes");
      console.log(res);
      const likedProductsSet = new Set(res.data.map((item) => item.productId));
      return likedProductsSet; // Return the populated Set
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProduct.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
