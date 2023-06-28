import "./App.css";
import CitySearch from "./components/CitySearch";
import CountrySearch from "./components/CountrySearch";

function App() {
  return (
    <div>
      <div className="mt-100">
        <CountrySearch />
      </div>

      <div>
        <CitySearch />
      </div>
    </div>
  );
}

export default App;
