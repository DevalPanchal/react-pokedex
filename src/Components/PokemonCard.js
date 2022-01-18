import React, { useEffect, useState } from 'react';

export function PokemonCard(props) {
     const [pokemonType, setPokemonType] = useState("");

     useEffect(() => {
          switch (props.type) {
               case "grass":
                    setPokemonType("grass");
                    break;
               case "fire":
                    setPokemonType("red");
                    break;
               case "water":
                    setPokemonType("blue");
                    break;
               case "bug":
                    setPokemonType("bug");
                    break;
               case "normal":
                    setPokemonType("normal");
                    break;
               default:
                    break;
          }
     }, [pokemonType, props.type]);

     return (
          <div className={ `grid-card ${pokemonType}` } onClick={() => props.getPokemon() }>
               <img src={ props.img } alt={ `${props.img}` } />
               <h2>{ props.name }</h2>
               <div className="type-container">
                    <p className="type">{ props.type }</p>
                    {
                         props.second_type.length > 1 && 
                         <p className="type">{ props.second_type[1].type.name }</p>
                    }
               </div>
               <div className="stats-wrapper">
                    <p>HP { props.health }</p>
                    <p>ATK { props.attack }</p>
                    <p>DEF { props.defense }</p>
                    <p>SPD { props.speed }</p>
               </div>
          </div>
     )
}
