import React from "react";
import ErrorBoundary from "./error-boundary";
import { fetchPokemon, suspensify } from "./api";

const PokemonDetail = React.lazy(() => import("./PokemonDetail"));

let initialPokemon = suspensify(fetchPokemon(1));

export default function App() {
  let [pokemon, setPokemon] = React.useState(initialPokemon);
  let deferredPokemon = React.useDeferredValue(pokemon, {
    timeoutMs: 3000,
  });
  let deferredPokemonIsStale = deferredPokemon !== pokemon;
  let [, startTransition] = React.useTransition();

  return (
    <div>
      <h1>Pokedex</h1>

      <ErrorBoundary fallback={"Couldn't catch 'em all."}>
        <React.Suspense fallback={"Catching your Pokemon..."}>
          <PokemonDetail
            resource={deferredPokemon}
            isStale={deferredPokemonIsStale}
          />

          <button
            type="button"
            disabled={deferredPokemonIsStale}
            onClick={() =>
              startTransition(() =>
                setPokemon(
                  suspensify(fetchPokemon(deferredPokemon.read().id + 1))
                )
              )
            }
          >
            Next
          </button>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}
