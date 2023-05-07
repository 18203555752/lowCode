import { ConfigAttrKey, ConfigKey } from "@/clazz/config"
import { ComponentInfo } from "@/clazz/style"
export const componentName = 'DateText'
export const nickName = '时间文本'
class DateTextComponent extends ComponentInfo {
  static POSITION: ConfigKey[] = ["width", "height", "top", "left"]
  static FONTS: ConfigKey[] = ["fontSize", "fontWeight", "color"]
  static BASICATTR: ConfigAttrKey[] = ["selectTxt", "input",]
  static PUBLICATTR: ConfigAttrKey[] = ["name", "component", 'id']
  // static DATAATTR: ConfigAttrKey[] = ["upLimit", "downLimit", 'maxVal', 'minVal', 'minOffset', 'maxOffset']
  // static LABELATTR: ConfigAttrKey[] = ["labelColor"]
  // static AXISATTR: ConfigAttrKey[] = ["axisColor", "axisTxtColor", 'xMeshShow', 'yMeshShow']
  constructor() {
    super(componentName)
    this.style.buildStyle(DateTextComponent.POSITION, DateTextComponent.FONTS)
    this.attr.buildAttr(DateTextComponent.BASICATTR, "_basicAttr")
    this.attr.buildAttr(DateTextComponent.PUBLICATTR, "_publicAttr")
    // this.attr.buildAttr(DateTextComponent.DATAATTR, "_dataAttr")
    // this.attr.buildAttr(DateTextComponent.LABELATTR, "_labelAttr")
    // this.attr.buildAttr(DateTextComponent.AXISATTR, "_axisAttr")
    this.attr.setAttr("_basicAttr", { input: "" })
    this.attr.setAttr("_publicAttr", { name: "时间文本", component: componentName, id: this.id })
  }
}

export default DateTextComponent