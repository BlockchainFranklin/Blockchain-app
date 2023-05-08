import React from 'react'
import "../styles/confirmstyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGymVisitsTableView } from '../services/GymVisitDataService.jsx';


const { selectedAddress } = window.ethereum;
if (selectedAddress !== null) {}
else {
  console.log("window.ethereum is not available");
}


const handleButtonClick = () => {
    // wywołanie metody z innego pliku JavaScript
    console.log("Button clicked");
  };


let tableHtml = null;
tableHtml = await getGymVisitsTableView();
console.log('TableHtml: ' + tableHtml);

const Confirm = () => {

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
                            <h4 class="title"><strong>Your gym visits</strong></h4>
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
                                <th><strong>#</strong></th>
                                <th><strong>Visit time</strong></th>
                                <th><strong>Rates (app/social)</strong></th>
                                <th><strong>Positive %</strong></th>
                                <th><strong>Status</strong></th>
                                <th><strong>Cash it!</strong></th>
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
                        <div class="col col-sm-6 col-xs-6">showing <b>5</b> out of <b>25</b> entries</div>
                        <div class="col-sm-6 col-xs-6">
                            <ul class="pagination hidden-xs pull-right">
                                <li><a href="#">{'<'}</a></li>
                                <li class="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#">{'>'}</a></li>
                            </ul>
                            <ul class="pagination visible-xs pull-right">
                                <li><a href="#">{'<'}</a></li>
                                <li><a href="#">{'>'}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
  );
};

export default Confirm
