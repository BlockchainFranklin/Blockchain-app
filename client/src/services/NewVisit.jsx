import React from 'react'
import { useState } from 'react';
import { createVisit } from '../web3/SmartContract.jsx';


export async function getNewVisit(){
    try {
        const result = await contract.methods.getVisits(walletAddress).call();
  
        const gymVisits = result.map((visit) => {
          const gymVisit = {
            visitId: visit[0],
            user: visit[1],
            visitTime: visit[2],
            hash: visit[3],
            result: visit[4],
            ratesIds: visit[5],
          };
          return gymVisit;
        });
  
        return gymVisits;
    } 
    catch (error) {
        console.error(error);
        return null;
    }
  }
  