import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PlanetsInfo.css";
import { Button } from "@mui/joy";
import PeopleList from "../PeopleList/PeopleList";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/joy/LinearProgress";

const PlanetsInfo = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [planet, setPlanet] = useState(null);
	const [residents, setResidents] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPlanet = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://swapi.dev/api/planets/${id}/`
				);
				const data = await response.json();
				setPlanet(data);

				const residentsData = await Promise.all(
					data.residents.map(async (url) => {
						const response = await fetch(url);
						return response.json();
					})
				);
				setLoading(false);
				console.log(residentsData);
				setResidents(residentsData);
			} catch (error) {
				console.error("Error fetching planet:", error);
			}
		};

		fetchPlanet();
	}, [id]);

	const goToHome = () => {
		navigate("/");
	};
	console.log(planet);
	console.log(residents);
	if (loading) return <LinearProgress variant="soft" className="loading" />;
	return (
		<div className="planets-info-container">
			{planet ? (
				<>
					<h2 className="planets-info-title">Planet Info</h2>
					<ul className="planets-info-list">
						<li className="planets-info-item">
							<strong className="label">Name:</strong>{" "}
							{planet.name}
						</li>
						<li className="planets-info-item">
							<strong className="label">Climate:</strong>{" "}
							{planet.climate}
						</li>
						<li className="planets-info-item">
							<strong className="label">Terrain:</strong>{" "}
							{planet.terrain}
						</li>
						<li className="planets-info-item">
							<strong className="label">Diameter:</strong>{" "}
							{planet.diameter}
						</li>
						<li className="planets-info-item">
							<strong className="label">Gravity:</strong>{" "}
							{planet.gravity}
						</li>
						<li className="planets-info-item">
							<strong className="label">Orbital Period:</strong>{" "}
							{planet.orbital_period}
						</li>
						<li className="planets-info-item">
							<strong className="label">Population:</strong>{" "}
							{planet.population}
						</li>
						<li className="planets-info-item">
							<strong className="label">Rotation Period:</strong>{" "}
							{planet.rotation_period}
						</li>
						<li className="planets-info-item">
							<strong className="label">Surface Water:</strong>{" "}
							{planet.surface_water}
						</li>
						<li className="people-info-item">
							<strong className="label">Residents: </strong>
							{residents.length > 0 ? (
								<ul className="people-list">
									{residents.map((resident, index) => (
										<li
											key={index}
											className="people-list-item"
										>
											<Link
												to={`/peoples/${resident?.url
													.split("/")
													.filter(Boolean)
													.pop()}`}
											>
												{resident.name}
											</Link>
										</li>
									))}
								</ul>
							) : (
								" N/a"
							)}
						</li>
					</ul>
				</>
			) : (
				<p>Loading...</p>
			)}
			<Button
				className="home-button"
				onClick={goToHome}
				sx={{ marginBottom: "25px" }}
			>
				Home
			</Button>
			<Button
				className="planets-button"
				onClick={() => navigate("/planets")}
			>
				Planets List
			</Button>
		</div>
	);
};

export default PlanetsInfo;
