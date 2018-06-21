import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class TheMap extends Component{
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
			console.log(this);
			maps.event.addListener(this.map, 'click', this.mapOnClick.bind(this));
		}
	}
	render(){
		const style = {
			width: '45vw',
			height: '50vh',
			marginLeft: 'auto',
			marginRight: 'auto'
		}
		return(
			<div ref="map" style={style}>
			loading map...
			</div>
		)
	}

}