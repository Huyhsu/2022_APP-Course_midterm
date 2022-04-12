import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  SET_EDIT_ITEM,
  UPDATE_EDIT_ITEM_TITLE,
  UPDATE_EDIT_ITEM_NOTE,
  UPDATE_EDIT_ITEM_TIME,
  UPDATE_EDIT_ITEM_CATEGORY,
  UPDATE_EDIT_ITEM_DIVIDE,
} from "../constants";

const initialState = {
  // item template
  item: {
    title: "",
    note: "",
    time: "",
    category: "",
    divide: "",
    done: "",
    compareTime: "",
  },
  itemList: {
    items: [],
  },
  categoryList: {
    categorys: [],
  },
  currentEditItem: {
    title: "",
    note: "",
    time: "",
    category: "",
    divide: "",
    done: "",
    compareTime: "",
  },
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItem = action.payload;
      const newItems = [...state.itemList.items, newItem];
      return { ...state, itemList: { ...state.itemList, items: newItems } };
    case ADD_CATEGORY:
      const newCategory = action.payload;
      const newCategorys = [...state.categoryList.categorys, newCategory];
      return {
        ...state,
        categoryList: { ...state.categoryList, categorys: newCategorys },
      };
    case UPDATE_ITEM:
      const updatedItem = action.payload.updatedItem;
      const itemIndex = action.payload.itemIndex;
      const currentItems = [...state.itemList.items];
      currentItems[itemIndex] = updatedItem;
      const updatedItems = [...currentItems];
      return {
        ...state,
        itemList: { ...state.itemList, items: updatedItems },
      };
    case SET_EDIT_ITEM:
      const shouldEditItem = action.payload;
      return {
        ...state,
        currentEditItem: { ...shouldEditItem },
      };
    case UPDATE_EDIT_ITEM_TITLE:
      const shouldEditItemTitle = action.payload;
      return {
        ...state,
        currentEditItem: {
          ...state.currentEditItem,
          title: shouldEditItemTitle,
        },
      };
    case UPDATE_EDIT_ITEM_NOTE:
      const shouldEditItemNote = action.payload;
      return {
        ...state,
        currentEditItem: { ...state.currentEditItem, note: shouldEditItemNote },
      };
    case UPDATE_EDIT_ITEM_TIME:
      const shouldEditItemTime = action.payload;
      return {
        ...state,
        currentEditItem: { ...state.currentEditItem, time: shouldEditItemTime },
      };
    case UPDATE_EDIT_ITEM_CATEGORY:
      const shouldEditItemCategory = action.payload;
      return {
        ...state,
        currentEditItem: {
          ...state.currentEditItem,
          category: shouldEditItemCategory,
        },
      };
    case UPDATE_EDIT_ITEM_DIVIDE:
      const shouldEditItemDivide = action.payload;
      return {
        ...state,
        currentEditItem: {
          ...state.currentEditItem,
          divide: shouldEditItemDivide,
        },
      };
    default:
      return state;
  }
};
