import { useRef, useState } from "react"
import CrossIcon from "../../icons/CrossIcon"
import InputBox from "../InputBox"
import Button from "./Button"
import { BACKEND_URL } from "../../config"
import axios from "axios"

enum ContentType {
  Youtube= "Youtube",
  Twitter= "Twitter"
}

const AddContentModal = ({open, onClose}) => {
  const titleRef = useRef<any>()
  const linkRef = useRef<any>()
  const [type,setType] = useState(ContentType.Youtube)

  async function addContent(){
    const title = titleRef.current?.value
    const link = linkRef.current?.value

    await axios.post(`${BACKEND_URL}/api/v1/content`,{
      link,
      title,
      type
    },{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    onClose()
  }
  return (
    <div>
      { open && <div>
        <div className='bg-black h-screen flex justify-center w-screen fixed top-0 left-0 opacity-60'>
        
      </div>

        <div className=' h-screen flex justify-center w-screen fixed top-0 left-0'>
        <div className="flex flex-col justify-center">
          <span className="bg-white p-5 rounded">
            <div className="flex justify-end">
             <div className="cursor-pointer" onClick={onClose}>
              <CrossIcon/>
             </div>
            </div>
            <div>
              <InputBox reference={titleRef} placeholder={"Title"}/>
              <InputBox reference={linkRef} placeholder={"Link"}/>
            </div>
            <h1>Type</h1>
            <div className="flex justify-center p-3 gap-1">
              <Button text="Youtube" variant={type === ContentType.Youtube?"primary":"secondary"} size="sm" loading={false} onClick={()=>{
                setType(ContentType.Youtube)
              }}/>
              <Button text="Twitter" variant={type === ContentType.Twitter?"primary":"secondary"} size="sm" loading={false} onClick={()=>{
                setType(ContentType.Twitter)
              }}/>
            </div>
            <div className="flex justify-center">
            <Button onClick={addContent} variant="primary" text="Submit" size="md"/>

            </div>
          </span>
        </div>
      </div>
      </div>
      
      }
    </div>
  )
}

export default AddContentModal
