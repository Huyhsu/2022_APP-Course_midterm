import {
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_ITEM,
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

export const removeItem = (item) => (dispatch) => {
  dispatch({
    type: REMOVE_ITEM,
    payload: item,
  });
};
// 傳入更新後的 item 以及要修改的目標 item inedex，以更新 itemList 中的特定 item
export const updateItem = (updatedItem, itemIndex) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM,
    payload: { updatedItem, itemIndex },
  });
};
