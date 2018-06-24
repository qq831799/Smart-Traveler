import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  mapRoot:{
		maxWidth: '100%',
		maxHeight: '100%',
		width: '100vw',
		height: '90vh',
  },
});


class TheMap extends Component{
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		this.loadMap();
	}
	mapOnClick(event){
		// console.log(event.latLng.toJSON());
		if(event.placeId){
			let request = {
				placeId: event.placeId
			};
			this.service.getDetails(request, (results, status) => {
				if(status = 'OK'){
					let place = {
						name: results.name,
						id: results.place_id,
						address: results.formatted_address
					}
					this.props.selectPlace(place);
					
				}
			});
		}
	}
	loadMap(){
		if(this.props && this.props.google){
			const {google} = this.props;
			const maps = google.maps;
			const mapRef = this.refs.map;
			const node = ReactDOM.findDOMNode(mapRef);

			const mapConfig = Object.assign({},{
				center:{lat:25.04781398378319,lng:121.51702880859375},
				zoom:14,
				gestureHandling:"cooperative",
				mapTypeId: 'terrain'
			})
			this.map = new maps.Map(node, mapConfig);
			this.geocoder = new maps.Geocoder();
			this.service = new maps.places.PlacesService(this.map);
			//console.log(this);
			maps.event.addListener(this.map, 'click', this.mapOnClick.bind(this));
		}
	}
	render(){
		const {classes} = this.props;
		return(
			<div ref="map" className={classes.mapRoot}>
			loading map...
			</div>
		)
	}
}

TheMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TheMap);