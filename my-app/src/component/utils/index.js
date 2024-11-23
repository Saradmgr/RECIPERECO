import {
  BookOutlined,
  DesktopOutlined,
  FileAddOutlined,
  PieChartOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import AddNewRecipes from "../admin/recipe/AddNewRecipes";
import AllRecipeAdmin from "../admin/recipe/AllRecipeAdmin";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
export const items = [
  getItem("Dashboard", "/admin/recipeslist", <PieChartOutlined />),
  getItem("User List", "/admin/userlist", <DesktopOutlined />),
  getItem("Recipes", "/admin/recipes", <BookOutlined />),
];
export const recipeaction = [
  {
    key: 1,
    label: "View Recipes",
    children: <AllRecipeAdmin />,
    icon: <FileAddOutlined />,
  },
  {
    key: 2,
    label: "Add Recipes",
    children: <AddNewRecipes />,
    icon: <PlusCircleFilled />,
  },
];
