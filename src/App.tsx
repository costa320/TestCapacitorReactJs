/** @format */

import { Geolocation } from '@capacitor/geolocation';
import { Spin } from 'antd';
import Button from 'antd/es/button';
import { useState } from 'react';
import './App.css';
import logo from './logo.svg';

export interface Position {
  /**
   * Creation timestamp for coords
   *
   * @since 1.0.0
   */
  timestamp: number;
  /**
   * The GPS coordinates along with the accuracy of the data
   *
   * @since 1.0.0
   */
  coords: {
    /**
     * Latitude in decimal degrees
     *
     * @since 1.0.0
     */
    latitude: number;
    /**
     * longitude in decimal degrees
     *
     * @since 1.0.0
     */
    longitude: number;
    /**
     * Accuracy level of the latitude and longitude coordinates in meters
     *
     * @since 1.0.0
     */
    accuracy: number;
    /**
     * Accuracy level of the altitude coordinate in meters, if available.
     *
     * Available on all iOS versions and on Android 8.0+.
     *
     * @since 1.0.0
     */
    altitudeAccuracy: number | null | undefined;
    /**
     * The altitude the user is at (if available)
     *
     * @since 1.0.0
     */
    altitude: number | null;
    /**
     * The speed the user is traveling (if available)
     *
     * @since 1.0.0
     */
    speed: number | null;
    /**
     * The heading the user is facing (if available)
     *
     * @since 1.0.0
     */
    heading: number | null;
  };
}

function App() {
  const [loc, setLoc] = useState<Position | null>(null);
  const [GeoTrackId, setGeoTrackId] = useState<string>('');

  const StartGeoTracking = () => {
    Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
      },
      (position: Position | null, err?: any) => {
        setLoc(position);
      }
    ).then((id: string) => setGeoTrackId(id));
  };

  const StopGeoTracking = () => {
    if (GeoTrackId) {
      Geolocation.clearWatch({
        id: GeoTrackId,
      }).then(() => {
        setGeoTrackId('');
      });
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Fatti tracciare ;D</p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <div>
          <h1>Geolocation</h1>

          <Spin spinning={GeoTrackId ? true : false}> </Spin>
          {GeoTrackId && (
            <>
              <p>Ti sto osservando!</p>
              <p>Sò dove sei:</p>
              <p>Latitude: {loc?.coords.latitude}</p>
              <p>Longitude: {loc?.coords.longitude}</p>
            </>
          )}

          {GeoTrackId ? <Button onClick={StopGeoTracking}>Ferma il tracciamento</Button> : <Button onClick={StartGeoTracking}>Inizia il tracciamento</Button>}
        </div>
      </header>
    </div>
  );
}

export default App;
