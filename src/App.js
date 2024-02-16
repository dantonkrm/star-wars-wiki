import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import PeopleList from "./Components/PeopleList/PeopleList";
import StarshipsList from "./Components/StarshipsList/StarshipsList";
import PlanetsList from "./Components/PlanetsList/PlanetsList";
import PeopleInfo from "./Components/PeopleInfo/PeopleInfo";
import PlanetsInfo from "./Components/PlanetsInfo/PlanetsInfo";
import StarshipsInfo from "./Components/StarshipsInfo/StarshipsInfo";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/peoples" element={<PeopleList />} />
				<Route path="/peoples/:id" element={<PeopleInfo />} />
				<Route path="/starships" element={<StarshipsList />} />
				<Route path="/starships/:id" element={<StarshipsInfo />} />
				<Route path="/planets" element={<PlanetsList />} />
				<Route path="/planets/:id" element={<PlanetsInfo />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
