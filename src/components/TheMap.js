import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//define the styles of the map and elements on it
const styles = theme => ({
  mapRoot:{
		maxWidth: '100%',
		maxHeight: '100%',
		width: '100vw',
		height: '90vh',
  },
  card: {
  	width: '30vw',
  },
  input: {
  	width: '100%',
  },
  title: {

  },
});


class TheMap extends Component{
	constructor(props) {
		super(props);
	}

	//load the map after the component mount
	componentDidMount(){
		this.loadMap();
	}

	//rerender the route according to the new arrived props
	componentWillReceiveProps(nextProps){
		//only display route when there are more than one location
		if(nextProps.location !== undefined && nextProps.location.length > 1){
			this.calculateAndDisplayRoute(nextProps.location);
		}else{
			this.directionsDisplay.setMap(null);
		}
	}

	//the helper function to render the route
	calculateAndDisplayRoute(location){

		//push the locations between the first and the last one in an array as waypoints
		let waypoints = [];
		for(let i = 1; i < location.length-1; i++){
			waypoints.push({
				location: location[i].address,
				stopover: true
			});
		}

		//setup directions requests
		let route = {
			origin: location[0].address,
			destination: location[location.length-1].address,
			waypoints: waypoints,
			optimizeWaypoints: false,
			travelMode: 'DRIVING'
		}
		this.directionsService.route(route,(response, status) =>{
			if(status === 'OK'){
				this.directionsDisplay.setDirections(response);
				this.directionsDisplay.setMap(this.map);
			} else{
				window.alert('Directions request failed due to '+status);
				// this.directionsDisplay.setMap(null);
			}});
	}
	mapOnClick(event){

		//close the current infoWindow if open
		this.infoWindow.close();
    // this.marker.setVisible(false);

    //if placeId exist, get details from place service
		if(event.placeId){
			let request = {
				placeId: event.placeId
			};
			this.service.getDetails(request, (results, status) => {
				if(status === 'OK'){
    			let place = {
						name: results.name,
						id: results.place_id,
						address: results.formatted_address
					}
					//use the callback function from mapcontainer to pass the place data
					this.props.selectPlace(place);
					ReactDOM.findDOMNode(this.refs.pacInput).value = place.name;
				}
			});
		}
	}
	pacOnChange(){

	  this.infoWindow.close();

    let place = this.autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      this.map.fitBounds(place.geometry.viewport);
    } else {
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(17);
    }

    // this.infoWindowContent.children['place-icon'].src = place.icon;
    this.infoWindowContent.children['place-name'].textContent = place.name;
    this.infoWindowContent.children['place-address'].textContent = place.formatted_address;
    this.infoWindow.setPosition(place.geometry.location);
    this.infoWindow.open(this.map);
    let placeData = {
			name: place.name,
			id: place.place_id,
			address: place.formatted_address
		}
		//use the callback function from mapcontainer to pass the place data
	  this.props.selectPlace(placeData);
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
			this.directionsService = new maps.DirectionsService();
			this.directionsDisplay = new maps.DirectionsRenderer();
			this.map.controls[google.maps.ControlPosition.TOP].push(ReactDOM.findDOMNode(this.refs.pac));
			this.autocomplete = new maps.places.Autocomplete(ReactDOM.findDOMNode(this.refs.pacInput));
      
      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      this.autocomplete.bindTo('bounds', this.map);
      this.infoWindow = new maps.InfoWindow();
      this.infoWindowContent = ReactDOM.findDOMNode(this.refs.infoWindow);
      this.infoWindow.setContent(this.infoWindowContent);
      this.marker = new maps.Marker({
        map: this.map,
        anchorPoint: new maps.Point(0, -29)
      });
			maps.event.addListener(this.map, 'click', this.mapOnClick.bind(this));
			this.autocomplete.addListener('place_changed',this.pacOnChange.bind(this));
		}
	}
	render(){
		const {classes} = this.props;
		return(
			<div ref="map" className={classes.mapRoot}>
			loading map...
			<Card className={classes.card} ref="pac">
			<CardContent>
				<div className="title">
		          Autocomplete search
		        </div>
		        <div className={classes.pacContainer}>
				    <input ref="pacInput"
				    	   placeholder="Enter a location"
					       className={classes.input}/>
				</div>
			</CardContent>
			</Card>
			<div ref="infoWindow">
				<span id="place-name" ></span><br/>
      			<span id="place-address"></span>
			</div>
			</div>
		)
	}
}

TheMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TheMap);