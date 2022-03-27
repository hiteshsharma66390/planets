const Types = {
  FILTER_BY_COLORS: "FILTER_BY_COLORS",
  UPDATE_FILTERS: "SET_FILTERS",
};

const updateFilters = (filter) => {
  return {
    type: Types.UPDATE_FILTERS,
    payload: filter.payload,
  };
};

const obj = {
  updateFilters,
  Types,
};

export default obj;
