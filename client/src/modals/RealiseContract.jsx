import React, {useEffect} from 'react'


const { selectedAddress } = window.ethereum;
if (selectedAddress !== null) {}
else {
  console.log("window.ethereum is not available");
}


function RealiseContract ({ setOpenModal, setFile, handleRealiseContract }) {
    useEffect(() => {
      // wywołujemy funkcję handleRealiseContract po zamontowaniu komponentu
      handleRealiseContract();
    }, []);
  
    return (
      <div className="modalPhotoBackground" >
      </div>
    );
  };
export default RealiseContract