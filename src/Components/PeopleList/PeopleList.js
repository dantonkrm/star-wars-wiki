import React, { useEffect, useState } from "react";
import { Button, Input } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "./PeopleList.css";
import LinearProgress from "@mui/joy/LinearProgress";

const PeopleList = () => {
	const [peoples, setPeoples] = useState([]);
	const [filteredPeoples, setFilteredPeoples] = useState([]);
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPeople = async () => {
			if (loading) return;

			setLoading(true);

			const data = await fetch(
				`https://swapi.dev/api/people/?page=${currentPage}`
			);
			const json = await data.json();

			setPeoples(json.results);
			setFilteredPeoples(json.results);
			setTotalPages(Math.ceil(json.count / 10));

			setLoading(false);
		};

		fetchPeople();
	}, [currentPage]);

	const goToPersonDetails = (id) => {
		navigate(`/peoples/${id}`);
	};

	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};

	const goToHome = () => {
		navigate("/");
	};

	const handleSearchChange = (event) => {
		const searchText = event.target.value.toLowerCase();
		const filtered = peoples.filter((person) =>
			person.name.toLowerCase().includes(searchText)
		);
		setFilteredPeoples(filtered);
	};
	if (loading) return <LinearProgress variant="soft" className="loading" />;
	return (
		<div className="people-list-container">
			{/* Titulo */}
			<h2 className="people-list-title">Peoples List</h2>

			{/* Input de busca */}
			<Input
				label="Search People"
				variant="outlined"
				onChange={handleSearchChange}
				sx={{
					marginBottom: "20px",
					"& input": {
						backgroundColor: "#ffffff",
					},
				}}
			/>
			<ul className="people-list">
				{filteredPeoples.map((person, index) => (
					<li key={index} className="people-list-item">
						<Button
							onClick={() =>
								goToPersonDetails(
									person.url.split("/").filter(Boolean).pop()
								)
							}
							size="lg"
							variant="soft"
						>
							{person.name}
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

export default PeopleList;
