import Actions from "./actions";

const updateFilterReducer = (state, action) => {
  switch (action.type) {
    case Actions.Types.UPDATE_FILTERS: {
      let item = action.payload;
      let newState = {};
      if (item.isChecked) {
        newState = {
          ...state,
          [item.checkboxFilterType]: [
            ...state[item.checkboxFilterType],
            item.checkboxFilterId,
          ],
        };
      } else {
        newState = {
          ...state,
          [item.checkboxFilterType]: state[item.checkboxFilterType].filter(
            (elem) => elem !== item.checkboxFilterId
          ),
        };
      }
      return newState;
    }
    default:
      return state;
  }
};

export default updateFilterReducer;
