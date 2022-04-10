import {
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
} from "../constants";

// ------- Item
// 添加 item 到 itemList
export const addItem = (item) => (dispatch) => {
  dispatch({
    type: ADD_ITEM,
    payload: item,
  });
};
// 添加 category 到 categoryList
export const addCategory = (category) => (dispatch) => {
  dispatch({
    type: ADD_CATEGORY,
    payload: category,
  });
};
