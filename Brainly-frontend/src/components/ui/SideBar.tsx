import BrainIcon from "../../icons/BrainIcon"
import Xicon from "../../icons/Xicon"
import YoutubeIcon from "../../icons/YoutubeIcon"
import SideBarIcons from "./SideBarIcons"

const SideBar = () => {
  return (
    <div className="left-0 top-0 border-r h-screen pt-3 w-72 pl-4 bg-white fixed">
        <div className="text-2xl font-medium flex items-center">
        <BrainIcon/>
        <div className="pl-3">
        Brainly
        </div>
        </div>
      <div className="pt-4">
        <SideBarIcons icon={<YoutubeIcon/>} text={"Youtube"}/>
        <SideBarIcons icon={<Xicon/>} text={"Twitter"}/>
      </div>
    </div>
  )
}

export default SideBar
