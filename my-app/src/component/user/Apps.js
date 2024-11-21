// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AutoComplete, Input, Select, Card, Button } from 'antd';
// import Recipe from './Recipe';
// import { fetchSearchmealType, fetchDietLabel, getRecipes } from '../../services/Allproduct';
// import { option, option2 } from '../utils';

// const Apps = () => {
//     const dispatch = useDispatch();
//     const recipes = useSelector((state) => state.allproducts);
//     const mealType = useSelector((state) => state.mealfetch);
//     const dietType = useSelector((state) => state.dietfetch);
//     const [search, setSearch] = useState("");
//     const [options, setOptions] = useState([]);
//     const [activeRecipe, setActiveRecipe] = useState(null);

//     useEffect(() => {
//         dispatch(getRecipes());
//     }, [dispatch]);

//     const handleChange = async (value, option) => {
//         const response = await dispatch(fetchSearchmealType(value));
//         setOptions(response.payload || []);
//         setActiveRecipe('mealType');
//     };

//     const handleChoose = async (value, option) => {
//         const response = await dispatch(fetchDietLabel(value));
//         setOptions(response.payload || []);
//         setActiveRecipe('dietType');
//     };

//     const handleSearch = async (value) => {
//         setSearch(value);
//         const response = await dispatch(getRecipes(value));
//         setOptions(response.payload || []);
//         setActiveRecipe('recipes');
//     };

//     const clearActiveRecipe = () => {
//         setActiveRecipe('mealType');
//     };
//     console.log("recipes",recipes)
//     console.log("mealType",mealType)
//     console.log("dietType",dietType)

//     return (
//         <div className="">
//             <div className="flex gap-5">
//                 <div>
//                     Please select According To Meal Type
//                     <Select
//                         style={{ width: '95%' }}
//                         onChange={handleChange}
//                         options={option.map(opt => ({ label: opt.label, value: opt.value }))}
//                         allowClear
//                     />
//                 </div>
//                 <div>
//                     Please select According To Diet Type
//                     <Select
//                         style={{ width: '95%' }}
//                         onChange={handleChoose}
//                         options={option2.map(opt => ({ label: opt.label, value: opt.value }))}
//                         allowClear
//                     />
//                 </div>
//                 <div>
//                     Please search for meal name
//                     <AutoComplete
//                         popupMatchSelectWidth={252}
//                         style={{ width: '95%' }}
//                         onSearch={handleSearch}
//                         size="large"
//                     >
//                         <Input.Search size="large" placeholder="Input here" />
//                     </AutoComplete>
//                 </div>
//             </div>
//             <div>
//                 <Card>
//                     {activeRecipe === 'recipes' && <Recipe data={recipes} searchTerm={search} />}
//                     {activeRecipe === 'mealType' && <Recipe data={mealType} />}
//                     {activeRecipe === 'dietType' && <Recipe data={dietType} />}
//                 </Card>
//             </div>
//             {/* <Button onClick={clearActiveRecipe}>Clear Recipe</Button> */}
//         </div>
//     );
// };
// export default Apps;
