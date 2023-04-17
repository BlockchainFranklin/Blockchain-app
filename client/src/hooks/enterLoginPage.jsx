import { useEffect } from 'react';

const enterLoginPage = () => {
    const currentUrl = window.location.href;  // pobranie aktualnego adresu URL
    const newUrl = currentUrl.replace('/login', '') + '/wallet';
  
    useEffect(() => {
      if (window.ethereum && window.ethereum.selectedAddress === null) {
          console.log("selectedAddress: ", window.ethereum.selectedAddress);
      } else if (window.ethereum && window.ethereum.selectedAddress !== null) {
          console.log("selectedAddress: ", window.ethereum.selectedAddress);
          if (typeof window.ethereum !== "undefined") {
              window.location.href = newUrl; // Przekierowanie na nowy URL
          }
      } else {
          console.log("window.ethereum is not available");
      }
    }, []);
}
export default enterLoginPage