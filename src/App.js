import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Home from './components/Home'
import Grid from '@material-ui/core/Grid';
import PokemonTile from './components/PokemonTile';
import PokedexEntry from './components/PokedexEntry'
import { useSelector, useDispatch } from 'react-redux'

import axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  // const count = useSelector(state => state)

  // console.log("This is the count: ", count);
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=100');
      setPokemonList(response.data.results)
      return response;
    };

    fetchData();
  }, []);

  return (
    <Grid container>
      <Router>

        <Switch>
          <Route path="/pokedex/:id">
            <PokedexEntry pokemonList={pokemonList} />
          </Route>
          <Route path="/">
            <Home pokemonList={pokemonList} />
          </Route>
        </Switch>

      </Router>
    </Grid>
  );
}

export default App;
