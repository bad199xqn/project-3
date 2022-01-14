import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";


// Dashboard
import Dashboard from "../pages/Dashboard/index";
import ArticlesByDate from "../pages/Dashboard/ArticlesByDate";

//Payment
import Payment from "../pages/Payment/Payment";
import PricingPlans from "../pages/Payment/PricingPlans";
import RecentOperations from "../pages/Payment/RecentOperations";



//Alert
import AlertMentions from "../pages/Alert/AlertMentions";
import AlertCreate from "../pages/Alert/CreateAlert";
import AlertManagement from "../pages/Alert/AlertManagement";
import AlertDetail from "../pages/Alert/AlertDetail";

//Bookmark
import Bookmark from "../pages/Bookmark";

//Search
import SearchKeyword from "../pages/SearchKeyword";

//Trending Keyword
import TrendingKeyword from "../pages/TrendingKeyword";

//Profile
import UserInfo from "../pages/User/UserInfo";

//Summary
import SummaryArticle from "../pages/SummaryArticle";

const authProtectedRoutes = [
  { path: "/userinfo", component: UserInfo },

  { path: "/bookmark", component: Bookmark },

  //Alert
  { path: "/alert-management", component: AlertManagement },
  { path: "/alert-create", component: AlertCreate },

  //Payment
  { path: "/recent-operations", component: RecentOperations },
  { path: "/payment", component: Payment },
  { path: "/pricing-plans", component: PricingPlans },


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/summary-article", component: SummaryArticle },
  { path: "/articles", component: ArticlesByDate },
  { path: "/alert-detail", component: AlertMentions },
  { path: "/trending-keyword", component: TrendingKeyword },
  { path: "/search", component: SearchKeyword },
  { path: "/", component: Dashboard },
  { path: "/logout", component: Logout },
  // { path: "/login", component: Login },
  // { path: "/forget-password", component: ForgetPwd },
  // { path: "/register", component: Register },



];

const auth = [
  { path: "/login", component: Login },
  { path: "/forget-password", component: ForgetPwd },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes, auth };
