import { ADD_ITEM, REMOVE_ITEM, ADD_TAB, REMOVE_TAB } from "../constants";

// ------- Item
// 添加 item 到 itemList
export const addItem = (item) => (dispatch) => {
  dispatch({
    type: ADD_ITEM,
    payload: item,
  });
};

// ------- Tab
export const addTab = (category) => (dispatch) => {
  dispatch({
    type: ADD_TAB,
    payload: category,
  });
};
