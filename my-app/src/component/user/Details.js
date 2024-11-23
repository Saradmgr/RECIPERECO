import { HeartOutlined } from "@ant-design/icons";
import { Button, Card, Image, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRecommendations,
  fetchSearchProducts,
  fetchsavedRecipe,
  savedRecipe,
} from "../../services/Allproduct";

const { Title, Text } = Typography;

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const carddata = useSelector((state) => state);
  const details = useSelector((state) => state.detailfetch?.data?.data);
  const recommendations = useSelector((state) => state.recommendations.data);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const { userInfo } = useSelector((state) => state.authSlice);
  React.useEffect(() => {
    dispatch(fetchSearchProducts(id));
    dispatch(fetchRecommendations(id));
  }, [dispatch, id]);

  const handleRecipeClick = (id) => {
    navigate(`/details/${id}`);
  };

  const AddCart = (item) => {
    const fetchsavedRecipes = carddata?.fetchsaved?.data;
    const existingItemIndex = carddata?.fetchsaved?.data?.findIndex(
      (cartItem) => cartItem?.recipeId?._id === item?._id
    );

    if (userInfo) {
      if (existingItemIndex === -1 || fetchsavedRecipes.length === 0) {
        const userId = carddata?.authSlice?.userInfo?._id;
        const recipeId = item?._id;

        dispatch(savedRecipe({ userId, recipeId }))
          .then(() => {
            dispatch(fetchsavedRecipe(userId));
          })
          .catch((error) => {
            console.error("Error adding recipe to cart:", error);
          });
      } else {
        console.error("Already exists");
      }
    } else {
      navigate("/auth/login");
    }
  };

  const handleSeeMore = (content, title) => {
    if (title === "Instructions") {
      const sentences = content
        .split(".")
        .map((item) => item.trim())
        .filter(Boolean);
      setModalContent(sentences);
    } else {
      const formattedContent = content.split(",").map((item) => item.trim());
      setModalContent(formattedContent);
    }
    setModalTitle(title);
    setIsModalVisible(true);
  };

  const renderContent = (content, title) => {
    const words = content.split(" ");
    if (words.length > 20) {
      return (
        <>
          {words.slice(0, 20).join(" ")}...
          <Button
            type="link"
            onClick={() => handleSeeMore(content, title)}
            style={{ paddingLeft: 0 }}
          >
            See More
          </Button>
        </>
      );
    }
    return content;
  };

  return (
    <div className="px-6 py-4">
      <Card bordered={false} className="shadow-lg">
        <div className="grid md:grid-cols-12 grid-flow-row gap-6 h-auto">
          <div className="md:col-span-6 flex justify-center">
            <Image
              src={details?.imageurl}
              alt={details?.RecipeName}
              className="rounded-md"
              width={300}
            />
          </div>
          <div className="md:col-span-6 grid gap-4">
            <Title level={3} className="text-center md:text-left">
              {details?.RecipeName}
            </Title>
            <div>
              <Text strong>Ingredients:</Text>
              <div>
                {renderContent(details?.Ingredients || "", "Ingredients")}
              </div>
            </div>
            <div>
              <Text strong>Total Time (mins):</Text> {details?.TotalTimeInMins}
            </div>
            <div>
              <Text strong>Instructions:</Text>
              <div>
                {renderContent(details?.Instructions || "", "Instructions")}
              </div>
            </div>
            <div>
              <Text strong>Cleaned Ingredients:</Text>
              <div>
                {renderContent(
                  details?.CleanedIngredients || "",
                  "Cleaned Ingredients"
                )}
              </div>
            </div>
            <div>
              <Text strong>Ingredient Count:</Text> {details?.Ingredientcount}
            </div>
          </div>
        </div>
      </Card>

      <Title level={4} className="mt-8 mb-4">
        Recommended Recipes
      </Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {recommendations?.map((item, index) => (
          <Card
            key={index}
            hoverable
            className="shadow-md rounded-lg"
            style={{
              width: "100%",
              maxWidth: "220px", // Adjusting the width of the card
              margin: "0 auto", // Center the card within the column
              padding: "8px", // Add padding to reduce card size
            }}
            cover={
              <Image
                alt={item?.RecipeName}
                src={item?.imageurl}
                className="rounded-t-lg"
                style={{
                  height: "150px", // Adjust image height to make it smaller
                  objectFit: "cover",
                }}
              />
            }
          >
            <div
              onClick={() => handleRecipeClick(item._id)}
              className="cursor-pointer"
            >
              <Title level={5} style={{ fontSize: "16px" }}>
                {item?.RecipeName}
              </Title>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Cuisine: {item?.Cuisine}
              </Text>
              <br />
              <Text style={{ fontSize: "12px" }}>
                Total Time: {item?.TotalTimeInMins} mins
              </Text>
            </div>
            <div className="flex justify-end mt-2">
              <HeartOutlined
                onClick={() => AddCart(item)}
                className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Modal for showing full details */}
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {modalTitle === "Instructions" ? (
          modalContent.map((sentence, index) => (
            <Text key={index} className="block">
              - {sentence}.
            </Text>
          ))
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {modalContent.map((item, index) => (
              <Text key={index} className="block">
                {item}
              </Text>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Details;
