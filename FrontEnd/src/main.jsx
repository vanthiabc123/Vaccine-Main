import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layoutmain from "./components/Layoutmain.jsx";
import HomePage from "./pages/HomePage.jsx";
import Calendar from "./pages/Calendar.jsx";
import History from "./pages/History.jsx";
import SignUp from "./pages/SignUp.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import RegisterVaccination from "./pages/RegisterVaccination.jsx";
import AccountManagement from "./components/Admin/Router/AccountManagement.jsx";
import Vaccin from "./components/Admin/Router/Vaccin.jsx";
import Addvaccin from "./components/Admin/Controller/AddVaccin.jsx";
import EditVaccin from "./components/Admin/Controller/EditVaccin.jsx";
import InjectionRegistration from "./components/Admin/Router/InjectionRegistration.jsx";
import Inventorymanagement from "./components/Admin/Router/Inventorymanagement.jsx";
import ListSold from "./components/Admin/Router/ListSold.jsx";
import Plan from "./components/Admin/Router/Plan.jsx";
import UpdateMain from "./components/Admin/Router/UpdateMain.jsx";
import InformationSelled from "./components/Admin/Router/InformationSelled.jsx";
import EditListSold from "./components/Admin/Controller/EditListSold.jsx";
import UpdateInformation from "./components/Admin/Controller/UpdateInformation.jsx";
import AddCategory from "./components/Admin/Controller/addCategory.jsx";
import AddPlan from "./components/Admin/Controller/AddPlan.jsx";
import VaccinesDetail from "./pages/VaccinesDetail.jsx";
import PayVaccines from "./pages/PayVaccines.jsx";
import Cart from "./pages/Cart.jsx";
import Message from "./components/Admin/Router/Message.jsx";
import OtherManagement from "./components/Admin/Router/OtherManagement.jsx";
import CommentManagement from "./components/Admin/Router/CommentManagement.jsx";
import OtherDetails from "./components/Admin/Router/OtherDetails.jsx";
import PostManagement from "./components/Admin/Router/PostManagement.jsx";
import AddPost from "./components/Admin/Controller/AddPost.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import CategoryPostManagement from "./components/Admin/Router/CategoryPostManagement.jsx";
import AddCategoryPost from "./components/Admin/Controller/AddCategoryPost.jsx";
import Dashboard from "./components/Admin/Router/Dashboard.jsx";
import MessageToPhone from "./components/Admin/Router/MessageToPhone.jsx";
import LayoutAdmin from "./components/LayoutAdmin.jsx";
import CategoryMain from "./components/Admin/Router/CategoryMain.jsx";
import Vacxinlist from "./components/post/Vacxinlist.jsx";
import ListVaccines from "./pages/ListVaccines.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import EditPost from "./components/Admin/Controller/EditPost.jsx";

import PriceList from "./pages/PriceList.jsx";

const router = createBrowserRouter([
  {
    element: <Layoutmain></Layoutmain>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/RegisterVaccination",
        element: <RegisterVaccination></RegisterVaccination>,
      },
      {
        path: "/calendar",
        element: <Calendar></Calendar>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword></ResetPassword>,
      },
      {
        path: "/history",
        element: <History></History>,
      },
      {
        path: "/postDetails/:id",
        element: <PostDetail></PostDetail>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/payvaccines",
        element: <PayVaccines></PayVaccines>,
      },
      {
        path: "/vacxindetail/:id",
        element: <VaccinesDetail></VaccinesDetail>,
      },
      {
        path: "/UpdateMain/:id",
        element: <UpdateMain></UpdateMain>,
      },
      {
        path: "/vaccinelist",
        element: <Vacxinlist></Vacxinlist>,
      },
      {
        path: "/listVaccines",
        element: <ListVaccines></ListVaccines>,
      },
      {
        path: "/category/:id",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: "/my-order",
        element: <MyOrder />,
      },
      {
        path: "/priceList",
        element: <PriceList></PriceList>
      }
    ],
  },
  {
    element: <LayoutAdmin></LayoutAdmin>,
    children: [
      {
        path: "/admin",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashBoard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/VaccineManagement",
        element: <Vaccin></Vaccin>,
      },
      {
        path: "/Addvaccin",
        element: <Addvaccin></Addvaccin>,
      },
      {
        path: "/Editvaccin/:id",
        element: <EditVaccin></EditVaccin>,
      },
      {
        path: "/InjectionRegistration",
        element: <InjectionRegistration></InjectionRegistration>,
      },
      {
        path: "/Inventorymanagement",
        element: <Inventorymanagement></Inventorymanagement>,
      },
      {
        path: "/ListSold",
        element: <ListSold></ListSold>,
      },
      {
        path: "/Plan",
        element: <Plan></Plan>,
      },
      {
        path: "/AccountManagement",
        element: <AccountManagement></AccountManagement>,
      },
      {
        path: "/injectionRegistration",
        element: <InjectionRegistration></InjectionRegistration>,
      },
      {
        path: "/information",
        element: <InformationSelled></InformationSelled>,
      },
      {
        path: "/editlistsold/:id",
        element: <EditListSold></EditListSold>,
      },
      {
        path: "/updateinfo/:id",
        element: <UpdateInformation></UpdateInformation>,
      },
      {
        path: "/addCategory",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "/category",
        element: <CategoryMain></CategoryMain>,
      },
      {
        path: "/CategoryPostManagement",
        element: <CategoryPostManagement></CategoryPostManagement>,
      },
      {
        path: "/addCategoryPost",
        element: <AddCategoryPost></AddCategoryPost>,
      },
      {
        path: "/addplan",
        element: <AddPlan></AddPlan>,
      },
      {
        path: "/mess",
        element: <Message></Message>,
      },
      {
        path: "/otherManagement",
        element: <OtherManagement></OtherManagement>,
      },
      {
        path: "/commentManagement",
        element: <CommentManagement></CommentManagement>,
      },
      {
        path: "/postManagement",
        element: <PostManagement></PostManagement>,
      },
      {
        path: "/addPost",
        element: <AddPost></AddPost>,
      },
      {
       path:"/EditPost/:id",
       element:<EditPost></EditPost>
      },
      {
        path: "/otherdetails/:id",
        element: <OtherDetails></OtherDetails>,
      },
      {
        path: "/messToPhone",
        element: <MessageToPhone></MessageToPhone>,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn></SignIn>,
  },
  {
    path: "/register",
    element: <SignUp></SignUp>,
  },
  
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
