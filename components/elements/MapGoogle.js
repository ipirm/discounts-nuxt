import React, {Component} from 'react';
import GoogleMapReact, {Marker} from 'google-map-react';

const AnyReactComponent = () => {
    return (
        <div className="marker"></div>
    )
};

class MapGoogle extends Component {
    constructor(props){
        super(props);
        this.state = {
            center: {
                lat: 40.4001017,
                lng: 49.852102,
            },
            zoom: 15
        }
    }

    render() {
        const {lng, ltg} = this.props;
        return (
            // Important! Always set the container height explicitly
            <div className="map-google">
                <div className="map-google-title">Открыть карту</div>
                <div style={{width: 785 + 'px', height: 460.87 + 'px', margin: 'auto',}}>
                    {lng !== null ?
                        <GoogleMapReact
                            bootstrapURLKeys={{key: 'AIzaSyD61aV5hw8CWI9G64m036IXjUl4LSwOcPY'}}
                            defaultCenter={this.state.center}
                            defaultZoom={this.state.zoom}
                        >

                            <AnyReactComponent
                                lat={ltg}
                                lng={lng}
                            />
                        </GoogleMapReact>
                        :
                        <GoogleMapReact
                            bootstrapURLKeys={{key: 'AIzaSyD61aV5hw8CWI9G64m036IXjUl4LSwOcPY'}}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                        >

                            <AnyReactComponent
                                lat={ltg}
                                lng={lng}
                            />
                        </GoogleMapReact>
                    }
                </div>
            </div>
        );
    }
}

export default MapGoogle;
