import React from 'react';
import FlightItem from '../flight_item/flight_item.jsx';
import DropDown from '../drop-down/drop-down.jsx';
import { DateTime } from 'luxon';

export default class FlightList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flights: [],
      isLoading: false,
      searched: "big",
      origin: '',
      destination: '',
      flightsNumber: 10,
    }

  }


  selectedRoute = (data) => {
    if (data) {
      this.setState({ isLoading: true })
      fetch(`https://api.skypicker.com/flights?flyFrom=${data.origin}&to=${data.destination}&dateFrom=${data.date}&dateTo=${data.date}&partner=picky&direct_flights=${data.direct}`)
        .then(resp => resp.json())
        .then(json => {
          this.setState({
            flights: json.data,
            origin: data.origin,
            destination: data.destination,
            isLoading: false,
            searched: "small"
            
          });
        });
    }

  }

  showMore = ()  => {
    this.setState({flightsNumber: this.state.flightsNumber + 5});
  }
  
  render() {
    if (this.state.isLoading == true) {
      return (
        <>
          <header className={this.state.searched}>
            <div className="title">
              <h1>SkyScammer</h1>
            </div>
            <DropDown />
          </header>

          <div className="flight_list">
            <div className="flight-item">
              <div className="flight-prop col-name">Departs</div>
              <div className="flight-prop col-name">Arrives</div>
              <div className="flight-prop col-name">Price</div>
              <div className="flight-prop col-name">Stops</div>
            </div>
            <div className="spinner-container">
              <img className="loading-spinner" src="https://www.flightcomp.de/wp-content/plugins/gravityforms/images/spinner.gif" />
              Hold tight, fetching flights...
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <header className={this.state.searched}>
          <div className="title">
            <h1>SkyScammer</h1>
          </div>
          <DropDown action={this.selectedRoute}/>
        </header>

        <div className="flight_list" style={{display: this.state.searched === 'big' ? 'none' : 'block'}}>
        <h3>Displaying flights from {this.state.origin} to {this.state.destination}</h3>
          <div className="flight-item">
            <div className="flight-prop col-name">Departs</div>
            <div className="flight-prop col-name">Arrives</div>
            <div className="flight-prop col-name">Price</div>
            <div className="flight-prop col-name">Stops</div>
          </div>
          <div className="list">
            {this.state.flights.slice(0, this.state.flightsNumber).map(
              (flight, i) => <FlightItem
                key={i}
                departureTime={
                  DateTime.fromMillis(flight.dTime * 1000).toFormat('hh:mm')}
                arrivalTime={
                  DateTime.fromMillis(flight.aTime * 1000).toFormat('hh:mm')}
                flightPrice={flight.price * 1000}
                stopOvers={flight.route.length - 1}
              />
            )}
            <button className="showmore" onClick={this.showMore}>Show more</button>
          </div>
        </div>
      </>
    )
  }
}