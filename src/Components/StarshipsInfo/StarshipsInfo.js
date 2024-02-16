import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StarshipsInfo.css";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/joy/LinearProgress";

const StarshipsInfo = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [starship, setStarship] = useState(null);
	const [pilots, setPilots] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchStarship = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://swapi.dev/api/starships/${id}/`
				);
				const data = await response.json();
				setStarship(data);

				const pilotsData = await Promise.all(
					data.pilots.map(async (url) => {
						const response = await fetch(url);
						return response.json();
					})
				);
				setLoading(false);
				console.log(pilotsData);
				setPilots(pilotsData);
			} catch (error) {
				console.error("Error fetching starship:", error);
			}
		};

		fetchStarship();
	}, [id]);

	const goToHome = () => {
		navigate("/");
	};
	if (loading) return <LinearProgress variant="soft" className="loading" />;
	return (
		<div className="starships-info-container">
			{starship ? (
				<>
					<h2 className="starships-info-title">Starship Info</h2>
					<ul className="starships-info-list">
						<li className="starships-info-item">
							<strong className="label">Name:</strong>{" "}
							{starship.name}
						</li>
						<li className="starships-info-item">
							<strong className="label">Model:</strong>{" "}
							{starship.model}
						</li>
						<li className="starships-info-item">
							<strong className="label">Manufacturer:</strong>{" "}
							{starship.manufacturer}
						</li>
						<li className="starships-info-item">
							<strong className="label">Length:</strong>{" "}
							{starship.length}
						</li>
						<li className="starships-info-item">
							<strong className="label">
								Max Atmosphering Speed:
							</strong>{" "}
							{starship.max_atmosphering_speed}
						</li>
						<li className="starships-info-item">
							<strong className="label">Crew:</strong>{" "}
							{starship.crew}
						</li>
						<li className="starships-info-item">
							<strong className="label">Passengers:</strong>{" "}
							{starship.passengers}
						</li>
						<li className="starships-info-item">
							<strong className="label">Cargo Capacity:</strong>{" "}
							{starship.cargo_capacity}
						</li>
						<li className="starships-info-item">
							<strong className="label">Consumables:</strong>{" "}
							{starship.consumables}
						</li>
						<li className="starships-info-item">
							<strong className="label">
								Hyperdrive Rating:
							</strong>{" "}
							{starship.hyperdrive_rating}
						</li>
						<li className="starships-info-item">
							<strong className="label">MGLT:</strong>{" "}
							{starship.MGLT}
						</li>
						<li className="starships-info-item">
							<strong className="label">Starship Class:</strong>{" "}
							{starship.starship_class}
						</li>
						<li className="people-info-item">
							<strong className="label">Pilots: </strong>
							{pilots?.length > 0 ? (
								<ul className="starships-list">
									{pilots.map((pilot, index) => (
										<li
											key={index}
											className="starships-list-item"
										>
											<Link
												to={`/peoples/${pilot?.url
													.split("/")
													.filter(Boolean)
													.pop()}`}
											>
												{pilot.name}
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
				className="starships-button"
				onClick={() => navigate("/starships")}
			>
				Starships List
			</Button>
		</div>
	);
};

export default StarshipsInfo;
