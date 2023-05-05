
import { nanoid } from 'nanoid'
import { Attrs, StyleItem, Styles } from './type'
import { configAttr, ConfigAttrKey, ConfigKey, configStyle } from './config'

type StyleObj = {
  [key in ConfigKey]?: StyleItem
}

export class Style {
  private styles!: Styles
  private _top = 0
  private _left = 0

  private _posObj: StyleObj = {

  }
  private _fontObj: StyleObj = {

  }
  constructor() {
    // this.styles = { position: [], fontSet: [] }
  }
  /**
   */
  get left() {
    return this._posObj.left?.val || 0
  }

    /**
   * @deprecated
   */
  get top() {
    return this._posObj.top?.val || 0
  }
  /**
   * 所有的样式
   * Object的key小驼峰命名
   * return Object
   */
  get allStyles() {
    const o: any = {}
    Object.values(this._fontObj).forEach(item => {
      o[item.style] = item.val + "" + (item.unit || "")
    })
    Object.values(this._posObj).forEach(item => {
      o[item.style] = item.val + "" + (item.unit || "")
    })
    // // o.left = this._left + 'px'
    // o.top = this._top + 'px'
    return o;


  }

  /**
   * 保存样式值
   */
  get values() {
    const o: any = {
      font: {},
      pos: {}
    }
    Object.values(this._fontObj).forEach(item => {
      o.font[item.style] = item.val
    })
    Object.values(this._posObj).forEach(item => {
      o.pos[item.style] = item.val
    })
    return o;
  }

  /**
   * 所有和位置相关的信息
   * return StyleItem[]
   */
  get pos() {
    return Object.values(this._posObj)
  }
  /**
 * 所有和字体相关的信息
 * return StyleItem[]
 */
  get fonts() {
    return Object.values(this._fontObj)
  }
  /**
   * 通过对象初始化值
   * @param el: obj {font:{fontSize:16}, pos:{left:14}} 
   */
  initStyle(obj: any) {
    Object.keys(obj).forEach(key => {
      if (key == 'font') {
        this.setFont(obj.font)
      } else if (key == 'pos') {
        this.setPos(obj.pos)
      }
    })

  }

  /**
   * 设置样式信息
   * @param position string[] 
   * @param fonts string[]
   * @returns Style
   */
  buildStyle(position: ConfigKey[] = ["width", "height"], fonts: ConfigKey[] = ["fontSize"]) {
    position.forEach(key => {
      const obj = configStyle[key]
      if (obj)
        this._posObj[key] = { ...obj }
    })
    fonts.forEach(key => {
      const obj = configStyle[key]
      if (obj)
        this._fontObj[key] = { ...obj }
      // this.styles.fontSet.push({ ...configStyle[key] })
    })
    return this;
  }
  /**
   * 设置位置信息
   * @param key 样式的名字
   * @param val 设置的值
   * @returns  Style
   */
  setPos(obj: any,) {
    Object.keys(obj).forEach((_key) => {
      const key = _key as unknown as ConfigKey
      const tmp = this._posObj[key]
      if (tmp) {
        tmp.val = obj[_key] || ""
      }
    })


    return this
  }
  /**
   * 设置字体相关的样式
   * @param key 字体的名字 
   * @param val 设置的值
   * @returns Style
   */
  setFont(obj: any) {
    Object.keys(obj).forEach((_key) => {
      const key = _key as unknown as ConfigKey
      const tmp = this._fontObj[key]
      if (tmp) {
        tmp.val = obj[_key] || ""
      }
    })
    return this;
  }






}
type AttrObj = {
  [key in ConfigAttrKey]?: StyleItem
}
type AttrClz = "_publicAttr" | "_basicAttr" | "_dataAttr" | "_labelAttr" | "_axisAttr"

/**
 * 组件的基础属性
 */
export class Attr {
  private _publicAttr: AttrObj = {} // 公共属性
  private _basicAttr: AttrObj = {} // 基础属性
  private _dataAttr: AttrObj = {} // 数据配置
  private _labelAttr: AttrObj = {} // 数据配置
  private _axisAttr: AttrObj = {} // 数据配置
  constructor() {
  }
  /**
   * 获得属性数据
   * @param type 
   * @returns 
   */
  getAttr(type: AttrClz) {
    return JSON.parse(JSON.stringify(this[type])) as AttrObj
  }

  // get publicAttr() {
  //   return this._publicAttr
  // }

  hasAttr(type: AttrClz) {
    return Object.keys(this[type]).length
  }


  /**
 * 保存样式值
 */
  get attrs() {
    const o: any = {
      _publicAttr: {},
      _basicAttr: {},
      _dataAttr: {},
      _labelAttr: {},
      _axisAttr: {},

    }
    Object.keys(o).forEach(key => {
      const tmp = key as AttrClz
      this.setVal(this[tmp], o[key])

    })
    // this.setVal(this._publicAttr, o._publicAttr)
    return o;
  }

  private setVal(src: any, des: any) {
    Object.keys(src).forEach(key => {
      des[key] = src[key].val
    })
  }
  /**
   * 初始化值
   * @param obj  { _publicAttr:{name:'静态文本'}}
   */
  initAttr(obj: any) {
    Object.keys(obj).forEach(key => {
      const tmp = key as AttrClz
      this.setAttr(tmp, obj[key])
    })
  }

  /**
   * 设置属性
   * @param basicAttr 基础属性
   * @param publicAttr 
   * @returns 
   */
  buildAttr(basicAttr: ConfigAttrKey[] = ["input"], type: string) {
    basicAttr.forEach(key => {
      //@ts-ignore
      if (!this[type]) {
        //@ts-ignore
        this[type] = {}

      }
      //@ts-ignore
      this[type][key] = { ...configAttr[key] }
      // this.attrs.basicAttr.push({ ...configAttr[key] })
    })
    // publicAttr.forEach(key => {
    //   this.attrs.publicAttr.push({ ...configAttr[key] })
    // })
    return this;
  }
  /**
   * 设置属性
   * @param type 
   * @param attrObj 
   */
  setAttr(type: AttrClz, attrObj: any) {
    if (this[type]) {
      for (let key in attrObj) {
        let tmp = key as ConfigAttrKey
        if (this[type][tmp]) {
          this[type][tmp]!.val = attrObj[tmp]
        }

      }
    }
  }


}






export class ComponentInfo {
  id = nanoid()
  name = ""
  private _style: Style
  private _attr!: Attr

  constructor(name?: string) {
    if (name)
      this.name = name
    this._style = new Style()
    this._attr = new Attr()
  }
  get attr() {
    return this._attr
  }

  get style() {
    return this._style
  }


}
