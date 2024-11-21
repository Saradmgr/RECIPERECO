import React from 'react'
import { DeleteFilled } from '@ant-design/icons'
import {  Card } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../../../redux/slices/Favourite';
const Favorite = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const carddata = useSelector((state) => state)
    console.log("carddata", carddata)
    const [orderdata, setOrderData] = React.useState([])
    const handleDelete = (label) => {
        dispatch(updateCart(carddata?.favourite?.data?.filter((item) => item.label !== label)))
    }
    React.useEffect(() => {
        setOrderData(carddata?.favourite?.data)
    }, [carddata?.favourite?.data])
    console.log("asdsadsadasd", carddata?.favourite)
    const handleDetails = (recipe) => {
        navigate(`/details/${recipe.label}`);
    };
    console.log("asdsadasdsa",carddata?.favourite?.data)
    return (
        <div>
            <div className="grid grid-cols-12 grid-flow-row gap-4">
                {
                    carddata?.favourite?.data?.map((item, index) => (
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
                                    cover={<img alt={item.label} src={item.image} />}
                                >
                                    <div className="h-40" >
                                        <div className="h-30" onClick={() => handleDetails(item)}>
                                            <div className="font-extrabold">
                                                {item?.label}
                                            </div>
                                        </div>
                                        <div>
                                            <DeleteFilled onClick={() => handleDelete(item?.label)} />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Favorite