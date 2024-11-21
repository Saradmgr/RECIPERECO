import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include this if your backend uses cookies
      };

      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        config
      );

      // Show success notification
      notification.success({
        message: "Success",
        description: "Login successful!",
      });

      // Store token and user data in localStorage
      localStorage.setItem("userInfo", JSON.stringify(data.user)); // Store user data
      localStorage.setItem("userToken", data.token); // Store token

      // Return the user data to Redux state
      return data;
    } catch (error) {
      // Show error notification
      notification.error({
        message: "Error",
        description:
          error?.response?.data?.error ||
          "Login failed. Please check your credentials and try again.",
      });

      return rejectWithValue(error?.response?.data);
    }
  }
);
