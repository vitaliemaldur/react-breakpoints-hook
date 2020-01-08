# react-breakpoints-hook

### Installation
```bash
yarn add react-breakpoints-hook
```

### useBreakpoints configuration 
```js
// Configuration object consists of breakpoints names which have associated a min and a max value in pixels.
// Note: if max value is omitted it will be considered as the window width. 
{
  breakpointName1: {min: 0, max: 360},
  breakpointName2: {min: 361, max: 960},
  breakpointName3: {min: 961, max: 1400},
  breakpointName4: {min: 1401, max: null},
  breakpointName5: {min: 500, max: 1300},
}
```

### useBreakpoints usage
```js
// returns an object with corresponding boolean flags for each breakpoint, gets updated at rezise
let { xs, sm, md, lg } = useBreakpoints({
  xs: {min: 0, max: 360},
  sm: {min: 361, max: 960},
  md: {min: 961, max: 1400},
  lg: {min: 1401, max: null},
});
```

### useCurrentWitdh usage
```js
// returns current width, gets updated at rezise
let width = useCurrentWitdh();
});
```

### Example
```jsx
import React from 'react';
import { useBreakpoints, useCurrentWitdh } from 'react-breakpoints-hook';


const App = () => {
  let width = useCurrentWitdh();
  let { xs, sm, md, lg } = useBreakpoints({
    xs: {min: 0, max: 360},
    sm: {min: 361, max: 960},
    md: {min: 961, max: 1400},
    lg: {min: 1401, max: null},
  });

  return (
    <div>
      <h1>
        {`Current width -> ${width}`}
      </h1>
      <p>
        {`Breakpoint: xs(${xs}) sm(${sm}) md(${md}) lg(${lg})`}
      </p>
    </div>
  );
}

export default App;
```
