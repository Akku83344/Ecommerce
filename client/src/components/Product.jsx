/* eslint-disable react/prop-types */
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  Favorite,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { useState } from "react";
import { useSelector } from "react-redux";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked);
  const isLoggedIn = useSelector((state) => state.user.currentUser != null);

  const likeProduct = async (item) => {
    if (!isLoggedIn) {
      window.alert("You are not logged in");
      return;
    }

    try {
      const res = await userRequest.post(`/likes/${item._id}`);
      console.log(res.data);
      setIsLiked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unlikeProduct = async (item) => {
    if (!isLoggedIn) {
      window.alert("You are not logged in");
      return;
    }

    try {
      const res = await userRequest.delete(`/likes/${item._id}`);
      console.log(res.data);
      setIsLiked(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          {isLiked ? (
            <Favorite color="error" onClick={() => unlikeProduct(item)} />
          ) : (
            <FavoriteBorderOutlined onClick={() => likeProduct(item)} />
          )}
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
