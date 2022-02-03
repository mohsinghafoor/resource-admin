import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css"
import "@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css"
import * as iconDefs from "../IconDefs"
import { useRecoilValue, useSetRecoilState } from "recoil"
import "./styles.scss"
import { iconAtom } from "../../../../store/listing"
const IconPicker = (props) => {
  const setIconClass = useSetRecoilState(iconAtom)
  const iconClass = useRecoilValue(iconAtom)

  const handleChange = (value) => {
    setIconClass(value)
  }

  return (
    <FontIconPicker
      icons={iconDefs.icons}
      value={iconClass}
      theme="bluegrey"
      isMulti={false}
      onChange={handleChange}
    />
  )
}

export default IconPicker
