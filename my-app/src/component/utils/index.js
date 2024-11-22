import {
  BookOutlined,
  ContainerOutlined,
  DesktopOutlined,
  FileAddOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import AddRecipe from "../admin/recipe/AddRecipe";

export const options = [
  {
    label: "Alcohol-Cocktail",
    value: "alcohol-cocktail",
  },
  {
    label: "Alcohol-Free",
    value: "alcohol-free",
  },
  {
    label: "Celery-Free",
    value: "celery-free",
  },
  {
    label: "Dairy-Free",
    value: "dairy-free",
  },
  {
    label: "Egg-Free",
    value: "egg-free",
  },
  {
    label: "Fish-Free",
    value: "fish-free",
  },
  {
    label: "FODMAP-Free",
    value: "fodmap-free",
  },
  {
    label: "Gluten-Free",
    value: "gluten-free",
  },
  {
    label: "Immuno-Supportive",
    value: "immuno-supportive",
  },
  {
    label: "Keto-Friendly",
    value: "keto-friendly",
  },
  {
    label: "Kidney-Friendly",
    value: "kidney-friendly",
  },
  {
    label: "Kosher",
    value: "kosher",
  },
  {
    label: "Lupine-Free",
    value: "lupine-free",
  },
  {
    label: "Mollusk-Free",
    value: "mollusk-free",
  },
  {
    label: "Mustard-Free",
    value: "mustard-free",
  },
  {
    label: "Paleo",
    value: "paleo",
  },
  {
    label: "Peanut-Free",
    value: "peanut-free",
  },
  {
    label: "Pescatarian",
    value: "pecatarian",
  },
  {
    label: "Pork-Free",
    value: "pork-free",
  },
  {
    label: "Red-Meat-Free",
    value: "red-meat-free",
  },
  {
    label: "Sesame-Free",
    value: "sesame-free",
  },
  {
    label: "Shellfish-Free",
    value: "shellfish-free",
  },
  {
    label: "Soy-Free",
    value: "soy-free",
  },
  {
    label: "Sugar-Conscious",
    value: "sugar-conscious",
  },
  {
    label: "Sulfite-Free",
    value: "sulfite-free",
  },
  {
    label: "Tree-Nut-Free",
    value: "tree-nut-free",
  },
  {
    label: "Vegan",
    value: "vegan",
  },
  {
    label: "Vegetarian",
    value: "vegetarian",
  },
  {
    label: "Wheat-Free",
    value: "wheat-free",
  },
];
export const option = [
  { value: "breakfast", label: "Breakfast" },
  { value: "brunch", label: "Brunch" },
  { value: "lunch/dinner", label: "Lunch/Dinner" },
  { value: "snack", label: "Snack" },
  { value: "teatime", label: "Teatime" },
];
export const option2 = [
  { value: "Balanced", label: "balanced" },
  { value: "High-Fiber", label: "high-fiber" },
  { value: "High-Protein", label: "high-protein" },
  { value: "Low-Carb", label: "low-carb" },
  { value: "Low-Fat", label: "low-fat" },
  { value: "Low-Sodium", label: "low-sodium" },
];
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
  getItem("Dashboard", "/admin/dashboard", <PieChartOutlined />),
  getItem("User List", "/admin/userlist", <DesktopOutlined />),
  getItem("Profile", "/admin/profile", <ContainerOutlined />),
  getItem("Recipes", "/admin/recipes", <BookOutlined />),
];
export const recipeaction = [
  {
    key: 1,
    label: "View Recipes",
    children: <AddRecipe />,
    icon: <FileAddOutlined />,
  },
];
