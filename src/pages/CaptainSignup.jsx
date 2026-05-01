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
        setCaptain(data.user);
        localStorage.setItem("token", data.token);
        navigate("/captain/home");
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
    <div className="p-7 flex flex-col justify-between h-screen">
      <img src="/src/assets/ridecaptain.png" alt="logo" className="h-[24%] " />

      <div>
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium  mb-2">What's your name</h3>
          <div className="flex gap-4">
            <input
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="First Name"
            />

            <input
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <h3>Enter your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Enter your email"
          />
          <h3>Enter your password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Enter your password"
          />

          <h3>Vehicle Information</h3>
          <div className="mb-7">
            <h4>Vehicle Color</h4>
            <input
              required
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
              className="bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Enter vehicle color"
            />
          </div>

          <div className="mb-7">
            <h4>Vehicle Plate</h4>
            <input
              required
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
              className="bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Enter vehicle plate number"
            />
          </div>

          <div className="mb-7">
            <h4>Vehicle Capacity</h4>
            <input
              required
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
              className="bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="number"
              placeholder="Enter vehicle capacity"
            />
          </div>

          <div className="mb-7">
            <h4>Vehicle Type</h4>
            <select
              required
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
              className="bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            >
              <option value="" disabled>
                Select vehicle type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-7 rounded-xl px-4 py-2  w-full text-lg placeholder:text-base">
            Create Capatain Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain/login" className="text-blue-600">
            Login here
          </Link>{" "}
        </p>
      </div>

      <div>
        <p className="text-[15px] leading-tight ">
          {" "}
          By proceeding, you consent to get calls, whatsApp or SMS message,
          including by automated means, from RideOn and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
