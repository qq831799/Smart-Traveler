import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import TheMap from '../components/TheMap';

export class MapContainer extends Component{
	constructor(props) {
        super(props);
        this.selectPlace = this.selectPlace.bind(this);
        this.state = {
        	place: {
        		name:null,
        		id:null,
        		address:null
        	}
        }
    }
    selectPlace(place){
    	console.log(place);
    }
   	render(){
   		return(
   			<div className="MapContainer">
   				<TheMap google={this.props.google} selectPlace={this.selectPlace}></TheMap>
   			</div>
   			
   		)
   	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDpE6ASlrK_fyKwheIpwS6RvmByadRFb_o',
	libraries: ['places']
})(MapContainer)