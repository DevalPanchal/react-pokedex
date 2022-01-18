import React, { useState, useEffect } from 'react';
import { Pokemon } from './Components/Pokemon';
import './stylesheets/app.css';

function App() {
	const [pokemonData, setPokemonData] = useState([]);
	const [LIMIT] = useState(18);

	useEffect(() => {
		function fetchPokemon() {
			try {
				let promises = [];
				for (let i = 1; i < LIMIT + 1; i++) {
					const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
					promises.push(fetch(url).then(res => res.json()));
				}
				Promise.all(promises)
				.then(results => {
					setPokemonData(results);
				});
			} catch (error) {
				console.error(error.message);
			}
		}
		fetchPokemon();
	}, [LIMIT]);

  	return (
  	  	<div className="container">
			<Pokemon pokemonList={ pokemonData } />
  	  	</div>
  	);
}

export default App;
