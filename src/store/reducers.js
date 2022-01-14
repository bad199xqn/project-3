import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import {userLogin as Login, userDetails as UserDetails} from "./auth/login/reducer";
import Register from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import ArticleMostRead from "./trend/articleMostRead/reducer";
import TrendingKeyword from "./trend/trendingKeyword/reducer";
import NewArticle from "./trend/newArticle/reducer";
import DailySourceStatistics from "./trend/dailySourceStatistics/reducers";
import {userBookmarks as UserBookmarks} from "./bookmarks/reducer";
import {notifications as Notifications} from "./notifications/reducer";
import {alertFolders as AlertFolders, alertMentions as AlertMentions, alertMentionsStatistics as AlertMentionsStatistics} from "./alerts/reducer";
import {searching as Searching, searchingStatistics as SearchingStatistics, keywordDetails as KeywordDetails} from "./trend/searching/reducers";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Register,
  ForgetPassword,
  ArticleMostRead,
  TrendingKeyword,
  NewArticle,
  DailySourceStatistics,
  UserBookmarks,
  Notifications,
  UserDetails,
  AlertFolders,
  Searching,
  SearchingStatistics,
  KeywordDetails,
  AlertMentions,
  AlertMentionsStatistics,
});

export default rootReducer;
