import React from "react";
import {
  DeleteFilled,
  HeartOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCard } from "../../../redux/slices/AddToCart";
import { updateCart } from "../../../redux/slices/Favourite";
import RecipeBook from "../RecipeBook";
const RecipeBooks = () => {
  return (
    <div>
      <RecipeBook />
    </div>
  );
};
export default RecipeBooks;
