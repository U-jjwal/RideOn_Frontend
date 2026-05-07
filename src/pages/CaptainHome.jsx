import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (!captain?._id) return;

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    return () => clearInterval(locationInterval)
  }, [captain?._id])

  useEffect(() => {
    socket.on('new-ride', (data) => {
      setRide(data)
      setRidePopupPanel(true)
    })

    return () => {
      socket.off('new-ride')
    }
  }, [socket])

  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)',
        ease: 'power3.out',
        duration: 0.45
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.inOut',
        duration: 0.4
      })
    }
  }, [ridePopupPanel])

  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)',
        ease: 'power3.out',
        duration: 0.45
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
        ease: 'power3.inOut',
        duration: 0.4
      })
    }
  }, [confirmRidePopupPanel])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');

        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-font-smoothing: antialiased;
        }

        .captain-root {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
          height: 100dvh;
          width: 100%;
          position: relative;
          overflow: hidden;
          background: #000;
        }

        /* ── Top nav bar ── */
        .captain-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          pointer-events: none;
        }

        .captain-logo {
          pointer-events: auto;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 14px;
          padding: 8px 14px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.12);
        }
        .captain-logo-text {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.4px;
          color: #1d1d1f;
          line-height: 1;
        }
        .captain-logo-accent {
          color: #0071e3;
        }

        .captain-logout {
          pointer-events: auto;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 16px rgba(0,0,0,0.12);
          text-decoration: none;
          color: #1d1d1f;
          font-size: 17px;
          transition: background 0.18s, transform 0.12s;
        }
        .captain-logout:active {
          background: rgba(242,242,247,0.95);
          transform: scale(0.92);
        }

        /* ── Map area ── */
        .captain-map {
          height: 60dvh;
          width: 100%;
          position: relative;
        }

        /* ── Captain details card ── */
        .captain-details-card {
          height: 40dvh;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          
          box-shadow: 0 -2px 40px rgba(0,0,0,0.10);
          padding: 20px 20px 36px;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* drag pill */
        .captain-pill {
          width: 36px;
          height: 4px;
          background: #d1d1d6;
          border-radius: 100px;
          margin: 0 auto 18px;
        }

        /* ── Bottom sheets ── */
        .captain-sheet {
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
          padding: 0 20px 44px;
          box-sizing: border-box;
          max-height: 90dvh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .captain-sheet-full {
          position: fixed;
          width: 100%;
          height: 100dvh;
          z-index: 10;
          bottom: 0;
          transform: translateY(100%);
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-radius: 28px 28px 0 0;
          box-shadow: 0 -2px 40px rgba(0,0,0,0.12);
          padding: 0 20px 44px;
          box-sizing: border-box;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* drag pill for sheets via pseudo */
        .captain-sheet::before,
        .captain-sheet-full::before {
          content: '';
          display: block;
          width: 36px;
          height: 4px;
          background: #d1d1d6;
          border-radius: 100px;
          margin: 16px auto 20px;
        }
      `}</style>

      <div className="captain-root">

        {/* Top navigation */}
        <div className="captain-nav">
          <div className="captain-logo">
            <span className="captain-logo-text">
              Ride<span className="captain-logo-accent">On</span>
            </span>
          </div>

          <Link to="/captain/logout" className="captain-logout" aria-label="Logout">
            <i className="ri-logout-box-r-line" />
          </Link>
        </div>

        {/* Map — top 60% */}
        <div className="captain-map">
          <LiveTracking />
        </div>

        {/* Captain details — bottom 40% */}
        <div className="captain-details-card">
          <div className="captain-pill" />
          <CaptainDetails />
        </div>

        {/* Ride request popup sheet */}
        <div ref={ridePopupPanelRef} className="captain-sheet">
          <RidePopUp
            ride={ride}
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            confirmRide={confirmRide}
          />
        </div>

        {/* Confirm ride full-screen sheet */}
        <div ref={confirmRidePopupPanelRef} className="captain-sheet-full">
          <ConfirmRidePopUp
            ride={ride}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
          />
        </div>

      </div>
    </>
  )
}

export default CaptainHome