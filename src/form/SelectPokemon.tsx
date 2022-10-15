import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Grid,
  Button,
  Card,
  CardMedia,
  Typography,
  TextField,
  LinearProgress,
  CircularProgress,
  capitalize,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

interface SelectPokemonProps {
  onNext: () => void;
  onBack: () => void;
  setValues: (values: any) => void;
  values: any;
}

export const SelectPokemon: React.FC<SelectPokemonProps> = ({
  onNext = () => {},
  onBack = () => {},
  setValues,
  values,
}) => {
  const debounce = (func: any, timeout = 300) => {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const [pokemonList, setPokemonList] = useState([] as any[]);
  const [searchKeyword, setsearchKeyword] = useState("");
  const [selectedPokemon, setPokemon] = useState(undefined as any);

  const [totalCount, setTotalCount] = useState(-1);
  const fetchPokemons = async () => {
    if (pokemonList.length === totalCount) {
      return;
    }
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=1200`
      );
      const { count, results } = data;
      setTotalCount(count);

      setPokemonList([...pokemonList, ...results]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputValue = (e: any) => {
    const { value } = e.target;
    setsearchKeyword(value);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const finalPokemonList = pokemonList.filter(
    ({ name }) => name.indexOf(searchKeyword) > -1
  );

  const onPokemonSelect = (pokemon: any) => {
    setPokemon(pokemon);
  };

  const onSubmit = () => {
    setValues({ ...values, pokemon: selectedPokemon.name });
    onNext();
  };
  return (
    <Paper id="scrollableDiv">
      <Grid item xs={6}>
        <TextField
          onChange={debounce(handleInputValue, 400)}
          onBlur={debounce(handleInputValue, 400)}
          fullWidth
          name="searchsd"
          label="Enter Pokemon name to search"
          variant="standard"
        />
      </Grid>
      <div
        style={{
          height: 600,
          padding: 30,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {finalPokemonList.length ? (
          <>
            <InfiniteScroll
              dataLength={totalCount}
              next={() => {}}
              hasMore={false}
              scrollThreshold={0.8}
              loader={<LinearProgress />}
              scrollableTarget="scrollableDiv"
              style={{ overflow: "unset" }}
            >
              <Grid
                container
                spacing={4}
                style={{
                  paddingTop: "30px",
                  paddingLeft: "15%",
                  paddingRight: "15%",
                  width: "100%",
                }}
              >
                {finalPokemonList.map((pokemon, pokemonIndex) => {
                  const { name, url } = pokemon;
                  const id = url.substring(
                    url.indexOf("/pokemon/") + 9,
                    url.length - 1
                  );
                  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

                  return (
                    <Grid key={pokemonIndex} item xs={12} sm={6} md={4} lg={3}>
                      <Card
                        style={{
                          cursor: "pointer",
                          border:
                            selectedPokemon?.index === pokemonIndex
                              ? "2px solid blue"
                              : "",
                        }}
                        onClick={() => {
                          onPokemonSelect({ ...pokemon, index: pokemonIndex });
                        }}
                        elevation={20}
                      >
                        <Typography>
                          {"Name: " + capitalize(`${name}`)}
                        </Typography>
                        <Typography>{`ID: ${id}`}</Typography>
                        <CardMedia>
                          <div
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "#F2F5C8",
                              maxWidth: "90%",
                            }}
                          >
                            <img
                              style={{
                                height: "160px",
                                width: "160px",
                              }}
                              alt=""
                              src={imgUrl}
                            />
                          </div>
                        </CardMedia>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </InfiniteScroll>
          </>
        ) : (
          <CircularProgress
            color={"success"}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              marginTop: "-100px",
              marginLeft: "-100px",
            }}
            size={200}
          />
        )}
      </div>

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        style={{ marginTop: 16 }}
      >
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={onBack}
        >
          Previous
        </Button>
        <Button
          sx={{ marginLeft: "5px" }}
          variant="contained"
          color="primary"
          disabled={!selectedPokemon}
          onClick={onSubmit}
        >
          Next
        </Button>
      </Grid>
    </Paper>
  );
};
