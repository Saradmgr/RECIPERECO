// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Card, Image } from "antd";
// import { HeartOutlined } from "@ant-design/icons";
// import getRecipes from "../../services/Allproduct";
// import { updateCard } from "../../redux/slices/AddToCart";
// import { useNavigate } from "react-router-dom";

// const FakeDashboard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const carddata = useSelector((state) => state);
//   const { data: recipe, loading } = useSelector((state) => state.allproducts);

//   useEffect(() => {
//     dispatch(getRecipes()); // Dispatch the action to fetch recipes
//   }, [dispatch]);

//   const AddCart = (item) => {
//     const existingItemIndex = carddata?.addToCart?.data.findIndex(
//       (cartItem) => cartItem._id === item?._id
//     );
//     if (existingItemIndex === -1) {
//       const updatedItem = { ...item };
//       dispatch(updateCard([...carddata?.addToCart?.data, updatedItem]));
//     }
//     console.log(item?._id);
//   };
//   const handleRecipeClick = (id) => {
//     navigate(`/details/${id}`);
//   };
//   console.log("asdfasdfasd", recipe);
//   console.log("asdfasdfasdsdsa", recipe?.[1]);

//   return (
//     <div className="grid grid-cols-12 grid-flow-row gap-4">
//       {recipe?.map((item, index) => (
//         <div key={index} className="md:col-span-2">
//           <div>
//             <Card
//               hoverable
//               style={{
//                 width: 240,
//                 top: 0,
//                 left: 0,
//                 transition: "yellow 0.3s ease",
//               }}
//               cover={<Image alt={item?.RecipeName} src={item?.imageurl} />}
//             >
//               <div className="h-40" onClick={() => handleRecipeClick(item._id)}>
//                 {/* onClick={() => handleDetails(item?.recipe)} */}
//                 <div className="h-30">
//                   <div className="font-extrabold">{item?.RecipeName}</div>
//                   <div className="font-bold">Cuisine: {item?.Cuisine}</div>
//                   <div className="font-bold">
//                     TotalTimeInMins: {item?.TotalTimeInMins}
//                   </div>
//                 </div>
//                 <div className="">
//                   <HeartOutlined onClick={() => AddCart(item)} />
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FakeDashboard;
