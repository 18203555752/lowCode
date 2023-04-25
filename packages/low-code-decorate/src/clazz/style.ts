
import { nanoid } from 'nanoid'
import { Attrs, StyleItem, Styles } from './type'
import { configAttr, ConfigAttrKey, ConfigKey, configStyle } from './config'



class Style {
  private styles!: Styles
  private _top = 0
  private _left = 0
  constructor() {
    this.styles = { position: [], fontSet: [] }
  }
  get left() {
    return this.styles.position[2]
  }
  get top() {
    return this.styles.position[3]
  }
  /**
   * 所有的样式
   * Object的key小驼峰命名
   * return Object
   */
  get allStyles() {
    const o: any = {}
    this.styles.position.forEach(item => {
      o[item.style] = item.val + "" + (item.unit || "")
    })
    this.styles.fontSet.forEach(item => {
      o[item.style] = item.val + "" + (item.unit || "")
    })
    o.left = this._left + 'px'
    o.top = this._top + 'px'
    return o;


  }

  /**
   * 所有和位置相关的信息
   * return StyleItem[]
   */
  get pos() {
    return this.styles.position
  }
  /**
 * 所有和字体相关的信息
 * return StyleItem[]
 */
  get fonts() {
    return this.styles.fontSet
  }

  /**
   * 查找需要更新的样式
   * @param key 
   * @param styleList 
   * @returns 
   */
  private getStyleItemByKey(key: string, styleList: StyleItem[]): StyleItem | undefined {
    return styleList.find(item => item.style === key)
  }

  /**
   * 设置样式信息
   * @param position string[] 
   * @param fonts string[]
   * @returns Style
   */
  buildStyle(position: ConfigKey[] = ["width", "height"], fonts: ConfigKey[] = ["fontSize"]) {
    position.forEach(key => {
      this.styles.position.push({ ...configStyle[key] })
    })
    fonts.forEach(key => {
      this.styles.fontSet.push({ ...configStyle[key] })
    })
    return this;
  }
  /**
   * 设置位置的left和top信息绝对或相对定位
   * @param left 
   * @param top 
   * @returns Style
   */
  setLeftAndTop(left: number, top?: number) {
    this._left = left;
    if (top) {
      this._top = top
    }
    return this
  }

  /**
   * 设置位置信息
   * @param key 样式的名字
   * @param val 设置的值
   * @returns  Style
   */
  setPos(key: string, val: number | string) {
    const tmp = this.getStyleItemByKey(key, this.styles.position)
    if (tmp) {
      tmp.val = val
    }
    return this
  }
  /**
   * 设置字体相关的样式
   * @param key 字体的名字 
   * @param val 设置的值
   * @returns Style
   */
  setFont(key: string, val: number | string) {
    const tmp = this.getStyleItemByKey(key, this.styles.fontSet)
    if (tmp) {
      tmp.val = val
    }
    return this;
  }

}
/**
 * 组件的基础属性
 */
class Attr {
  private _attrs!: Attrs
  constructor() {
    this._attrs = {
      publicAttr: [],
      basicAttr: []
    }
  }
get attrs() {
  return this._attrs
}

  get val() {
    return (this.attrs.basicAttr.find(item => item.style == "input")?.val || "") as string
  }
  set val(val: string | number) {
    const item = this.attrs.basicAttr.find(item => item.style == "input")
    if (item)
      item.val = val;
  }
  /**
   * 设置属性
   * @param basicAttr 基础属性
   * @param publicAttr 
   * @returns 
   */
  buildAttr(basicAttr: ConfigAttrKey[] = ["input"], publicAttr: ConfigAttrKey[] = []) {
    basicAttr.forEach(key => {
      this.attrs.basicAttr.push({ ...configAttr[key] })
    })
    publicAttr.forEach(key => {
      this.attrs.publicAttr.push({ ...configAttr[key] })
    })
    return this;
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
