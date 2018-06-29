//#region import file
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleApiWrapper } from 'google-maps-react';
import TheMap from '../components/TheMap';
import { addLocation } from '../actions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//#endregion

const styles = theme => ({
  addLocationContainer:{
		position: 'fixed',
		top: '600px',
  },
});

export class MapContainer extends Component{
	constructor(props) {
        super(props);
        this.selectPlace = this.selectPlace.bind(this);
        this.addPlaceOnClick = this.addPlaceOnClick.bind(this);
        this.state = {
        	place: {
        		name:null,
        		id:null,
        		address:null
        	}
        }
        this.pacCard = React.createRef();
    }
    selectPlace(place){
    	this.setState({place: {...place}}) ;
    	console.log(this.state.place);
    	// this.props.dispatch();
    }
    addPlaceOnClick(e){
      if(this.state.place.name){
        this.props.actions(this.state.place);
      }
    }
   	render(){
			const {classes} = this.props;
   		return(
   			<div className="MapContainer" >	
   				<TheMap 
            google={this.props.google} 
            selectPlace={this.selectPlace} 
            pacCard = {this.pacCard}
            location = {this.props.location}
            focus = {this.props.focus}
            addPlace={this.addPlaceOnClick}>
          </TheMap>
   			</div>
   		)
   	}
}
function mapStateToProps(state){
  return {
    focus: state.locationReducer.focusDay,
    location: state.locationReducer.day[state.locationReducer.focusDay].location,
  }
}
function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(addLocation, dispatch)
	}
}
MapContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
	libraries: ['places']
})(MapContainer)))