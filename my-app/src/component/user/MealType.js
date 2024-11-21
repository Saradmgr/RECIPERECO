
import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const MealType = ({ data,searchTerm,loading }) => {
  const navigate = useNavigate();
 const handleDetails = (recipe) => {
        navigate(`/details/${recipe.label}`);
    };
  return (
    <div>
      <div className="font-bold justify-center flex text-2xl">
        <div>
        {searchTerm &&  `Search Results for:`}
        </div>
      <div className="uppercase">
      {searchTerm &&  `${searchTerm}`}
      </div>
      </div>
      <div className="grid grid-cols-12 grid-flow-row gap-4">
      {
        data?.data?.map((item, index) => (
          <div key={item.index} className="md:col-span-3"  >
            <div>
              <Card
                hoverable
                style={{
                  width: 240,
                  top: 0,
                  left: 0,
                  transition: 'yellow 0.3s ease',
                }}
                cover={<img alt={item?.recipe?.label} src={item?.recipe?.image} />}
              >
                <div  className="h-40" onClick={() => handleDetails(item?.recipe)}>
                  <div className="h-30">
                    <div className="font-extrabold">
                      {item?.recipe?.label}
                    </div>
                    <div className="font-bold">
                     Calories: {item?.recipe?.calories.toFixed(3)}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))
      }
    </div>
    </div>
  );

}
export default MealType;
