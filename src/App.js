import React, { useState, useEffect } from 'react';

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

function useCurrentWitdh() {
  let [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    window.addEventListener('resize', resizeListener);

    // cleanup
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return width;
}

function useBreakpoints(breakpoints) {
  if (typeof breakpoints !== 'object' || breakpoints === null) {
    throw new Error('Invalid configuration object!')
  }

  let width = useCurrentWitdh();
  let result = {}

  for(const key of Object.keys(breakpoints)) {
    if (breakpoints[key].min !== parseInt(breakpoints[key].min, 10)) {
      throw new Error('Min value should be integer!');
    }

    if (breakpoints[key].max && breakpoints[key].max !== parseInt(breakpoints[key].max, 10)) {
      throw new Error('Max value should be integer!');
    }

    if (breakpoints[key].max && breakpoints[key].min > breakpoints[key].max) {
      throw new Error('Min value should be lower or equal with max value!');
    }

    result[key] = width >= breakpoints[key].min && (!breakpoints[key].max || width <= breakpoints[key].max)
  }

  return result;
}


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
