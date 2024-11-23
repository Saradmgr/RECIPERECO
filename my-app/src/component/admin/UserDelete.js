import axios from "axios";
import React, { useState } from "react";
import Spinner from "../Spinner";

const UserDelete = ({ id, closeModal, refreshUsers }) => {
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-semibold mb-6">Delete User</h1>
      {loading ? (
        <div className="flex justify-center mb-4">
          <Spinner />
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-full sm:w-[500px] md:w-[600px] p-6 mx-auto bg-white shadow-lg">
        <h3 className="text-xl sm:text-2xl text-center mb-6 font-semibold">
          Are You Sure You want to delete this User?
        </h3>
        <button
          className="p-4 bg-red-600 text-white w-full rounded-md hover:bg-red-700 focus:outline-none transition-all"
          onClick={handleDeleteUser}
        >
          Yes, Delete it
        </button>
        <button
          className="mt-4 p-4 bg-gray-300 text-black w-full rounded-md hover:bg-gray-400 focus:outline-none transition-all"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserDelete;
