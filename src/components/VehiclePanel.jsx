import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
         <h5
          onClick={() => {
            props.setVehiclePanel(false)
          }}
         className="p-1 w-[93%] text-center absolute top-0"><i className=" text-3xl text-gray-200 ri-arrow-down-s-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>

          <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('car')
            props.setVehiclePanel(false)
          }} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 item-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <img className="h-15 " src="https://imgs.search.brave.com/51w8bkuSl-1-WTxyp1IuMRxu_wF60VYGCWH39XC56qE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NTMzLzEyMy9zbWFs/bC9yZWFsaXN0aWMt/c3BvcnQtY2FyLWlz/b2xhdGVkLW9uLWJh/Y2tncm91bmQtM2Qt/cmVuZGVyaW5nLWls/bHVzdHJhdGlvbi1w/bmcucG5n" alt="" />
            <div className="ml-2 w-1/2">
              <h4 className="font-bold text-base">RideGo <span><i className="ri-user-line"></i>4</span></h4>
              <h5 className="font-bold text-sm">2 mins away</h5>
              <p className="font-bold  text-xs text-gray-600" >Affordable, compact rides</p>
            </div>
            <h2 className="text-xl font-semibold">₹{props.fare.car || 193.2}</h2>
          </div>

          <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('moto')
            props.setVehiclePanel(false)
          }} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 item-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <img className="h-12 " src="https://imgs.search.brave.com/kSMXuM56UQqAWLE06lLZhYoJbq_7eu-cnbzHG4LqstQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjgv/MDUxLzI4NC9zbWFs/bC9lbGVjdHJpYy1t/b3RvcmJpa2UtZWxl/Y3RyaWMtYmlrZS1l/bGVjdHJpYy12ZWhp/Y2xlLXRyYW5zcGFy/ZW50LWJhY2tncm91/bmQtYWktZ2VuZXJh/dGVkLXBuZy5wbmc" alt="" />
            <div className=" w-1/2">
              <h4 className="font-bold text-base">Moto <span><i className="ri-user-line"></i>1</span></h4>
              <h5 className="font-bold text-sm">3 mins away</h5>
              <p className="font-bold  text-xs text-gray-600" >Affordable, motorcycle rides</p>
            </div>
            <h2 className="text-xl font-semibold">₹{props.fare.moto || 65}</h2>
          </div>

          <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.selectVehicle('auto')
            props.setVehiclePanel(false)
          }} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 item-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <img className="h-15 " src="https://imgs.search.brave.com/C9zRSwMFUwc2AvIQqoKolRq_KA1rpiPUef7dW_SkdXc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjgv/NzY0LzE4OC9zbWFs/bC9jdXRlLWF1dG8t/cmlja3NoYXctaXNv/bGF0ZWQtb24tdHJh/bnNwYXJlbnQtYmFj/a2dyb3VuZC1wbmcu/cG5n" alt="" />
            <div className="ml-5 w-1/2">
              <h4 className="font-bold text-base">RideAuto <span><i className="ri-user-line"></i>3</span></h4>
              <h5 className="font-bold text-sm">3 mins away</h5>
              <p className="font-bold  text-xs text-gray-600" >Affordable Auto rides</p>
            </div>
            <h2 className="text-xl font-semibold">₹{props.fare.auto || 118.86}</h2>
          </div>
    </div>
  )
}

export default VehiclePanel