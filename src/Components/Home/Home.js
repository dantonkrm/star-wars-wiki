import React from "react";
import Typography from "@mui/joy/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import "./Home.css";

const Home = () => {
	const navigate = useNavigate();
	return (
		<div className="home-container">
			<Typography
				color="black"
				level="h1"
				variant="plain"
				className="home-title"
				sx={{ marginBottom: "60px" }} //margem inferior título
			>
				Welcome to Star Wars Explorer
			</Typography>
			<Button
				onClick={() => navigate("/peoples")}
				size="lg"
				className="home-button"
				sx={{ marginBottom: "25px" }} // margem inferior botões
			>
				Peoples
			</Button>
			<Button
				onClick={() => navigate("/planets")}
				size="lg"
				className="home-button"
				sx={{ marginBottom: "25px" }} //margem inferior botões
			>
				Planets
			</Button>
			<Button
				onClick={() => navigate("/starships")}
				size="lg"
				className="home-button"
			>
				Starships
			</Button>
		</div>
	);
};

export default Home;
