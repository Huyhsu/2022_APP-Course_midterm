import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_ITEM,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
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
  },
  itemList: {
    items: [],
  },
  categoryList: {
    categorys: [],
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
    default:
      return state;
  }
};
