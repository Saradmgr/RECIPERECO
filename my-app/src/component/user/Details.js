import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRecommendations,
  fetchSearchProducts,
} from "../../services/Allproduct";
import { Card, Image } from "antd";
import GoBack from "../GoBack";
import axios from "axios";
import { updateCard } from "../../redux/slices/AddToCart";
import { HeartOutlined } from "@ant-design/icons";
const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams(); // Get id from URL (React Router)
  const carddata = useSelector((state) => state);
  const details = useSelector((state) => state.detailfetch?.data?.data);
  const recommendations = useSelector((state) => state.recommendations.data);

  React.useEffect(() => {
    dispatch(fetchSearchProducts(id));
    dispatch(fetchRecommendations(id)); // Fetch the recipe by id
  }, [dispatch, id]);
  const handleRecipeClick = (id) => {
    navigate(`/details/${id}`);
  };
  const AddCart = (item) => {
    const existingItemIndex = carddata?.addToCart?.data.findIndex(
      (cartItem) => cartItem._id === item?._id
    );
    if (existingItemIndex === -1) {
      const updatedItem = { ...item };
      dispatch(updateCard([...carddata?.addToCart?.data, updatedItem]));
    }
    console.log(item?._id);
  };
  console.log("details", details);
  return (
    <div>
      <Card>
        <div className="grid md:grid-cols-12 grid-flow-row h-auto">
          <div className="md:col-span-6 md:ml-[10rem]">
            <div className=" max-h-25">
              <div>
                <img src={details?.imageurl} className="h-30" alt="gg" />
              </div>
            </div>
          </div>
          <div className="md:col-span-6 grid gap-2">
            <div className="font-extrabold underline">
              {details?.RecipeName}
            </div>
            <div className="flex">
              <div className="font-bold">Ingredients: </div>
              <div>
                {details?.Ingredients?.split(",").map((ingredient, index) => (
                  <div key={index}>-{ingredient.trim()}</div>
                ))}
              </div>
            </div>
            <div className="flex">
              <div className="font-bold">TotalTimeInMins: </div>
              <div>{details?.TotalTimeInMins}</div>
            </div>
            <div className="flex">
              <div className="font-bold">Instructions: </div>
              <div>
                {details?.Instructions?.split(",").map((instruction, index) => (
                  <div key={index}>-{instruction.trim()}</div>
                ))}
              </div>
            </div>
            <div className="flex">
              <div className="font-bold">Cleaned Ingredients:</div>
              <div> {details?.CleanedIngredients}</div>
            </div>
            <div className="flex">
              <div className="font-bold">Ingredientcount:</div>
              <div> {details?.Ingredientcount}</div>
            </div>
          </div>
        </div>

        <div className="font-bold">Recommended Recipes</div>
      </Card>
      <div className="grid grid-cols-12 grid-flow-row gap-4">
        {recommendations?.map((item, index) => (
          <div key={index} className="md:col-span-2">
            <div>
              <Card
                hoverable
                style={{
                  width: 240,
                  top: 0,
                  left: 0,
                  transition: "yellow 0.3s ease",
                }}
                cover={<Image alt={item?.RecipeName} src={item?.imageurl} />}
              >
                <div className="h-40">
                  {/* onClick={() => handleDetails(item?.recipe)} */}
                  <div
                    className="h-30"
                    onClick={() => handleRecipeClick(item._id)}
                  >
                    <div className="font-extrabold">{item?.RecipeName}</div>
                    <div className="font-bold">Cuisine: {item?.Cuisine}</div>
                    <div className="font-bold">
                      TotalTimeInMins: {item?.TotalTimeInMins}
                    </div>
                  </div>
                  <div className="">
                    <HeartOutlined onClick={() => AddCart(item)} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Details;
