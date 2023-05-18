import React from 'react';
import { CircleLoader } from 'react-spinners';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircleLoader color="yellow" speedMultiplier="2" />
  </div>
);

export default Loading;