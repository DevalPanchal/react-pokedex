import React, { useState, useEffect } from 'react';
import { Pokemon } from './Components/Pokemon';
import './stylesheets/app.css';

function App() {
	const [pokemonData, setPokemonData] = useState([]);
	const [LIMIT] = useState(18);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		function fetchPokemon() {
			try {
				if (localStorage.pokemonData) {
					setPokemonData(JSON.parse(localStorage.pokemonData));
					// console.log("loaded from localstorage");
				} else {
					setIsLoading(true);
					let promises = [];
					for (let i = 1; i < LIMIT + 1; i++) {
						const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
						promises.push(fetch(url).then(res => res.json()));
					}
					Promise.all(promises)
					.then(results => {
						setPokemonData(results);
						localStorage.setItem("pokemonData", JSON.stringify(results));
					});
					setTimeout(() => {
						setIsLoading(false);
					}, 1000);
				}
			} catch (error) {
				console.error(error.message);
			}
		}
		fetchPokemon();
	}, [LIMIT]);

	if (isLoading) {
		return (
			<div className="loading-container">
				<div className="loading"></div>
			</div>
		)
	}

  	return (
  	  	<div className="container">
			<Pokemon pokemonList={ pokemonData } />
  	  	</div>
  	);
}

export default App;
