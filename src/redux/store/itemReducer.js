import { ADD_ITEM, REMOVE_ITEM } from "../constants";

const initialState = {
  item: {
    title: "",
    note: "",
    time: "",
    category: "",
    divide: "",
  },
  itemList: {
    items: [],
    categorys: [],
  },
  // categoryList: {
  //   categorys: [],
  // },
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItem = action.payload;
      const newItems = [...state.itemList.items, newItem];
      return { ...state, itemList: { ...state.itemList, items: newItems } };
    default:
      return state;
  }
};
