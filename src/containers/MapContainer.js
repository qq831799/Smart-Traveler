import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleApiWrapper } from 'google-maps-react';
import TheMap from '../components/TheMap';
import { addLocation } from '../actions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
    	this.state.place = {...place};
    	console.log(this.state.place);
    	// this.props.dispatch();
    }
    addPlaceOnClick(e){
    	this.props.actions(this.state.place);
    }
   	render(){
   		return(
   			<div className="MapContainer" >	
   				<TheMap google={this.props.google} selectPlace={this.selectPlace}></TheMap>
		        <Grid container>
		        <Grid item xs={12}>
			        <Button
			            variant="contained"
			            color="primary"
			            onClick={(e) => {this.addPlaceOnClick(e)}}
			         >
			            Add Location
			         </Button>
		         </Grid>	
				</Grid>
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