import React from 'react';
import { useBreakpoints, useCurrentWitdh } from '../src/lib';


const App = () => {
  let width = useCurrentWitdh();
  let { xs, sm, md, lg, smmd } = useBreakpoints({
    xs: {min: 0, max: 360},
    sm: {min: 361, max: 960},
    md: {min: 961, max: 1400},
    lg: {min: 1401, max: null},
    smmd: {min: 400, max: 1300},
  });

  return (
    <div>
      <h1>
        {`Current width -> ${width}`}
      </h1>
      <p>
        {`Breakpoint: xs(${xs}) sm(${sm}) md(${md}) lg(${lg}), smmd(${smmd})`}
      </p>
    </div>
  );
}

export default App;
