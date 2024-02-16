import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PeopleInfo.css";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/joy/LinearProgress";

const PeopleInfo = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [peoples, setPeoples] = useState();
	const [starships, setStarships] = useState([]);
	const [vehicles, setVehicles] = useState([]);
	const [planets, setPlanets] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPeople = async () => {
			setLoading(true);
			const data = await fetch(`https://swapi.dev/api/people/${id}`);
			const json = await data.json();
			setPeoples(json);

			const starshipsData = await Promise.all(
				json.starships.map(async (url) => {
					const response = await fetch(url);
					return response.json();
				})
			);
			setStarships(starshipsData);

			const vehiclesData = await Promise.all(
				json.vehicles.map(async (url) => {
					const response = await fetch(url);
					return response.json();
				})
			);
			setVehicles(vehiclesData);

			const planetsData = async () => {
				const response = await fetch(json.homeworld);
				return response.json();
			};
			setPlanets(await planetsData());
			setLoading(false);
		};
		fetchPeople();
	}, [id]);

	const goToHome = () => {
		navigate("/");
	};

	const goToPeoples = () => {
		navigate("/peoples");
	};
	if (loading) return <LinearProgress variant="soft" className="loading" />;
	return (
		<div className="people-info-container">
			<h2 className="people-info-title">People Info</h2>
			<ul className="people-info-list">
				<li className="people-info-item">
					<strong className="label">Name:</strong> {peoples?.name}
				</li>
				<li className="people-info-item">
					<strong className="label">Birth Year:</strong>{" "}
					{peoples?.birth_year}
				</li>
				<li className="people-info-item">
					<strong className="label">Eye Color:</strong>{" "}
					{peoples?.eye_color}
				</li>
				<li className="people-info-item">
					<strong className="label">Gender:</strong> {peoples?.gender}
				</li>
				<li className="people-info-item">
					<strong className="label">Hair Color:</strong>{" "}
					{peoples?.hair_color}
				</li>
				<li className="people-info-item">
					<strong className="label">Height:</strong> {peoples?.height}
				</li>
				<li className="people-info-item">
					<strong className="label">Mass:</strong> {peoples?.mass}
				</li>
				<li className="people-info-item">
					<strong className="label">Skin Color:</strong>{" "}
					{peoples?.skin_color}
				</li>
				<li className="people-info-item">
					<strong className="label">Homeworld: </strong>
					{/* react router */}
					<Link
						to={`/planets/${planets?.url
							.split("/")
							.filter(Boolean)
							.pop()}`}
					>
						{planets?.name}
					</Link>
				</li>

				<li className="people-info-item">
					<strong className="label">Starships:</strong>
					{starships.length > 0 ? (
						<ul className="starships-list">
							{starships.map((starship, index) => (
								<li key={index} className="starships-list-item">
									<Link
										to={`/starships/${starship?.url
											.split("/")
											.filter(Boolean)
											.pop()}`}
									>
										{starship.name}
									</Link>
								</li>
							))}
						</ul>
					) : (
						" N/a"
					)}
				</li>
				<li className="people-info-item">
					<strong className="label">Vehicles:</strong>
					{vehicles.length > 0 ? (
						<ul className="vehicles-list">
							{vehicles.map((vehicle, index) => (
								<li key={index} className="vehicles-list-item">
									{vehicle.name}
								</li>
							))}
						</ul>
					) : (
						" N/a"
					)}
				</li>
			</ul>
			{}
			<Button
				className="home-button"
				onClick={goToHome}
				sx={{ marginBottom: "25px" }}
			>
				Home
			</Button>
			{}
			<Button className="home-button" onClick={goToPeoples}>
				Peoples
			</Button>
		</div>
	);
};

export default PeopleInfo;
