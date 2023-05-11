import { ConfigAttrKey, ConfigKey } from "@/clazz/config"
import { ComponentInfo } from "@/clazz/style"
export const componentName = 'BasicBarChart'
export const nickName = '基础柱状图'
class BasicBarChartComponent extends ComponentInfo {
  static POSITION: ConfigKey[] = ["width", "height", "top", "left"]
  static FONTS: ConfigKey[] = ["fontSize", "fontWeight", "color"]
  static BASICATTR: ConfigAttrKey[] = ["selectTxt", "input",]
  static PUBLICATTR: ConfigAttrKey[] = ["name", "component", 'id']
  static DATAATTR: ConfigAttrKey[] = ["upLimit", "downLimit", 'maxVal', 'minVal', 'minOffset', 'maxOffset']
  static LABELATTR: ConfigAttrKey[] = ["labelColor"]
  static AXISATTR: ConfigAttrKey[] = ["axisColor", "axisTxtColor", 'xMeshShow', 'yMeshShow']
  constructor() {
    super(componentName)
    this.style.buildStyle(BasicBarChartComponent.POSITION,[])
    // this.attr.buildAttr(BasicBarChartComponent.BASICATTR, "_basicAttr")
    this.attr.buildAttr(BasicBarChartComponent.PUBLICATTR, "_publicAttr")

    this.style.setPos({width: 350})
    this.style.setPos({height: 250})
    this.attr.buildAttr(BasicBarChartComponent.DATAATTR, "_dataAttr")
    this.attr.buildAttr(BasicBarChartComponent.LABELATTR, "_labelAttr")
    this.attr.buildAttr(BasicBarChartComponent.AXISATTR, "_axisAttr")
    // this.attr.setAttr("_basicAttr", { input: "" })
    this.attr.setAttr("_publicAttr", { name: "基础柱状图", component: componentName, id: this.id })
  }
}

export default BasicBarChartComponent