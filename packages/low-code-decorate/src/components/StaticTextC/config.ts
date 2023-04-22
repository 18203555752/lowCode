import { BaseComponent } from "@/clazz/style"

export const componentName = 'StaticText'

class StaticTextComponent extends BaseComponent {
  static POSITION = ["width", "height", "left", "top"]
  static FONTS = ["fontSize"]
  constructor() {
    super(componentName)
    this.buildStyle(StaticTextComponent.POSITION, StaticTextComponent.FONTS)

  }
}

export default StaticTextComponent