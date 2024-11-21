import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
const UserDelete = ({ id, closeModal, refreshUsers }) => {
  const [loading, setLoading] = useState();
  //   const {id}=useParams();
  const navigate = useNavigate();
  const handleDeleteUser = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/user/${id}`)
      .then(() => {
        setLoading(false);
        closeModal();
        refreshUsers();
      })
      .catch((error) => {
        setLoading(false);
        alert("Something Went Wrong");
        console.log(error);
      });
  };
  console.log("dasdsadas", id);
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4 place-content-center">Delete User</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this User?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteUser}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default UserDelete;
