import React, { useEffect, useState } from "react";
import { Button, Input } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "./PlanetsList.css";
import LinearProgress from "@mui/joy/LinearProgress";

const PlanetsList = () => {
	const [planets, setPlanets] = useState([]);
	const [filteredPlanets, setFilteredPlanets] = useState([]);
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPlanets = async () => {
			if (loading) return;

			setLoading(true);

			const data = await fetch(
				`https://swapi.dev/api/planets/?page=${currentPage}`
			);
			const json = await data.json();

			setPlanets(json.results);
			setFilteredPlanets(json.results);
			setTotalPages(Math.ceil(json.count / 10));

			setLoading(false);
		};

		fetchPlanets();
	}, [currentPage]);

	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};

	const goToHome = () => {
		navigate("/");
	};

	const handleSearchChange = (event) => {
		const searchText = event.target.value.toLowerCase();
		const filtered = planets.filter((planet) =>
			planet.name.toLowerCase().includes(searchText)
		);
		setFilteredPlanets(filtered);
	};
	if (loading) return <LinearProgress variant="soft" className="loading" />;
	return (
		<div className="planets-list-container">
			<h2 className="planets-list-title">Planets List</h2>
			<Input
				label="Search Planets"
				variant="outlined"
				onChange={handleSearchChange}
				sx={{
					marginBottom: "20px",
					"& input": {
						backgroundColor: "#ffffff",
					},
				}}
			/>
			<ul className="planets-list">
				{filteredPlanets.map((planet, index) => (
					<li key={index} className="planets-list-item">
						<Button
							size="lg"
							variant="soft"
							onClick={() =>
								navigate(
									`/planets/${planet.url
										.split("/")
										.filter(Boolean)
										.pop()}`
								)
							}
						>
							{planet.name}
						</Button>
					</li>
				))}
			</ul>
			<div className="pagination-container">
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					sx={{
						"& .MuiPaginationItem-root": {
							color: "white",
						},
					}}
				/>
			</div>
			<Button className="home-button" onClick={goToHome}>
				Home
			</Button>
		</div>
	);
};

export default PlanetsList;
