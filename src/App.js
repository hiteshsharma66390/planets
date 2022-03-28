import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ACTIONS from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import categoriesArray from "./utility/constant";

function App() {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state);
  const [searchQuery, setSearchQuery] = useState("");
  const [allFilters, setAllFilters] = useState({});
  const [planetList, setPlanetList] = useState([]);

  const getPlanetList = () => {
    let queryString = "";
    let url = `http://localhost:3000/planets`;
    const filterArr = [];
    if (searchQuery.length > 0) {
      filterArr.push(`q=${searchQuery}`);
    }
    Object.keys(filterState).forEach((filterKeyName) => {
      const tempList = filterState[filterKeyName.toLowerCase()];
      if (tempList.length > 0) {
        filterArr.push(
          `${filterKeyName
            .toLowerCase()
            .slice(0, filterKeyName.length - 1)}=${tempList?.join("|")}`
        );
      }
    });
    queryString = `?${filterArr.join("&")}`;
    if (queryString.length > 0) {
      // const { history } = window.location;
      window.history.replaceState({}, "", queryString);
      axios.get(url + queryString).then((res) => {
        setPlanetList(res.data);
      });
    }
  };

  const getFilterList = (filterType) => {
    const url = `http://localhost:3000/${filterType}`;
    axios.get(url).then((res) => {
      setAllFilters((prevState) => ({
        ...prevState,
        [filterType]: res.data,
      }));
    });
  };
  const searchPlanets = (event) => {
    setSearchQuery(event.target.value);
  };

  const updateFilter = (e) => {
    const checkBox = e.target;
    const checkBoxFilterType = checkBox
      .getAttribute("data-filterType")
      .toLowerCase();
    const checkBoxId = checkBox.id;
    dispatch(
      ACTIONS.updateFilters({
        type: "SET_FILTERS",
        payload: {
          isChecked: checkBox.checked,
          checkboxFilterType: checkBoxFilterType,
          checkboxFilterId: checkBoxId,
        },
      })
    );
  };

  useEffect(() => {
    const { search } = window.location;
    const queryStringList = search.replace("?", "").split("&");
    queryStringList?.forEach((queryElem) => {
      const queryElemList = queryElem.split("=");
      if (queryElemList[0] === "q") setSearchQuery(queryElemList[1]);
      else if (
        queryElemList[0] === "color" ||
        queryElemList[0] === "shape" ||
        queryElemList[0] === "size"
      ) {
        queryElemList[1].split("|").forEach((queryElemListValue) => {
          dispatch(
            ACTIONS.updateFilters({
              type: "SET_FILTERS",
              payload: {
                isChecked: true,
                checkboxFilterType: `${queryElemList[0]}s`,
                checkboxFilterId: queryElemListValue,
              },
            })
          );
        });
      }
    });
  }, []);

  useEffect(() => {
    getPlanetList();
  }, [filterState]);

  useEffect(() => {
    categoriesArray.forEach((element) => {
      getFilterList(element);
    });
  }, []);
  return (
    <div className="App">
      <div className="container">
        <div className="form-group search-wrapper displayFlex">
          <input
            type="text"
            className="search-input"
            id="planet-name"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => searchPlanets(e)}
            onKeyPress={(e) => e.key === "Enter" && getPlanetList()}
          />
          <div
            className="search-button displayFlex"
            onClick={() => getPlanetList()}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <div className="main-wrapper full-width displayFlex">
          <div className="filter-wrapper">
            {Object.keys(allFilters).map((filterName) => {
              return (
                <div className="filter" key={filterName}>
                  <label htmlFor="color" className="text-capitalize">
                    {filterName}
                  </label>
                  {allFilters[filterName]?.map((filterValue) => {
                    // const filterNamePlural = `${filterName}s`;
                    return (
                      <div className="form-check" key={filterValue.name}>
                        <label
                          className="form-check-label text-capitalize"
                          for="flexCheckDefault"
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={filterValue.id}
                            data-filterType={filterName}
                            name={filterValue.name}
                            checked={
                              filterState[filterName]?.findIndex((item) => {
                                return item === filterValue.id;
                              }) !== -1
                            }
                            onChange={(e) => updateFilter(e)}
                          />
                          {filterValue.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="planets-wrapper">
            <ul>
              {planetList.map((planet) => {
                return (
                  <div key={planet.id} className="planet-card">
                    <div className="card-body">
                      <h5 className="card-title">{planet.name}</h5>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
