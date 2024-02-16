import React, { useEffect, useState } from "react";
import { Button, Input } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "./StarshipsList.css";
import LinearProgress from "@mui/joy/LinearProgress";

const StarshipsList = () => {
	const [starships, setStarships] = useState([]);
	const [filteredStarships, setFilteredStarships] = useState([]);
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchStarships = async () => {
			if (loading) return;

			setLoading(true);

			const data = await fetch(
				`https://swapi.dev/api/starships/?page=${currentPage}`
			);
			const json = await data.json();

			setStarships(json.results);
			setFilteredStarships(json.results);
			setTotalPages(Math.ceil(json.count / 10));

			setLoading(false);
		};

		fetchStarships();
	}, [currentPage]);

	const goToStarshipDetails = (id) => {
		navigate(`/starships/${id}`);
	};

	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};

	const goToHome = () => {
		navigate("/");
	};

	const handleSearchChange = (event) => {
		const searchText = event.target.value.toLowerCase();
		const filtered = starships.filter((starship) =>
			starship.name.toLowerCase().includes(searchText)
		);
		setFilteredStarships(filtered);
	};
	if (loading) return <LinearProgress variant="soft" className="loading" />;
	return (
		<div className="starships-list-container">
			<h2 className="starships-list-title">Starships List</h2>
			<Input
				label="Search Starships"
				variant="outlined"
				onChange={handleSearchChange}
				sx={{
					marginBottom: "20px",
					"& input": {
						backgroundColor: "#ffffff",
					},
				}}
			/>
			<ul className="starships-list">
				{filteredStarships.map((starship, index) => (
					<li key={index} className="starships-list-item">
						<Button
							onClick={() =>
								goToStarshipDetails(
									starship.url
										.split("/")
										.filter(Boolean)
										.pop()
								)
							}
							size="lg"
							variant="soft"
						>
							{starship.name}
						</Button>
					</li>
				))}
			</ul>
			<div className="pagination-container">
				<Pagination
					count={totalPages}
					page={currentPage}
					color="standard"
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

export default StarshipsList;
