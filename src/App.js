// App.js
import React from "react";
import DigimonSearch from "./DigimonSearch";
import logo from "./digimon-logo.png";

function App() {
	return (
		<div className="App">
			<img src={logo} alt="Logo" />
			<DigimonSearch />
		</div>
	);
}

export default App;
