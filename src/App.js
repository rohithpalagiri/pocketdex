import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Home from './components/Home'
import Grid from '@material-ui/core/Grid';
import PokedexEntry from './components/PokedexEntry'
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: '1440px',
    margin: '0 auto',
  },
});

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(100);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${count}`);
      setPokemonList(response.data.results)
      return response;
    };

    fetchData();
  }, []);

  const fetchMorePokemon = async () => {
    setCount(count + 50)
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${count}&offset=${count}`
    console.log("This is the url: ", url)
    let response = await axios.get(url);
    if(response.data.results){
      let newPokemon = response.data.results;
      //Tried to use spread syntax but it did not work?
      //setPokemonList([...pokemonList, newPokemon])
      setPokemonList(pokemonList.concat(newPokemon))
    }
    
    return
  }

  return (
    <Grid className="pocketdex-wrapper" container className={classes.root}>
      <Router>
        <Switch>
          <Route path="/pokedex/:id">
            <PokedexEntry pokemonList={pokemonList} />
          </Route>
          <Route path="/">
            <Home fetchMorePokemon={fetchMorePokemon} pokemonList={pokemonList} />
          </Route>
        </Switch>

      </Router>
    </Grid>
  );
}

export default App;
