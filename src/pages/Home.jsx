import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    if (!socket) return;
    if (!user) return;
    if (!user._id) return;
    socket.emit("join", {
      userId: user._id,
      userType: "user"
    });
  }, [socket, user]);

  useEffect(() => {
    socket.on('ride-confirmed', ride => {
      setVehicleFound(false)
      setWaitingForDriver(true)
      setRide(ride)
    })

    socket.on('ride-started', ride => {
      setWaitingForDriver(false)
      navigate('/riding', { state: { ride } })
    })

    return () => {
      socket.off('ride-confirmed')
      socket.off('ride-started')
    }
  }, [socket, navigate])

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    if (e.target.value.length < 3) {
      setPickupSuggestions([])
      return
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setPickupSuggestions(response.data)
    } catch {
      throw new Error('Could not fetch suggestions')
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    if (e.target.value.length < 3) {
      setDestinationSuggestions([])
      return
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setDestinationSuggestions(response.data)
    } catch {
      throw new Error('Could not fetch suggestions')
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        ease: 'power3.out',
        duration: 0.45
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.25,
        delay: 0.2
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        ease: 'power3.inOut',
        duration: 0.4
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.2
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
        ease: 'power3.out',
        duration: 0.45
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.inOut',
        duration: 0.4
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
        ease: 'power3.out',
        duration: 0.45
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.inOut',
        duration: 0.4
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
        ease: 'power3.out',
        duration: 0.45
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.inOut',
        duration: 0.4
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
        ease: 'power3.out',
        duration: 0.45
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.inOut',
        duration: 0.4
      })
    }
  }, [waitingForDriver])

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setFare(response.data)
    } catch (err) {
      setVehiclePanel(false)
      alert('Could not fetch fare. Please try again.')
    }
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
  }

  return (
    <>
      {/* ── Global styles injected once ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');

        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-font-smoothing: antialiased;
        }

        .rideon-root {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
          height: 100dvh;
          width: 100%;
          position: relative;
          overflow: hidden;
          background: #000;
        }

        /* ── Logo ── */
        .logo {
          position: absolute;
          left: 20px;
          top: 20px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .logo-text {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #fff;
          text-shadow: 0 1px 12px rgba(0,0,0,0.4);
        }
        .logo-accent {
          color: #0071e3;
        }

        /* ── Map container ── */
        .map-container {
          height: 100dvh;
          width: 100%;
        }

        /* ── Bottom sheet wrapper ── */
        .sheet-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100dvh;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 10;
          pointer-events: none;
        }

        /* ── Main input card ── */
        .input-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-radius: 28px 28px 0 0;
          padding: 28px 20px 36px;
          pointer-events: auto;
          position: relative;
          box-shadow: 0 -2px 40px rgba(0,0,0,0.12);
        }

        /* drag pill */
        .drag-pill {
          width: 36px;
          height: 4px;
          background: #d1d1d6;
          border-radius: 100px;
          margin: 0 auto 22px;
        }

        /* close button */
        .close-btn {
          position: absolute;
          right: 20px;
          top: 22px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f2f2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          opacity: 0;
          color: #6e6e73;
          font-size: 15px;
          transition: background 0.18s;
        }
        .close-btn:active { background: #e5e5ea; }

        /* heading */
        .card-heading {
          font-size: 22px;
          font-weight: 700;
          color: #1d1d1f;
          letter-spacing: -0.4px;
          margin-bottom: 18px;
          line-height: 1.2;
        }

        /* ── Input form ── */
        .location-form {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 18px;
        }

        /* vertical connector line */
        .connector {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 44%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          z-index: 1;
          pointer-events: none;
        }
        .connector-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #1d1d1f;
          flex-shrink: 0;
        }
        .connector-dot.dest {
          background: #0071e3;
        }
        .connector-line {
          width: 2px;
          flex: 1;
          background: linear-gradient(to bottom, #1d1d1f 0%, #0071e3 100%);
          border-radius: 2px;
          margin: 4px 0;
          opacity: 0.25;
        }

        /* input fields */
        .location-input {
          width: 100%;
          padding: 16px 16px 16px 44px;
          border: none;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 500;
          color: #1d1d1f;
          background: #f2f2f7;
          outline: none;
          box-sizing: border-box;
          transition: background 0.2s, box-shadow 0.2s;
          font-family: inherit;
          letter-spacing: -0.1px;
          -webkit-appearance: none;
        }
        .location-input::placeholder {
          color: #aeaeb2;
          font-weight: 400;
        }
        .location-input:focus {
          background: #e8e8ed;
          box-shadow: 0 0 0 3px rgba(0,113,227,0.12);
        }

        /* ── Find Trip button ── */
        .find-btn {
          width: 100%;
          padding: 17px;
          border: none;
          border-radius: 16px;
          background: #1d1d1f;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.2px;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.18s, transform 0.12s;
          -webkit-appearance: none;
        }
        .find-btn:active {
          background: #3a3a3c;
          transform: scale(0.985);
        }

        /* ── Suggestions panel ── */
        .suggestions-panel {
          background: #fff;
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: auto;
          height: 0;
          -webkit-overflow-scrolling: touch;
        }

        /* ── Shared bottom sheet (vehicle / confirm / looking / waiting) ── */
        .bottom-sheet {
          position: fixed;
          width: 100%;
          z-index: 10;
          bottom: 0;
          transform: translateY(100%);
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-radius: 28px 28px 0 0;
          box-shadow: 0 -2px 40px rgba(0,0,0,0.12);
          padding: 0 20px 40px;
          box-sizing: border-box;
          max-height: 90dvh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* drag pill inside sheets */
        .bottom-sheet::before {
          content: '';
          display: block;
          width: 36px;
          height: 4px;
          background: #d1d1d6;
          border-radius: 100px;
          margin: 16px auto 8px;
        }

        /* ── Sheet back button ── */
        .sheet-back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f2f2f7;
          border: none;
          border-radius: 20px;
          padding: 8px 14px 8px 10px;
          cursor: pointer;
          color: #1d1d1f;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          letter-spacing: -0.1px;
          margin: 4px 0 16px 0;
          transition: background 0.18s, transform 0.12s;
          -webkit-appearance: none;
        }
        .sheet-back-btn i {
          font-size: 18px;
          line-height: 1;
        }
        .sheet-back-btn:active {
          background: #e5e5ea;
          transform: scale(0.96);
        }
      `}</style>

      <div className="rideon-root">

        {/* Logo */}
        <div className="logo">
          <span className="logo-text">Ride<span className="logo-accent">On</span></span>
        </div>

        {/* Map */}
        <div className="map-container">
          <LiveTracking />
        </div>

        {/* Bottom overlay stack */}
        <div className="sheet-wrapper">

          {/* ── Main input card ── */}
          <div className="input-card">
            <div className="drag-pill" />

            {/* Close / collapse button (shown when panel is open) */}
            <button
              ref={panelCloseRef}
              className="close-btn"
              onClick={() => setPanelOpen(false)}
              aria-label="Close"
            >
              <i className="ri-arrow-down-s-line" />
            </button>

            <p className="card-heading">Where to?</p>

            <form className="location-form" onSubmit={submitHandler}>
              {/* Connector */}
              <div className="connector" style={{ pointerEvents: 'none' }}>
                <div className="connector-dot" />
                <div className="connector-line" />
                <div className="connector-dot dest" />
              </div>

              <input
                onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
                value={pickup}
                onChange={handlePickupChange}
                className="location-input"
                type="text"
                placeholder="Pick-up location"
              />
              <input
                onClick={() => { setPanelOpen(true); setActiveField('destination') }}
                value={destination}
                onChange={handleDestinationChange}
                className="location-input"
                type="text"
                placeholder="Where are you going?"
              />
            </form>

            <button className="find-btn" onClick={findTrip}>
              Find Trip
            </button>
          </div>

          {/* Suggestions panel */}
          <div ref={panelRef} className="suggestions-panel">
            <LocationSearchPanel
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
              pickupValue={pickup}
              destinationValue={destination}
            />
          </div>
        </div>

        {/* ── Vehicle selection sheet ── */}
        <div ref={vehiclePanelRef} className="bottom-sheet">
          {/* Back → Location */}
          <button
            className="sheet-back-btn"
            onClick={() => {
              setVehiclePanel(false)
              setPanelOpen(true)
            }}
            aria-label="Back to location"
          >
            <i className="ri-arrow-left-s-line" />
            Location
          </button>

          <VehiclePanel
            selectVehicle={setVehicleType}
            fare={fare}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>

        {/* ── Confirm ride sheet ── */}
        <div ref={confirmRidePanelRef} className="bottom-sheet">
          {/* Back → Vehicle */}
          <button
            className="sheet-back-btn"
            onClick={() => {
              setConfirmRidePanel(false)
              setVehiclePanel(true)
            }}
            aria-label="Back to vehicle selection"
          >
            <i className="ri-arrow-left-s-line" />
            Choose vehicle
          </button>

          <ConfirmRide
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>

        {/* Looking for driver sheet */}
        <div ref={vehicleFoundRef} className="bottom-sheet">
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
          />
        </div>

        {/* Waiting for driver sheet */}
        <div ref={waitingForDriverRef} className="bottom-sheet">
          <WaitingForDriver
            ride={ride}
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver}
          />
        </div>

      </div>
    </>
  )
}

export default Home