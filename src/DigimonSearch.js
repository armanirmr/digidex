import axios from "axios";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

const DigimonSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [digimons, setDigimons] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(5); // Número de Digimons por página
	const [perPageOptions] = useState([5, 10, 15]);

	useEffect(() => {
		const fetchData = debounce(async () => {
			try {
				setLoading(true);

				const startIdx = (currentPage - 1) * perPage + 1;
				const requests = Array.from({ length: perPage }, (_, index) =>
					axios.get(`https://digi-api.com/api/v1/digimon/${startIdx + index}`),
				);

				if (searchTerm.trim() === "") {
					const digimonsData = await Promise.all(requests);
					setDigimons(digimonsData.map((res) => res.data));
				} else {
					const response = await axios.get(
						`https://digi-api.com/api/v1/digimon/${searchTerm}`,
					);
					const digimonData = response.data;

					if (Array.isArray(digimonData)) {
						setDigimons(digimonData);
					} else if (digimonData && typeof digimonData === "object") {
						setDigimons([digimonData]);
					} else {
						console.error("Invalid response format");
						setDigimons([]);
					}
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				setDigimons([]);
			} finally {
				setLoading(false);
			}
		}, 300);

		fetchData();
		return () => fetchData.cancel(); // Cancelar el debounce al desmontar el componente
	}, [searchTerm, currentPage, perPage]);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const handlePerPageChange = (event) => {
		const newPerPage = parseInt(event.target.value, 10);
		setPerPage(newPerPage);
		setCurrentPage(1); // Reiniciar a la primera página cuando cambias la cantidad por página
	};

	return (
		<div className="main-wrapper">
			<input
				className="search-input"
				type="text"
				placeholder="Buscar Digimon por nombre"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<div>
				<label htmlFor="perPage">Digimons por página: </label>
				<select id="perPage" value={perPage} onChange={handlePerPageChange}>
					{perPageOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>

			{loading && <p>Cargando...</p>}
			{digimons.length > 0 ? (
				<div className="card-wrapper">
					{digimons.map((digimon) => (
						<div className="digimon-card" key={digimon.id}>
							<div className="digimon-card-header">
								{digimon.images && digimon.images.length > 0 && (
									<img
										className="digimon-img"
										src={digimon.images[0].href}
										alt={digimon.name}
									/>
								)}
								<h2>{digimon.name}</h2>
							</div>
							<div className="digimon-card-content">
								<p>ID: {digimon.id ? digimon.id : null}</p>
								{digimon.types && digimon.types.length > 0 && (
									<p>
										Type: {digimon.types.map((type) => type.type).join(", ")}
									</p>
								)}
								{digimon.attributes && digimon.attributes.length > 0 && (
									<p>
										Attribute:{" "}
										{digimon.attributes
											.map((attribute) => attribute.attribute)
											.join(", ")}
									</p>
								)}
								<h3>Description:</h3>
								{digimon.descriptions && digimon.descriptions.length > 0 ? (
									<p>
										{digimon.descriptions.find(
											(desc) => desc.language === "en_us",
										)?.description || digimon.descriptions[0].description}
									</p>
								) : (
									<p className="no-description">
										No hay descripción disponible.
									</p>
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<p>{!loading ? "No se encontraron Digimons" : ""}</p>
			)}

			<div className="pagination">
				<button
					type="submit"
					className="pagination-button"
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Anterior
				</button>
				<button
					type="submit"
					className="pagination-button"
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={digimons.length < perPage}
				>
					Siguiente
				</button>
			</div>
		</div>
	);
};

export default DigimonSearch;
