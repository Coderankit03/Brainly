import { useRef } from "react"
import InputBox from "../components/InputBox"
import Button from "../components/ui/Button"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const usernameRef = useRef<any>();
  const passwordRef = useRef<any>();
  const navigate = useNavigate()

  async function signup(){
    const email = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/signup",{
        email,
        password
    })
    navigate("/dashboard")
    alert("you have signed up!")
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white rounded min-w-72 p-6">
        <div className="flex justify-center text-2xl mb-4">
        Signup
        </div>
        <div className="flex justify-center mb-2">
        <InputBox reference={usernameRef} placeholder="Email" />
        </div>
        <div className="flex justify-center mb-2">
        <InputBox reference={passwordRef} placeholder="Password" />
        </div>
        <div className="flex justify-center">
        <Button onClick={signup} loading={false} text="Signup" variant="primary" size="lg"/>
        </div>
      </div>
    </div>
  )
}

export default Signup
