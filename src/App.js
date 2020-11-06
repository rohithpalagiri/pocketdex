import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
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
    const fetchData = async () => {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${count}`);
      setPokemonList(response.data.results)
      setinitialPokemonList(response.data.results)
      return response;
    };

    fetchData();
  }, []);

  const fetchMorePokemon = async () => {
    setCount(count + 100)
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=100&offset=${count}`
    console.log("This is the url: ", url)
    console.log("This is the count: ", count)
    let response = await axios.get(url);
    if (response.data.results) {
      let newPokemon = response.data.results;
      //Tried to use spread syntax but it did not work?
      //setPokemonList([...pokemonList, newPokemon])
      setPokemonList(pokemonList.concat(newPokemon))
    }

    return
  }


  const filterPokemon = (e) => {
    let value = e.target.value;
    console.log(value)
    if (value) {
      let filterPokemon = FullPokemonList.filter((x) => x.name.includes(value))
      setPokemonList(filterPokemon)
    } else {
      setPokemonList(initialPokemonList)
    }
    console.log("These are the filtered pokemon: ", filterPokemon)
  }

  return (
    <>
      <MenuBar filterPokemon={filterPokemon} />
      <Grid container className={classes.root}>
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
    </>
  );
}

export default App;
