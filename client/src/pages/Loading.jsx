import React from 'react';
import { BarLoader } from 'react-spinners';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <BarLoader color= "yellow"/>
  </div>
);

export default Loading;