import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";


const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();

  };

  useGSAP(() => {
    if(panelOpen){
      gsap.to(panelRef.current, {
      height:'70%',
      padding:'24%'
      // opacity:1
    })
    gsap.to(panelCloseRef.current, {
      opacity:1
    })
    } else {
      gsap.to(panelRef.current, {
      height:'0%',
      padding:'0%'
      // opacity:0
    })
    gsap.to(panelCloseRef.current, {
      opacity:0   
    })
    }
  }, [panelOpen])

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="/src/assets/ridecaptain.png"
        alt="logo"
        className="w-30 absolute left-5 top-5"
      />

      <div className="h-screen w-screen">
        {/* image for temp.. use */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-6 bg-white relative">
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className="absolute top-2 right-6 text-xl  opacity-0">
              <i className="ri-arrow-down-s-line text-black text-2xl"></i>

          </h5>
          <h4 className="text-2xl font-semibold ">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        <div ref={panelRef} className="bg-white ">
          <LocationSearchPanel />
        </div>
        
      </div>

      <div className="fixed w-full z-10 bottom-0 p-5 translate-y-full bg-white px-3 py-8">
        <h3 className="test-2xl font-semibold mb-5">Choose a Vehicle</h3>

          <div className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 item-center justify-between">
            <img className="h-15 " src="https://imgs.search.brave.com/51w8bkuSl-1-WTxyp1IuMRxu_wF60VYGCWH39XC56qE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NTMzLzEyMy9zbWFs/bC9yZWFsaXN0aWMt/c3BvcnQtY2FyLWlz/b2xhdGVkLW9uLWJh/Y2tncm91bmQtM2Qt/cmVuZGVyaW5nLWls/bHVzdHJhdGlvbi1w/bmcucG5n" alt="" />
            <div className="ml-2 w-1/2">
              <h4 className="font-bold text-base">RideGo <span><i className="ri-user-line"></i>4</span></h4>
              <h5 className="font-bold text-sm">2 mins away</h5>
              <p className="font-bold  text-xs text-gray-600" >Affordable, compact rides</p>
            </div>
            <h2 className="text-xl font-semibold">₹193.2</h2>
          </div>

          <div className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 item-center justify-between">
            <img className="h-12 " src="https://imgs.search.brave.com/kSMXuM56UQqAWLE06lLZhYoJbq_7eu-cnbzHG4LqstQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjgv/MDUxLzI4NC9zbWFs/bC9lbGVjdHJpYy1t/b3RvcmJpa2UtZWxl/Y3RyaWMtYmlrZS1l/bGVjdHJpYy12ZWhp/Y2xlLXRyYW5zcGFy/ZW50LWJhY2tncm91/bmQtYWktZ2VuZXJh/dGVkLXBuZy5wbmc" alt="" />
            <div className=" w-1/2">
              <h4 className="font-bold text-base">Moto <span><i className="ri-user-line"></i>1</span></h4>
              <h5 className="font-bold text-sm">3 mins away</h5>
              <p className="font-bold  text-xs text-gray-600" >Affordable, motorcycle rides</p>
            </div>
            <h2 className="text-xl font-semibold">₹65</h2>
          </div>

          <div className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 item-center justify-between">
            <img className="h-15 " src="https://imgs.search.brave.com/C9zRSwMFUwc2AvIQqoKolRq_KA1rpiPUef7dW_SkdXc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjgv/NzY0LzE4OC9zbWFs/bC9jdXRlLWF1dG8t/cmlja3NoYXctaXNv/bGF0ZWQtb24tdHJh/bnNwYXJlbnQtYmFj/a2dyb3VuZC1wbmcu/cG5n" alt="" />
            <div className="ml-5 w-1/2">
              <h4 className="font-bold text-base">RideAuto <span><i className="ri-user-line"></i>3</span></h4>
              <h5 className="font-bold text-sm">3 mins away</h5>
              <p className="font-bold  text-xs text-gray-600" >Affordable Auto rides</p>
            </div>
            <h2 className="text-xl font-semibold">₹118.86</h2>
          </div>
      </div>
    </div>
  );
};

export default Home;
