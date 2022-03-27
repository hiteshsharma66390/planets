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
    let isSearchQuery = false;
    let url = `http://localhost:3000/planets`;
    if (searchQuery.length > 0) {
      isSearchQuery = true;
      queryString = `?q=${searchQuery}`;
    }
    Object.keys(filterState).forEach((filterKeyName) => {
      const tempList = filterState[filterKeyName.toLowerCase()];

      if (filterState[filterKeyName].length > 0) {
        if (isSearchQuery) {
          queryString += `&${filterKeyName
            .toLowerCase()
            .slice(0, filterKeyName.length - 1)}=`;
          isSearchQuery = false;
        } else {
          queryString += `?${filterKeyName
            .toLowerCase()
            .slice(0, filterKeyName.length - 1)}=`;
        }
      }
      tempList.forEach((filterKeyValue, index) => {
        if (index > 0) queryString += "|" + filterKeyValue;
        else queryString += filterKeyValue;
      });
    });

    if (queryString.length > 0) {
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

  // useEffect(() => {
  //   const { search } = window.location;
  //   const queryStringList = search.replace("?", "").split("&");
  //   queryStringList.forEach((query) => {
  //     const queryList = query.split("=");
  //     const queryName = queryList[0];
  //     const queryValue = queryList[1];
  //     if (queryName === "query") setSearchQuery(queryValue);
  //     if (queryName === "color") {
  //       const colorList = queryValue.split("|");
  //       setFilters((prevState) => ({
  //         ...prevState,
  //         ["color"]: colorList,
  //       }));
  //     }
  //     if (queryName === "shape") {
  //       const shapeList = queryValue.split("|");
  //       setFilters((prevState) => ({
  //         ...prevState,
  //         ["shape"]: shapeList,
  //       }));
  //     }
  //     if (queryName === "size") {
  //       const sizeList = queryValue.split("|");
  //       setFilters((prevState) => ({
  //         ...prevState,
  //         ["size"]: sizeList,
  //       }));
  //     }
  //   });
  // }, [planetList]);

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
                <div className="filter">
                  <label htmlFor="color" className="text-capitalize">
                    {filterName}
                  </label>
                  {allFilters[filterName]?.map((filterValue) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id={filterValue.id}
                          data-filterType={filterName}
                          name={filterValue.name}
                          onChange={(e) => updateFilter(e)}
                        />
                        <label
                          className="form-check-label text-capitalize"
                          for="flexCheckDefault"
                        >
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
