import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleApiWrapper } from 'google-maps-react';
import TheMap from '../components/TheMap';
import { addLocation } from '../actions';

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
    	this.props.actions(place);
    	// this.props.dispatch();
    }
   	render(){
   		return(
   			<div className="MapContainer">
   				<TheMap google={this.props.google} selectPlace={this.selectPlace}></TheMap>
   			</div>
   			
   		)
   	}
}
function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(addLocation, dispatch)
	}
}

export default connect(null,mapDispatchToProps)(GoogleApiWrapper({
	apiKey: 'AIzaSyDpE6ASlrK_fyKwheIpwS6RvmByadRFb_o',
	libraries: ['places']
})(MapContainer))