import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({});
  const [planetList, setPlanetList] = useState([
    {
      id: "fc46c91b-6b00-4cfe-9f06-1a7cc7a7de36",
      name: "Mercury",
      shape: "4aaaf39b-eccb-46d6-b4be-2e72a911c724",
      color: "90f28316-7f0d-4cf2-828e-f0dbbcc110b9",
      size: "3cc158c7-eff6-4152-afa3-50d9487584c3",
    },
    {
      id: "813d3b99-dd05-405f-aed9-692a95fef73c",
      name: "Venus",
      shape: "f77621c4-5ee4-4c0c-9db3-d791a87b85e2",
      color: "7526a44b-32d3-4644-b28d-8eb57e5fada6",
      size: "3cc158c7-eff6-4152-afa3-50d9487584c3",
    },
    {
      id: "73b6fe40-8847-455f-82e8-f69fe2855ff1",
      name: "Earth",
      shape: "4aaaf39b-eccb-46d6-b4be-2e72a911c724",
      color: "fe228419-f7df-49d2-a4cd-43e625b26075",
      size: "3cc158c7-eff6-4152-afa3-50d9487584c3",
    },
    {
      id: "67bfd4d2-cf82-4db9-9152-b65ef69a11e2",
      name: "Mars",
      shape: "f77621c4-5ee4-4c0c-9db3-d791a87b85e2",
      color: "90f28316-7f0d-4cf2-828e-f0dbbcc110b9",
      size: "3cc158c7-eff6-4152-afa3-50d9487584c3",
    },
    {
      id: "2db3e11b-6dac-4340-9ee8-104906087a30",
      name: "Jupitor",
      shape: "4aaaf39b-eccb-46d6-b4be-2e72a911c724",
      color: "90f28316-7f0d-4cf2-828e-f0dbbcc110b9",
      size: "65f33b82-48dc-4265-88cb-f4f467e5acba",
    },
    {
      id: "bb0de079-21f6-4dc5-8df0-8fadd038c3ef",
      name: "Saturn",
      shape: "f77621c4-5ee4-4c0c-9db3-d791a87b85e2",
      color: "fe228419-f7df-49d2-a4cd-43e625b26075",
      size: "65f33b82-48dc-4265-88cb-f4f467e5acba",
    },
    {
      id: "2940509b-251b-4bc9-a974-91130dbec835",
      name: "Uranus",
      shape: "4aaaf39b-eccb-46d6-b4be-2e72a911c724",
      color: "fe228419-f7df-49d2-a4cd-43e625b26075",
      size: "65f33b82-48dc-4265-88cb-f4f467e5acba",
    },
    {
      id: "b35955bd-8dcd-4316-aec4-ae9e065f7d73",
      name: "Neptune",
      shape: "f77621c4-5ee4-4c0c-9db3-d791a87b85e2",
      color: "fe228419-f7df-49d2-a4cd-43e625b26075",
      size: "96d37388-6ca9-4aba-bc2a-dafeb082fbd9",
    },
  ]);
  const getPlanetList = (searchQuery) => {
    const url = `http://localhost:3000/planets?q=${searchQuery}`;
    axios.get(url).then((res) => {
      console.log(res.data);
      setPlanetList(res.data);
    });
  };
  const searchPlanets = (event) => {
    if (event.key === "Enter") {
      getPlanetList(searchQuery);
    }
    setSearchQuery(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="form-group search-wrapper displayFlex">
          <input
            type="text"
            className="search-input"
            id="planet-name"
            placeholder="Search"
            defaultValue={searchQuery}
            onKeyDown={(e) => searchPlanets(e)}
          />
          <div className="search-button displayFlex">
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <div className="main-wrapper full-width displayFlex">
          <div className="filter-wrapper">
            <div className="filter">
              <label htmlFor="color">Color</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="red"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Red
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="blue"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Blue
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="green"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Green
                </label>
              </div>
            </div>
            <div className="filter">
              <label htmlFor="color">Shape</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="small"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Small
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="medium"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Medium
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="large"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Large
                </label>
              </div>
            </div>
            <div className="filter">
              <label htmlFor="color">Size</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="round"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Round
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="oval"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Oval
                </label>
              </div>
            </div>
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
