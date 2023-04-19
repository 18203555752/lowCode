import { FC } from "react"

interface Props {
  name: string
}
const CenterCanvas:FC<Props> = ({name}) => {
  return <div>{name}</div>
}

export default CenterCanvas