
import { nanoid } from 'nanoid'
export interface Option {
  name: string
  val: string | number

}


export interface StyleItem {
  type: string
  name: string
  style: string
  readonly?: boolean
  val: string | number
  unit?: string
  list?: Option[]
  sort?: number
}


export interface Styles {
  position: StyleItem[]
  fontSet: StyleItem[]
}
export interface Attrs {
  publicAttr: StyleItem[]
  basicAttr: StyleItem[]
}


export interface Datas {
  list: StyleItem[]
}

interface ConfigStyle {
  [key: string]: StyleItem
}

const configStyle: ConfigStyle = {
  'fontSize': {
    type: "number",
    style: "fontSize",
    name: "字体大小",
    readonly: false,
    val: 14,
    unit: "px",
  },
  'fontWeight': {
    type: "select",
    style: "fontWeight",
    name: "字体宽度",
    readonly: false,
    val: "normal",
    list: [
      { name: "normal", val: "normal" },
      { name: "500", val: 500 },
      { name: "bolder", val: "bolder" },
    ]
  },
  'color': {
    type: "color",
    style: "color",
    name: "颜色",
    readonly: false,
    val: "#333",
  },
  "marginLeft": {
    type: "number",
    style: "marginLeft",
    name: "左边距",
    readonly: false,
    val: 10,
    unit: "px",
  },
  "marginRight": {
    type: "number",
    style: "marginRight",
    name: "右边距",
    readonly: false,
    val: 10,
    unit: "px",
  },
  "marginTop": {
    type: "number",
    style: "marginTop",
    name: "上边距",
    readonly: false,
    val: 10,
    unit: "px",
  },
  "width": {
    type: "number",
    style: "width",
    name: "宽度",
    readonly: false,
    val: 300,
    unit: "px",
  },
  "height": {
    type: "number",
    style: "height",
    name: "高度",
    readonly: false,
    val: 100,
    unit: "px",
  },
  "left": {
    type: "number",
    style: "left",
    name: "x坐标",
    readonly: false,
    val: 0,
    unit: "px",
  },
  "top": {
    type: "number",
    style: "top",
    name: "y坐标",
    readonly: false,
    val: 0,
    unit: "px",
  },
}

export class BaseComponent {
  id : string
  name: string
  private styles!: Styles
  private attrs!: Attrs
  private datas!: Datas
  private _top = 0
  private _left = 0
  private currentActive : boolean
  constructor(name: string) {
    this.id= nanoid()
    // console.log('初始化id', name, this.id)
    this.name = name
    this.styles = { position: [], fontSet: [] }
    this.currentActive = false
  }
  get left() {
    return this.styles.position[2]
  }
  get top() {
    return this.styles.position[3]
  }

  get position() {
    return this.styles.position
  }
  get fonts() {
    return this.styles.fontSet
  }

  get active() {
    return this.currentActive
  }

  buildStyle(position = ["width", "height", "left", "top"], fonts = ["fontSize"]) {
    position.forEach(key => {
      this.styles.position.push(configStyle[key])
    })
    fonts.forEach(key => {
      this.styles.fontSet.push(configStyle[key])
    })
    return this;
  }

  setLeftAndTop(left: number, top?: number) {
    this._top = left;
    if (top) {
      this._top = top
    }
    return this
  }

  setPosition(key: string, val: number | string) {
    const tmp = this.styles.position.find(item => item.style == key)
    if (tmp) {
      tmp.val = val
    }
    return this
  }

  setFont(key: string, val: number | string) {
    const tmp = this.styles.fontSet.find(item => item.style == key)
    if (tmp) {
      tmp.val = val
    }
    return this;
  }

  setCurrentActive(val: boolean) {
    this.currentActive = val
  }
}
