import React from 'react'
import "../styles/confirmstyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGymVisitRatesTableView } from '../services/GymVisitRateDataService.jsx';
import { getVisitRatesCount } from '../web3/SmartContract.jsx';
import { useState } from 'react';

let tableHtml = null;
tableHtml = await getGymVisitRatesTableView();
let visitRatesCount = await getVisitRatesCount(window.ethereum.selectedAddress, 60*60*24*14);
console.log('TableHtml: ' + tableHtml);


const History = () => {

  return (
    <section id="features" style={{ justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1800px', minHeight: '800px', margin: '0 auto' }}>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col col-sm-3 col-xs-12">
                            <h4 class="title"><strong>Your gym visit<br></br>rates (14 days)</strong></h4>
                        </div>
                        <div class="col-sm-9 col-xs-12 text-right">
                            <div class="btn_group">
                                <input type="text" class="form-control" placeholder="Search" />
                                <button class="btn btn-default" title="Reload"><i class="fa fa-sync-alt"></i></button>
                                <button class="btn btn-default" title="Pdf"><i class="fa fa-file-pdf"></i></button>
                                <button class="btn btn-default" title="Excel"><i class="fas fa-file-excel"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th><strong>Visit id</strong></th>
                                <th><strong>Address rated</strong></th>
                                <th><strong>Rating time</strong></th>
                                <th><strong>Rate given</strong></th>
                                <th><strong>Rate source</strong></th>
                            </tr>
                        </thead>
                        <tbody>{tableHtml.map(row => (
                            <tr>
                                {row.map(cell => (
                                <td>{cell}</td>
                                ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col col-sm-12">Count of your gym visit rates (14 days): <strong>{visitRatesCount}</strong>.  Good job!</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
  );
};

export default History