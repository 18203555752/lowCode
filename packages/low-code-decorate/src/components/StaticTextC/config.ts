import { ConfigKey } from "@/clazz/config"
import { ComponentInfo } from "@/clazz/style"

export const componentName = 'StaticText'

class StaticTextComponent extends ComponentInfo {
  static POSITION: ConfigKey[] = ["width", "height"]
  static FONTS: ConfigKey[] = ["fontSize","fontWeight"]
  constructor(name: string) {
    super(name)
    this.style.buildStyle(StaticTextComponent.POSITION, StaticTextComponent.FONTS)

  }
}

export default StaticTextComponent