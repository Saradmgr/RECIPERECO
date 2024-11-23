import { DeleteOutlined } from "@ant-design/icons";
import { Modal, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserDelete from "./UserDelete";

const AllUser = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/user/alluser")
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const showLoading = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex justify-center items-center gap-x-4 mb-8">
        <h1 className="text-3xl font-semibold">User Lists</h1>
      </div>

      {loading ? (
        <Skeleton />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                E-mail
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Phone no
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user, index) => (
              <tr key={user._id} className="h8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.name}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {user.email}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {user.phone}
                </td>
                <td className="flex justify-center gap-x-4">
                  <DeleteOutlined
                    className="text-2xl text-red-800 cursor-pointer"
                    onClick={() => showLoading(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Clean Modal without footer or title */}
      <Modal
        open={open}
        onCancel={closeModal}
        footer={null} // Removes footer for a cleaner look
        width="100%" // Makes the modal width 100% of the screen width
        centered // Centers the modal vertically and horizontally
      >
        <UserDelete
          id={selectedUserId}
          closeModal={closeModal}
          refreshUsers={fetchUsers}
        />
      </Modal>
    </div>
  );
};

export default AllUser;
