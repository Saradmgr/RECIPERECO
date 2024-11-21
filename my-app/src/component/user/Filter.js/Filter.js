// import React from 'react';
// import { Checkbox, Button, List } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { options } from '../../utils';
// import { clearFilteredData, setCheckedValues } from '../../../redux/slices/filterslice';
// import { fetchFilteredData } from '../../../services/Allproduct';

// const Filter = () => {
//     const dispatch = useDispatch();
//     const data = useSelector((state) => state.allproducts); // Assuming data is stored in allproducts slice
//     const checkedValues = useSelector((state) => state.filter.checkedValues);
//     const filteredData = useSelector((state) => state.filter.filteredData);
//     const loading = useSelector((state) => state.filter.loading);
//     const error = useSelector((state) => state.filter.error);
//     const healthTypes = checkedValues
//         .map((value) => options.find((option) => option.value === value).label.toLowerCase())
//         .join('&health=');

//     const handleButtonClick = (item) => {
//         const existingItemIndex = data?.data.findIndex((cartItem) => cartItem.healthLabels=== item.healthLabels);
//         dispatch(fetchFilteredData(healthTypes));
//     };
//     const onChange = (values) => {
//         dispatch(setCheckedValues(values));
//         dispatch(clearFilteredData());
//     };
//     console.log("daras", data);

//     return (
//         <div>
//             <Checkbox.Group options={options} value={checkedValues} onChange={onChange} />
//             <Button type="primary" onClick={handleButtonClick}>
//                 Apply Filter
//             </Button>
//         </div>
//     );
// };

// export default Filter;
