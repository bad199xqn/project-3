import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes";
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions";

//AUTH related methods
import { getFirebaseBackend } from "../../../helpers/authUtils";

const fireBaseBackend = getFirebaseBackend();

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    const response = yield call(fireBaseBackend.forgetPassword, user.email);
    if (response) {
      yield put(
        userForgetPasswordSuccess(
          "Yêu cầu thay đổi mật khẩu đã được xác nhận. Vui lòng kiểm tra trong hộp thư của bạn!"
        )
      );
    }
  } catch (error) {
    yield put(userForgetPasswordError(error));
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
