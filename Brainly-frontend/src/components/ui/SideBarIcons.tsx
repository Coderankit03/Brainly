import { ReactElement } from "react"

const SideBarIcons = ({icon,text}: {
    icon: ReactElement,
    text: String;
}) => {
  return (
    <div className="flex gap-2 py-2">
      {icon} {text}
    </div>
  )
}

export default SideBarIcons
