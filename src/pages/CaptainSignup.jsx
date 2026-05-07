import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);


  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    
    
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      captainData,
    ).then((res) => {
        if (res.status === 201) {
          
        const data = res.data;
        setCaptain(data.captain || data.user);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
      }).catch((err) => {
        
        throw err.response.data
      })
      
      
   

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="p-7 flex flex-col justify-between min-h-screen bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-6 mt-4">
          <img src="/src/assets/ridecaptain.png" alt="logo" className="w-40 object-contain drop-shadow-md" />
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Become a Captain</h2>
          <form onSubmit={submitHandler}>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">First Name</label>
                <input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Last Name</label>
                <input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                type="password"
                placeholder="Create a password"
              />
            </div>

            <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4 border-b pb-2">Vehicle Information</h3>
            
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Vehicle Color</label>
                <input
                  required
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className="input-field"
                  type="text"
                  placeholder="e.g. Red"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Vehicle Plate</label>
                <input
                  required
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="input-field"
                  type="text"
                  placeholder="AB 12 CD 3456"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Capacity</label>
                <input
                  required
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  className="input-field"
                  type="number"
                  placeholder="Number of seats"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Type</label>
                <select
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="input-field py-3.5"
                >
                  <option value="" disabled>Select</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>
            </div>

            <button className="btn-primary mb-6 bg-yellow-500 hover:bg-yellow-600 text-black shadow-yellow-500/30">
              Create Captain Account
            </button>
          </form>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/captain/login" className="text-yellow-600 font-semibold hover:underline">
              Login here
            </Link>{" "}
          </p>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto mt-6 pb-6">
        <p className="text-[13px] leading-tight text-gray-500 text-center">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from RideOn and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
