
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
    style: "marginTop",
    name: "宽度",
    readonly: false,
    val: 100,
    unit: "px",
  },
  "height": {
    type: "number",
    style: "marginTop",
    name: "高度",
    readonly: false,
    val: 100,
    unit: "px",
  },

}

class Component {
  private com: Function
  private styles!: Styles
  private attrs!: Attrs
  private datas!: Datas
  private _top = 0
  private _left = 0
  constructor(fn: Function) {
    this.com = fn
    this.styles = { position: [], fontSet: [] }
  }
  get left() {
    return this._left
  }
  get top() {
    return this._top
  }

  get pos() {
    return this.styles.position
  }
  get fonts() {
    return this.styles.fontSet
  }

  buildStyle(position = ["width", "height"], fonts = ["fontSize"]) {
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

  setPos(key: string, val: number | string) {
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
}
