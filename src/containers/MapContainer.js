import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Map, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component{
	constructor(props) {
        super(props);
    }
   	render(){
   		return(
   			<Map google={this.props.google} zoom={3}></Map>
   		)
   	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDpE6ASlrK_fyKwheIpwS6RvmByadRFb_o'
})(MapContainer)