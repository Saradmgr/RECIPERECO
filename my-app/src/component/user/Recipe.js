// import { HeartOutlined } from "@ant-design/icons";
// import { Card, Image } from "antd";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const Recipe = ({ data, searchTerm }) => {
//   const [userId, setUserId] = React.useState("");
//   const [recipeId, setRecipeId] = React.useState("");
//   const dispatch = useDispatch();
//   const carddata = useSelector((state) => state);
//   const navigate = useNavigate();
//   const text = "Registered Successfully";

//   const handleDetails = (recipe) => {
//     navigate(`/details/${recipe.label}`);
//   };

//   const AddCart = (item) => {
//     // const existingItemIndex = carddata?.addToCart?.data.findIndex((cartItem) => cartItem.label === item?.recipe.label);
//     // if (existingItemIndex === -1) {
//     //   const updatedItem = { ...item?.recipe };
//     //   dispatch(updateCard([...carddata?.addToCart?.data, updatedItem]));
//     // }
//     // dispatch(savedRecipe({userId,recipeId}));
//     console.log("recipesaving", item);
//   };

//   return (
//     <div>
//       <div className="font-bold justify-center flex text-2xl">
//         <div>{searchTerm && `Search Result for:`}</div>
//         <div className="uppercase">{searchTerm && `${searchTerm}`}</div>
//       </div>
//       <div className="grid grid-cols-12 grid-flow-row gap-4">
//         {data?.data?.map((item, index) => (
//           <div key={index} className="md:col-span-3">
//             <div>
//               <Card
//                 hoverable
//                 style={{
//                   width: 240,
//                   top: 0,
//                   left: 0,
//                   transition: "yellow 0.3s ease",
//                 }}
//                 cover={
//                   <Image alt={item?.recipe?.label} src={item?.recipe?.image} />
//                 }
//               >
//                 <div className="h-40">
//                   <div
//                     className="h-30"
//                     onClick={() => handleDetails(item?.recipe)}
//                   >
//                     <div className="font-extrabold">{item?.recipe?.label}</div>
//                     <div className="font-bold">
//                       Calories: {item?.recipe?.calories.toFixed(3)}
//                     </div>
//                   </div>
//                   <div className="">
//                     <HeartOutlined onClick={() => AddCart(item)} />
//                   </div>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Recipe;
