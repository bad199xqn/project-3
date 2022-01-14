import { all } from 'redux-saga/effects';

//public

import AuthSaga from './auth/login/saga';
import RegisterSaga from './auth/register/saga';
import ForgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';
import ArticleMostReadSaga from './trend/articleMostRead/saga';
import TrendingKeywordSaga from './trend/trendingKeyword/saga';
import NewArticleSaga from './trend/newArticle/saga';
import DailySourceStatisticsSaga from './trend/dailySourceStatistics/saga';
import UserBookmarks from './bookmarks/saga';
import NotificationSaga from './notifications/saga';
import AlertsSaga from './alerts/saga';
import SearchingSaga from './trend/searching/saga';


export default function* rootSaga() {
    yield all([
        //public
        AuthSaga(),
        ForgetSaga(),
        LayoutSaga(),
        ArticleMostReadSaga(),
        TrendingKeywordSaga(),
        NewArticleSaga(),
        DailySourceStatisticsSaga(),
        UserBookmarks(),
        NotificationSaga(),
        AlertsSaga(),
        SearchingSaga(),
        RegisterSaga(),
    ])
}