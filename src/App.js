import React from "react";

import ErrorBoundary from "./error-boundary.js";

const PokemonDetail = React.lazy(() => import("./PokemonDetail.jsx"));

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallback="Couldn't catch them all'">
        <React.Suspense fallback="Loading pokemon">
          <PokemonDetail />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
