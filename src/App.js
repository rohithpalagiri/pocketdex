import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import userService from './services/pokemon'
import { makeStyles } from '@material-ui/core/styles';
import Home from './components/Home'
import Grid from '@material-ui/core/Grid';
import PokedexEntry from './components/PokedexEntry'
import MenuBar from './components/MenuBar'
import FullPokemonList from './fullpokemonList.json'
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '1440px',
    margin: '0 auto',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '15px',
      paddingRight: '15px',
    },
  },
}));

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [initialPokemonList, setinitialPokemonList] = useState([])
  const [count, setCount] = useState(100);

  const classes = useStyles();

  useEffect(() => {

    (async () => {
      await userService.getAll().then((response) => {
        console.log("this is the response: ", response)
        setPokemonList(response)
        setinitialPokemonList(response)
      })
    })();

  }, []);

  const fetchMorePokemon = async () => {
    setCount(count + 100)
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=100&offset=${count}`
    let response = await axios.get(url);
    if (response.data.results) {
      let newPokemon = response.data.results;
      setPokemonList(pokemonList.concat(newPokemon))
    }
    return
  }

  const filterPokemon = (e) => {
    let value = e.target.value;
    if (value) {
      let filterPokemon = FullPokemonList.filter((x) => x.name.includes(value))
      setPokemonList(filterPokemon)
    } else {
      setPokemonList(initialPokemonList)
    }
  }

  return (
    <>
      <Router>
        <MenuBar filterPokemon={filterPokemon} />
        <Grid container className={classes.root}>
          <Switch>
            <Route path="/pokedex/:id">
              <PokedexEntry />
            </Route>
            <Route path="/">
              <Home fetchMorePokemon={fetchMorePokemon} pokemonList={pokemonList} />
            </Route>
          </Switch>
        </Grid>
      </Router>
    </>
  );
}

export default App;
