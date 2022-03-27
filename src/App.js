import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
const FILTERS = {
  COLOR: {
    RED: "red",
    GREEN: "green",
    BLUE: "blue",
  },
  SHAPE: {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large",
  },
  SIZE: {
    ROUND: "round",
    OVAL: "oval",
  },
};
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    color: [],
    shape: [],
    size: [],
  });
  const [planetList, setPlanetList] = useState([]);
  const getPlanetList = (searchQuery) => {
    const url = `http://localhost:3000/planets?q=${searchQuery}`;
    const { pathname } = window.location;
    window.history.replaceState({}, "", `?query=${searchQuery}`);
    axios.get(url).then((res) => {
      setPlanetList(res.data);
    });
  };
  const searchPlanets = (event) => {
    // if (event.key === "Enter") {
    //   getPlanetList(searchQuery);
    // }

    setSearchQuery(event.target.value);
  };

  const updateFilter = (e) => {
    const checkBox = e.target;
    const checkBoxFilterName = checkBox
      .getAttribute("data-filterName")
      .toLowerCase();
    if (checkBox.checked) {
      setFilters((prevState) => ({
        ...prevState,
        [checkBoxFilterName]: [
          ...filters[checkBoxFilterName],
          checkBox.name.toLowerCase(),
        ],
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        [checkBoxFilterName]: filters[checkBoxFilterName].filter(
          (f) => f !== checkBox.name.toLowerCase()
        ),
      }));
    }
  };

  useEffect(() => {
    const { search } = window.location;
    const queryStringList = search.replace("?", "").split("&");
    queryStringList.forEach((query) => {
      const queryList = query.split("=");
      const queryName = queryList[0];
      const queryValue = queryList[1];
      if (queryName === "query") setSearchQuery(queryValue);
      if (queryName === "color") {
        const colorList = queryValue.split("|");
        setFilters((prevState) => ({
          ...prevState,
          ["color"]: colorList,
        }));
      }
      if (queryName === "shape") {
        const shapeList = queryValue.split("|");
        setFilters((prevState) => ({
          ...prevState,
          ["shape"]: shapeList,
        }));
      }
      if (queryName === "size") {
        const sizeList = queryValue.split("|");
        setFilters((prevState) => ({
          ...prevState,
          ["size"]: sizeList,
        }));
      }
    });
  }, [planetList]);

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
            onClick={() => getPlanetList(searchQuery)}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <div className="main-wrapper full-width displayFlex">
          <div className="filter-wrapper">
            {Object.keys(FILTERS).map((filterName) => {
              return (
                <div className="filter">
                  <label htmlFor="color" className="text-capitalize">
                    {filterName}
                  </label>
                  {Object.keys(FILTERS[filterName]).map((filterValue) => {
                    return (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="green"
                          data-filterName={filterName}
                          name={filterValue}
                          onChange={(e) => updateFilter(e)}
                        />
                        <label
                          className="form-check-label text-capitalize"
                          for="flexCheckDefault"
                        >
                          {FILTERS[filterName][filterValue]}
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
