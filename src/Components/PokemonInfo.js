import React, { useEffect, useState } from 'react';

export function PokemonInfo(props) {
     const [pokemonType, setPokemonType] = useState("");
     const [pokemonEvolution, setPokemonEvolution] = useState("");
     const [pokemonFinalEvolution, setPokemonFinalEvolution] = useState("");
     const [mainSpecie, setMainSpecie] = useState("");
     const [EvoPic, setEvoPic] = useState("");
     const [finalEvoPic, setFinalEvoPic] = useState("");
     const [mainPic, setMainPic] = useState("");

     const [isLoading, setIsLoading] = useState(false);

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

     useEffect(() => {
          async function getEvolution() {
               try {         
                    setIsLoading(true);           
                    // remainder
                    let id = props.id % 3;
                    if (id % 3 !== 0) {
                         id = Math.ceil(props.id/3);
                    } else {
                         id = props.id / 3;
                    }
                    const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${(id)}/`, {
                         method: "GET",
                         headers: {
                              "Content-Type": "application/json"
                         }
                    });
                    const data = await response.json();
                    // set a localstorage cache
                    localStorage.setItem("evolution_data", JSON.stringify(data));
                    setMainSpecie(data.chain.species.name);
                    setPokemonEvolution(data.chain.evolves_to[0].species.name);
                    setPokemonFinalEvolution(data.chain.evolves_to[0].evolves_to[0].species.name);  
                    setTimeout(() => {
                         setIsLoading(false);
                    }, 1500);                  
               } catch (error) {
                    console.error(error)
               }
          }
          getEvolution(); 
     }, [props.id]);

     useEffect(() => {
          async function getEvolve(pokemon) {
               if (pokemonEvolution !== "" && pokemonFinalEvolution !== "") {
                    try {
                         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
                              method: "GET",
                              headers: {
                                   "Content-Type": "application/json"
                              }
                         });
                         const data = await response.json();
                         // set a localstorage cache
                         return data;
                    } catch (error) {
                         console.error(error);
                    }
               } else {
                    console.log("No evolution");
               }
          }
          
          if (pokemonEvolution !== "" && pokemonFinalEvolution !== "") {
               async function poke() {
                    let evo1 = await getEvolve(pokemonEvolution);
                    let evo2 = await getEvolve(pokemonFinalEvolution);
                    let mainEvo = await getEvolve(mainSpecie);
                    if (evo1 !== "" && evo2 !== "") {
                         setEvoPic(evo1.sprites.other["official-artwork"].front_default);
                         setFinalEvoPic(evo2.sprites.other["official-artwork"].front_default);
                         setMainPic(mainEvo.sprites.other["official-artwork"].front_default)
                    }
               }
               poke();
          }
     }, [pokemonEvolution, pokemonFinalEvolution, mainSpecie]);

     if (isLoading) {
          return (
               <div className="loading"></div>
          )
     }

     return (
          <div className="info-wrapper" >
               <div className={ `title ${pokemonType}` }>
                    <div className="back-arrow" onClick={() => props.toggler()}>
                         <div className="arrow">&#8592;</div>
                    </div>
                    <h1 >{ props.name }</h1>
               </div>

               <div className="info-container">
                    <div className="info-panel">
                         <div className="header">
                              <p>ID</p>
                              <p>Weight</p>
                              <p>Height</p>
                              <p>Abilities</p>
                              <p>Types</p>
                         </div>
                         <div className="info">
                              <p>#{ props.id }</p>
                              <p>{ Math.round((props.weight / 10) * 2.2) }kg { Math.round(props.weight / 10) }lb</p>
                              <p>{ props.height / 10 } m</p>
                              <p className={`move ${pokemonType}`}>{ props.move_1 }</p>
                              <div style={{ display: "flex", gap: 15}}>
                                   <p className={`type ${pokemonType}`} >{ props.type }</p>
                                   {
                                        props.second_type.length > 1 &&
                                        <p className={ `type ${pokemonType}` } >{ props.second_type[1].type.name }</p>
                                   }
                              </div>
                              
                         </div>
                    </div>
                    <div className="img-panel">
                         <img src={ props.img } alt={ `${props.name}` } />
                    </div>
                    <div className="move-panel">
                         <div className="header">
                              <div>HP</div>
                              <div>Attack</div>
                              <div>Defence</div>
                              <div>Speed</div>
                              <div>Special Attack</div>
                              <div>Special Defense</div>
                         </div>
                         <div className="info">
                              <div className={ `${pokemonType} shadow` } style={{ width: `${props.health}%` }}>{ props.health }</div>
                              <div className={ `${pokemonType} shadow` } style={{ width: `${props.attack}%` }}>{ props.attack }</div>
                              <div className={ `${pokemonType} shadow` } style={{ width: `${props.defense}%` }}>{ props.defense }</div>
                              <div className={ `${pokemonType} shadow` } style={{ width: `${props.speed}%` }}>{ props.speed }</div>
                              <div className={ `${pokemonType} shadow` } style={{ width: `${props.sp_a}%` }}>{ props.sp_a }</div>
                              <div className={ `${pokemonType} shadow` } style={{ width: `${props.sp_d}%` }}>{ props.sp_d }</div>
                         </div>
                    </div>
               </div>
               <div className="evolution-container">
                    <h1 className={ `title ${pokemonType}` }>Evolution Chain</h1>
                    {
                         (EvoPic !== "" && mainPic !== "" && finalEvoPic !== "") && (
                              <div className="evolution-grid">
                                   <div className="evolution-grid-cell">
                                        <img src={ mainPic } alt={ mainPic } />
                                        <h3 className={ `name ${pokemonType}` }>{ mainSpecie }</h3>
                                   </div>
                                   <div className="evolution-grid-cell arrow">&#8594;</div>
                                   <div className="evolution-grid-cell">
                                        <img src={ EvoPic } alt={ EvoPic } />
                                        <h3 className={ `name ${pokemonType}` }>{ pokemonEvolution }</h3>
                                   </div>
                                   <div className="evolution-grid-cell arrow">&#8594;</div>
                                   <div className="evolution-grid-cell">
                                        <img src={ finalEvoPic } alt={ finalEvoPic } />
                                        <h3 className={ `name ${pokemonType}` }>{ pokemonFinalEvolution }</h3>
                                   </div>
                              </div>
                         )
                    }
                    
               </div>
          </div>
     )
}
