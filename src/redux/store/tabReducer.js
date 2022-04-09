import { ADD_TAB, REMOVE_TAB } from "../constants";

const initialState = {
  tab: {
    name: "",
  },
  tabList: {
    tabs: [],
  },
};

export const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TAB:
      const category = action.payload;
      return {
        ...state,
        tabList: { ...state.tabList, tabs: tabs.push(action.payload) },
      };
    default:
      return state;
  }
};
