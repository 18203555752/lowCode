import { useState } from 'react';
//@ts-ignore
import { SketchPicker } from 'react-color'
export const Color = (props: any) => {
  const { color, value, onChange } = props;
  const [defaultColor, setDefaultColor] = useState(value)
  function onchange(a: any) {
    // console.log(a)
    setDefaultColor(a.hex)

    onChange(a.hex)

  }
  return <div className="color-bg" style={{ width: "100%", height: "20px" }}>
    <span style={{ background: color, display: "block", height: "90%", width: "100%" }}></span>
    <SketchPicker className="color-panel" color={color} onChange={onchange} />

  </div>

}