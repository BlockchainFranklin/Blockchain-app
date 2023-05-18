import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

export async function generateAddress(userAddress, hash) {
  const domain = window.location.hostname;
  const searchParams = new URLSearchParams(location.search);
  //console.log(domain);
  //console.log(searchParams);
  //console.log(userAddress);
  //console.log(hash);
  try {
    if (userAddress && hash) {
      const visitString = "http://localhost:3000/wallet/addrate?user=" + userAddress + "&hash=" + hash;
      return visitString.toString();
    } else {
      console.log('Missing user address or hash');
      return null;
    }
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

export default generateAddress;
