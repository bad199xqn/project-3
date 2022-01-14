// Chỉ cho update redux khi state thay đổi
import { createSelector } from 'reselect'

// *** đây là 'selector' của mình
const selectGetUsers = (state) => state

// *** function sẽ là một 'selector' thay thế cho 'selector' selectGetUsers
export const getUsersSelector = createSelector(
    // *** chuyền 'selector' ở trên vào method 'createSelector'
    selectGetUsers,
    // *** callback function hoạt động với cơ chế hoạt động
    //     như mình giới thiệu ở trên thay cho 'selector' selectGetUsers
    users => users
);