import { Component } from "@/clazz/style"

export const componentName = 'StaticText'

class StaticTextComponent extends Component {
  static POSITION = ["width", "height"]
  static FONTS = ["fontSize"]
  constructor(name: string) {
    super(name)
    this.buildStyle(StaticTextComponent.POSITION, StaticTextComponent.FONTS)

  }
}

export default StaticTextComponent