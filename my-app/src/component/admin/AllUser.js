import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton, Button, Modal } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import UserDelete from "./UserDelete";

const AllUser = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadings, setLoadings] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/user")
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
    setLoadings(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoadings(false);
    }, 2000);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <h1 className="text-3xl my-8">User Lists</h1>
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
                <td className="border border-slate-700 rounded-md text-center">
                  {user.email}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {user.phone}
                </td>
                <td className="flex justify-center gap-x-4">
                  <DeleteOutlined
                    className="text-2x text-red-800"
                    onClick={() => showLoading(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        title={<p>Loading Modal</p>}
        footer={
          <Button type="primary" onClick={showLoading}>
            Reload
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={closeModal}
        width={1000}
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
