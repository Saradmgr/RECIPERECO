import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import AdminRecipes from "../component/admin/AdminRecipes";
import AllUser from "../component/admin/AllUser";
import AllrecipesCount from "../component/admin/recipe/AllrecipesCount";
import Login from "../component/user/Login";
import {
  default as RecipeDetails,
  default as RecipeSearch,
} from "../component/user/UserProfile/RecipeDetails";
import Dashboard from "../component/user/dashboard/Dashboard";
const Details = React.lazy(() => import("../component/user/Details"));
const Signup = React.lazy(() => import("../component/user/Signup"));
const AuthLayout = React.lazy(() => import("../component/layout/AuthLayout"));
const PagenotFound = React.lazy(() => import("../component/PagenotFound"));
const Profile = React.lazy(() => import("../component/user/Profile"));
const UserProfile = React.lazy(() =>
  import("../component/user/UserProfile/UserProfile")
);
const Filter = React.lazy(() => import("../component/user/Filter.js/Filter"));
const Settings = React.lazy(() =>
  import("../component/user/UserProfile/Settings")
);
const ContactInfo = React.lazy(() => import("../component/user/Aboutus"));
const Aboutus = React.lazy(() => import("../component/user/Aboutus"));
const Contactus = React.lazy(() => import("../component/user/Contactus"));
const Userlayout = React.lazy(() => import("../component/layout/Userlayout"));
const Adminlayout = React.lazy(() => import("../component/layout/Adminlayout"));
const AdminDashboard = React.lazy(() =>
  import("../component/admin/AdminDashboard")
);

export const MainRouter = createBrowserRouter(
  createRoutesFromChildren(
    <Route>
      <Route path="/" element={<Userlayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/detailss/:id" element={<RecipeDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/search" element={<RecipeSearch />} />
      </Route>
      <Route path="/admin" element={<Adminlayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />\
        <Route path="userlist" element={<AllUser />} />
        <Route path="recipes" element={<AdminRecipes />} />
        <Route path="recipeslist" element={<AllrecipesCount />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="*" element={<PagenotFound />} />
      <Route path="/filter" element={<Filter />} />
    </Route>
  )
);
