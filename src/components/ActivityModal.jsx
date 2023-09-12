import React from 'react'
import Modal from 'react-bootstrap/Modal';
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { decode } from '@mapbox/polyline';
import { secondsToHMS, timeAndDistanceToPace } from '../util';

function ActivityModal(props) {
    const { modalVisible, handleModalClose, contents } = props

    const getCords = () => decode(contents.map.polyline)
    
    // Get the most north-eastern and south-western points of the route to configure bounds
    const getBounds = () => {
        let maxLat = -Infinity;
        let minLat = Infinity;
        let maxLng = -Infinity;
        let minLng = Infinity;

        getCords().forEach(point => {
            const [lat, lng] = point;
            maxLat = Math.max(maxLat, lat);
            minLat = Math.min(minLat, lat);
            maxLng = Math.max(maxLng, lng);
            minLng = Math.min(minLng, lng);
        });

        return [[minLat, minLng], [maxLat, maxLng]]
    } 

    return (
        <div>
            <Modal
                show={modalVisible}
                onHide={handleModalClose}
                keyboard={true} 
                >
                <Modal.Header closeButton>
                    <Modal.Title><p className='text-sm m-0'>{" " + contents.start_date_local.slice(0,10) + " " + contents.start_date_local.slice(11,19)}</p><p className='font-bold mb-1'>{contents.name}</p></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='w-full h-[600px] bg-white rounded-lg'>
                        <div className='w-full h-[450px] bg-white'>
                            {contents.map.polyline ? <MapContainer 
                                style={{ height: "100%", width: "100%" }} 
                                bounds={getBounds()}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                <Polyline positions={getCords()} color={'red'}/>
                            </MapContainer> : <h1 className='text-center'> No GPS map data available </h1>}
                        </div>
                        <div className='grid grid-cols-2 text-center mt-2'>
                            <div className='bg-white border-1 border-gray-300 border-spacing-0'>
                                <p className='m-0 text-xs'>Distance</p>
                                <p className='m-0 font-bold'>{(contents.distance / 1000).toFixed(2) + "km"}</p>
                            </div>
                            <div className='bg-white border-1 border-gray-300 border-spacing-0'>
                                <p className='m-0 text-xs'>Avg Pace</p>
                                <p className='m-0 font-bold'>{timeAndDistanceToPace(contents.moving_time, contents.distance)}</p>
                            </div>
                            <div className='bg-white border-1 border-gray-300 border-spacing-0'>
                                <p className='m-0 text-xs'>Moving Time</p>
                                <p className='m-0 font-bold'>{secondsToHMS(contents.moving_time)}</p>
                            </div>
                            <div className='bg-white border-1 border-gray-300 border-spacing-0'>
                                <p className='m-0 text-xs'>Elevation Gain</p>
                                <p className='m-0 font-bold'>{contents.total_elevation_gain + "m"}</p>
                            </div>
                            <div className='bg-white border-1 border-gray-300 border-spacing-0'>
                                <p className='m-0 text-xs'>Calories</p>
                                <p className='m-0 font-bold'>{contents.calories}</p>
                            </div>
                            <div className='bg-white border-1 border-gray-300 border-spacing-0'>
                                <p className='m-0 text-xs'>Avg HR</p>
                                <p className='m-0 font-bold'>{contents.average_heartrate ? contents.average_heartrate.toFixed(0) + "bpm" : "-"}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ActivityModal