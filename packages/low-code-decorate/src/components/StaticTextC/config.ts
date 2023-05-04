import { ConfigAttrKey, ConfigKey } from "@/clazz/config"
import { ComponentInfo } from "@/clazz/style"
export const componentName = 'StaticText'
class StaticTextComponent extends ComponentInfo {
  static POSITION: ConfigKey[] = ["width", "height", "top", "left"]
  static FONTS: ConfigKey[] = ["fontSize", "fontWeight", "color"]
  static BASICATTR: ConfigAttrKey[] = ["selectTxt", "input",]
  static PUBLICATTR: ConfigAttrKey[] = ["name", "component", 'id']
  constructor() {
    super(componentName)
    this.style.buildStyle(StaticTextComponent.POSITION, StaticTextComponent.FONTS)
    this.attr.buildAttr(StaticTextComponent.BASICATTR, "_basicAttr")
    this.attr.buildAttr(StaticTextComponent.PUBLICATTR, "_publicAttr")
    this.attr.setAttr("_basicAttr", { input: "静态文本" })
    this.attr.setAttr("_publicAttr", { name: "静态文本",component: componentName, id:this.id})
  }
}

export default StaticTextComponent