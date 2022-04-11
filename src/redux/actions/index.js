import {
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_ITEM,
  SET_EDIT_ITEM,
  UPDATE_EDIT_ITEM_TITLE,
  UPDATE_EDIT_ITEM_NOTE,
  UPDATE_EDIT_ITEM_TIME,
  UPDATE_EDIT_ITEM_CATEGORY,
  UPDATE_EDIT_ITEM_DIVIDE,
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
// 要編輯的項目
export const setEditItem = (editItem) => (dispatch) => {
  dispatch({
    type: SET_EDIT_ITEM,
    payload: editItem,
  });
};

export const updateEditItemTitle = (titleText) => (dispatch) => {
  dispatch({
    type: UPDATE_EDIT_ITEM_TITLE,
    payload: titleText,
  });
};

export const updateEditItemNote = (noteText) => (dispatch) => {
  dispatch({
    type: UPDATE_EDIT_ITEM_NOTE,
    payload: noteText,
  });
};

export const updateEditItemTime = (timeText) => (dispatch) => {
  dispatch({
    type: UPDATE_EDIT_ITEM_TIME,
    payload: timeText,
  });
};

export const updateEditItemCategory = (category) => (dispatch) => {
  dispatch({
    type: UPDATE_EDIT_ITEM_CATEGORY,
    payload: category,
  });
};

export const updateEditItemDivide = (divide) => (dispatch) => {
  dispatch({
    type: UPDATE_EDIT_ITEM_DIVIDE,
    payload: divide,
  });
};
