import { HeartOutlined } from "@ant-design/icons";
import { Button, Card, Image, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCard } from "../../redux/slices/AddToCart";
import {
  fetchRecommendations,
  fetchSearchProducts,
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

  React.useEffect(() => {
    dispatch(fetchSearchProducts(id));
    dispatch(fetchRecommendations(id));
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

  const handleSeeMore = (content, title) => {
    // Check if the title is "Instructions" to keep it in one row and split by full stop.
    if (title === "Instructions") {
      // Split content by full stop to get individual sentences.
      const sentences = content
        .split(".")
        .map((item) => item.trim())
        .filter(Boolean);
      setModalContent(sentences); // For instructions, split into sentences
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations?.map((item, index) => (
          <Card
            key={index}
            hoverable
            className="shadow-md rounded-lg"
            cover={
              <Image
                alt={item?.RecipeName}
                src={item?.imageurl}
                className="rounded-t-lg"
              />
            }
          >
            <div
              onClick={() => handleRecipeClick(item._id)}
              className="cursor-pointer"
            >
              <Title level={5}>{item?.RecipeName}</Title>
              <Text type="secondary">Cuisine: {item?.Cuisine}</Text>
              <br />
              <Text>Total Time: {item?.TotalTimeInMins} mins</Text>
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
          // For Instructions, render sentences with "-" before each one
          modalContent.map((sentence, index) => (
            <Text key={index} className="block">
              - {sentence}.
            </Text>
          ))
        ) : (
          // For other content, render in two columns
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
