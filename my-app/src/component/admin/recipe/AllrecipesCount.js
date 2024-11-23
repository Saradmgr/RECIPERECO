import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AllrecipesCount = () => {
  const [userCount, setuserCount] = useState(0);
  const [recipeCount, setrecipeCount] = useState(0);
  const [savedRecipeCount, setsavedRecipeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch functions
  const fetchRecipelength = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/recipes/admin/recipelength")
      .then((response) => {
        setrecipeCount(response.data.count || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const fetchSavedRecipeLength = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/saved/savedrecipelength")
      .then((response) => {
        setsavedRecipeCount(response.data.count || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const fetchUserlength = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/user/alluser/length")
      .then((response) => {
        setuserCount(response.data.count || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipelength();
    fetchSavedRecipeLength();
    fetchUserlength();
  }, []);

  // Chart data and options
  const chartData = {
    labels: ["Users", "Recipes", "Saved Recipes"],
    datasets: [
      {
        label: "Counts",
        data: [userCount, recipeCount, savedRecipeCount],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        barThickness: 10, // Set the bar thickness to make bars smaller
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-8">Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Bar
            data={chartData}
            options={chartOptions}
            style={{ maxHeight: "300px", maxWidth: "500px" }}
          />
          <div className="mt-8">
            <h2 className="text-xl">Recipe Count: {recipeCount}</h2>
            <h2 className="text-xl">Saved Recipe Count: {savedRecipeCount}</h2>
            <h2 className="text-xl">Total User Count: {userCount}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllrecipesCount;
