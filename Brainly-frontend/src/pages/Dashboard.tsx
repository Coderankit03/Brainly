import { useEffect, useState } from "react";
import AddContentModal from "../components/ui/AddContentModal";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Plus from "../icons/Plus";
import ShareIcon from "../icons/ShareIcon";
import SideBar from "../components/ui/SideBar";
import useContent from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents,refresh} = useContent()

  useEffect(()=>{
    refresh()
  },[modalOpen])
  return (
    <>
      <div className="">
        <SideBar/>
        <div>
        <div className="p-5 ml-72 bg-gray-200 min-h-screen">
        <AddContentModal open={modalOpen} onClose={()=>{
          setModalOpen(false);
        }}/>
      <div className="flex justify-end gap-3">
      <Button
        startIcon={<Plus size="md" />}
        variant="primary"
        text="Add Content"
        size="md"
        onClick={()=>{
          setModalOpen(true)
        }}
      />
      <Button
        onClick={async ()=>{
          const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
            share: true
          },{
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          })
          const shareUrl = `http://localhost:5173/share/${response.data.hash}`
          alert("Share Url : " + shareUrl)
        }}
        startIcon={<ShareIcon size="md" />}
        variant="secondary"
        text="Share brain"
        size="md"
      />
      </div>
      <div className="flex gap-4 flex-wrap">
        {contents.map(({title,link,type})=>
          <Card
          type={type}
          link={link}
          title={title}
        />
        )}
        
      </div>
      </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
