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
  const [filter, setFilter] = useState({});
  const [planetList, setPlanetList] = useState([]);
  const getPlanetList = (searchQuery) => {
    const url = `http://localhost:3000/planets?q=${searchQuery}`;
    const { pathname } = window.location;
    window.history.replaceState({}, "", `?query=${searchQuery}`);
    axios.get(url).then((res) => {
      console.log(res.data);
      setPlanetList(res.data);
    });
  };
  const searchPlanets = (event) => {
    // if (event.key === "Enter") {
    //   getPlanetList(searchQuery);
    // }

    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const { search } = window.location;
    const queryKeyList = search.replace("?", "").split("&");
    console.log(queryKeyList);
  }, [searchQuery, planetList]);

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
              console.log(filterName);
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
                        Tenetur, recusandae alias? Necessitatibus provident,
                        beatae nesciunt deserunt eveniet iure perspiciatis,
                        facere ratione at magni blanditiis id saepe dolorum,
                        aspernatur maiores reprehenderit.
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
