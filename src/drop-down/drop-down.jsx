import React from 'react';
import { timingSafeEqual } from 'crypto';
import { DateTime } from 'luxon';

const destinations = ['London', 'Valencia', 'Barcelona', 'Madrid', 'Milan', 'Athens',  'Helsinki', 'Stockholm'];
const origins = ['Prague', 'Berlin', 'Warsaw', 'Pardubice'];


export default class DropDown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            origin: "Prague",
            destination: "London",
            direct: 0,
            date: this.todaysDate(),
            flightsNumber: this.props.flightsNumber
        };
    }

    todaysDate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
    
        if(dd<10) {
            dd = '0' + dd
        } 
    
        if(mm<10) {
            mm = '0' + mm
        } 
    
        today = yyyy + '-' + mm + '-' + dd;
        
        return today;
    }

    // componentDidMount() {
    //     console.log(this.todaysDate())
    //     this.setState({
    //         date: this.todaysDate()
    //     })
    // }

    action = () => {
        this.props.action({
            origin: document.getElementById('origin').value,
            destination: document.getElementById('destination').value,
            date: DateTime.fromSQL(document.getElementById('date').value).toFormat('dd/MM/yyyy'),
            direct: (document.getElementById('direct_flights').checked ? 1 : 0),
        });
    }

    render() {
        return (
            <div className="search">
                <div className="fields">
                    <div className="field">
                        From<br/>
                        <select id="origin" className="origins">
                            { origins.map((origin, i)  => 
                                <option value={origin} key={i} defaultValue={(origin == this.state.origin) ? true : false }>{origin}</option>
                            )}   
                        </select>
                    </div>
                    <div className="field">
                        To<br/>
                        <select id="destination">
                            { destinations.map((destination, i) =>
                                <option key={i}>{destination}</option>
                            )}  
                        </select>
                    </div>
                    <div className="field">
                        Date<br/>
                        <input className="date" type="date" id="date" defaultValue={this.state.date}/>
                    </div>
                </div>
                <div className="submit">
                    <input type="checkbox" name="checkbox" id="direct_flights"/>direct flights only <br></br>
                    <button className="searchbtn" onClick={this.action}>Search!</button>
                </div>
            </div>
        )
    }
}