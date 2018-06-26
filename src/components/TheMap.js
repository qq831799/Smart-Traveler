import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
	componentDidMount(){
		this.loadMap();
	}
	mapOnClick(event){
		// console.log(event.latLng.toJSON());
		this.infoWindow.close();
        this.marker.setVisible(false);
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
					console.log(results);
				}
			});
		}
	}
	pacOnChange(){
		  this.infoWindow.close();
          this.marker.setVisible(false);
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
            this.map.setZoom(17);  // Why 17? Because it looks good.
          }
          this.marker.setPosition(place.geometry.location);
          this.marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
          console.log(this.infoWindowContent);
          // this.infoWindowContent.children['place-icon'].src = place.icon;
          this.infoWindowContent.children['place-name'].textContent = place.name;
          this.infoWindowContent.children['place-address'].textContent = address;
          this.infoWindow.open(this.map, this.marker);
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
			this.map.controls[google.maps.ControlPosition.TOP].push(ReactDOM.findDOMNode(this.refs.pac));
			console.log(ReactDOM.findDOMNode(this.refs.pacInput));
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
					       className={classes.input}
					       inputProps={{
					          'aria-label': 'Description',}}/>
				</div>
			</CardContent>
			</Card>
			<div ref="infoWindow">
				<span id="place-name"  class="title"></span><br/>
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