import React, { useState } from 'react';
import { PokemonCard } from './PokemonCard';
import { PokemonInfo } from './PokemonInfo';

export function Pokemon(props) {

     const [pokemonSelected, setPokemonSelected] = useState(false);

     const [pokemonName, setPokemonName] = useState("");
     const [pokemonType, setPokemonType] = useState("");
     const [pokemonImg, setPokemonImg] = useState("");
     const [pokemonId, setPokemonId] = useState(0);
     const [pokemonWeight, setPokemonWeight] = useState("");
     const [pokemonHeight, setPokemonHeight] = useState(0);
     const [move1, setMove1] = useState("");

     const [pokemonHealth, setPokemonHealth] = useState(0);
     const [pokemonAttack, setPokemonAttack] = useState(0);
     const [pokemonDefense, setPokemonDefense] = useState(0);
     const [pokemonSpeed, setPokemonSpeed] = useState(0);
     const [pokemonSPA, setPokemonSPA] = useState(0);
     const [pokemonSPD, setPokemonSPD] = useState(0);
     const [secondType, setSecondType] = useState("");

     return (
          <div className="grid-container">
               <h1 className="title">Pokedex</h1>
               {
                    pokemonSelected ? (
                         <PokemonInfo 
                              toggler={() => setPokemonSelected(!pokemonSelected)} 
                              name={ pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) }
                              type={ pokemonType }
                              img={ pokemonImg }
                              move_1={ move1 }
                              id={ pokemonId }
                              weight={ pokemonWeight }
                              health={ pokemonHealth }
                              attack={ pokemonAttack }
                              defense={ pokemonDefense }
                              speed={ pokemonSpeed }
                              sp_a={ pokemonSPA }
                              sp_d={ pokemonSPD }
                              second_type={ secondType }
                              height={ pokemonHeight }
                         />                         
                    ) : (
                         <ul className="grid-cell">
                              {
                                   props.pokemonList &&
                                   props.pokemonList.map((pokemon, index) => (
                                   <PokemonCard 
                                        name={ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) } 
                                        key={ index } 
                                        img={ pokemon.sprites.other["official-artwork"].front_default }
                                        type={ pokemon.types[0].type.name }
                                        second_type={ pokemon.types }
                                        health={ pokemon.stats[0].base_stat }
                                        attack={ pokemon.stats[1].base_stat }
                                        defense={ pokemon.stats[2].base_stat }
                                        speed={ pokemon.stats[5].base_stat }
                                        getPokemon={() => {
                                             setPokemonSelected(!pokemonSelected);
                                             setPokemonName(pokemon.name);
                                             setPokemonType(pokemon.types[0].type.name);
                                             setPokemonImg(pokemon.sprites.other["official-artwork"].front_default);
                                             setPokemonId(pokemon.id)
                                             setPokemonWeight(pokemon.weight)
                                             setMove1(pokemon.abilities[0].ability.name)
                                             setPokemonHealth(pokemon.stats[0].base_stat)
                                             setPokemonAttack(pokemon.stats[1].base_stat)
                                             setPokemonDefense(pokemon.stats[2].base_stat)
                                             setPokemonSpeed(pokemon.stats[5].base_stat)
                                             setPokemonSPA(pokemon.stats[3].base_stat)
                                             setPokemonSPD(pokemon.stats[4].base_stat)
                                             setSecondType(pokemon.types)
                                             setPokemonHeight(pokemon.height)
                                        }}
                                   />
                                   ))
                              }
                         </ul>
                    )
               }
               
          </div>
     )
}
