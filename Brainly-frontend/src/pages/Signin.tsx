import axios from "axios";
import InputBox from "../components/InputBox"
import Button from "../components/ui/Button"
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
        const usernameRef = useRef<any>();
        const passwordRef = useRef<any>();
        const navigate = useNavigate();
      
        async function signin(){
          const email = usernameRef.current?.value;
          const password = passwordRef.current?.value;
          const response = await axios.post(BACKEND_URL + "/api/v1/signin",{
              email,
              password
          })
          const jwt = response.data.token;
          localStorage.setItem("token",jwt)
          navigate("/dashboard")
        }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white rounded min-w-72 p-6">
        <div className="flex justify-center text-2xl mb-4">
        Signup
        </div>
        <div className="flex justify-center mb-2">
        <InputBox reference={usernameRef} placeholder="Username" />
        </div>
        <div className="flex justify-center mb-2">
        <InputBox reference={passwordRef} placeholder="Password" />
        </div>
        <div className="flex justify-center">
        <Button onClick={signin} loading={false} text="Signin" variant="primary" size="lg"/>
        </div>
      </div>
    </div>
  )
}

export default Signin