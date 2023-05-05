import { ConfigStyle, StyleItemType } from "./type";

export const configStyle = {
  'fontSize': {
    type: StyleItemType.Number,
    style: "fontSize",
    name: "字体大小",
    readonly: false,
    val: 14,
    unit: "px",
  },
  'fontWeight': {
    type: StyleItemType.Select,
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
    type: StyleItemType.Color,
    style: "color",
    name: "颜色",
    readonly: false,
    val: "#e43",
  },
  "marginLeft": {
    type: StyleItemType.Number,
    style: "marginLeft",
    name: "左边距",
    readonly: false,
    val: 10,
    unit: "px",
  },
  "marginRight": {
    type: StyleItemType.Number,
    style: "marginRight",
    name: "右边距",
    readonly: false,
    val: 10,
    unit: "px",
  },
  "marginTop": {
    type: StyleItemType.Number,
    style: "marginTop",
    name: "上边距",
    readonly: false,
    val: 10,
    unit: "px",
  },
  "left": {
    type: StyleItemType.Number,
    style: "left",
    name: "左边离",
    readonly: false,
    val: 0,
    unit: "px",
  },
  "top": {
    type: StyleItemType.Number,
    style: "top",
    name: "上边距",
    readonly: false,
    val: 0,
    unit: "px",
  },
  "width": {
    type: StyleItemType.Number,
    style: "width",
    name: "宽度",
    readonly: false,
    val: 300,
    unit: "px",
  },
  "height": {
    type: StyleItemType.Number,
    style: "height",
    name: "高度",
    readonly: false,
    val: 100,
    unit: "px",
  },

}

export const configAttr = {
  'input': {
    type: StyleItemType.TXT,
    style: "input",
    name: "内容",
    readonly: false,
    val: "",
  },
  'name': {
    type: StyleItemType.TXT,
    style: "name",
    name: "名称",
    readonly: true,
    val: "",
  },
  'component': {
    type: StyleItemType.TXT,
    style: "component",
    name: "组件",
    readonly: true,
    val: "",
  },
  'id': {
    type: StyleItemType.TXT,
    style: "id",
    name: "ID",
    readonly: true,
    val: "",
  },
  'selectTxt': {
    type: StyleItemType.Select,
    style: "selectTxt",
    name: "文本类型",
    readonly: false,
    list: [
      { name: "文本", val: "txt" },
      { name: "符号", val: "symbol" },
    ],
    val: "txt",
  },
  'upLimit': {
    type: StyleItemType.Number,
    style: "upLimit",
    name: "上限",
    readonly: false,
    val: "",
  },
  'downLimit': {
    type: StyleItemType.Number,
    style: "downLimit",
    name: "下限",
    readonly: false,
    val: "",
  },
  'maxVal': {
    type: StyleItemType.Number,
    style: "maxVal",
    name: "最大值",
    readonly: false,
    val: 99999,
  },
  'minVal': {
    type: StyleItemType.Number,
    style: "minVal",
    name: "最小值",
    readonly: false,
    val: 0,
  },
  'minOffset': {
    type: StyleItemType.Number,
    style: "minOffset",
    name: "最小偏移量",
    readonly: false,
    val: 0,
  },
  'maxOffset': {
    type: StyleItemType.Number,
    style: "maxOffset",
    name: "最大偏移量",
    readonly: false,
    val: 0,
  },
  'labelColor': {
    type: StyleItemType.Color,
    style: "labelColor",
    name: "label颜色",
    readonly: false,
    val: "#f0f",
  },
  'axisColor': {
    type: StyleItemType.Color,
    style: "axisColor",
    name: "轴线颜色",
    readonly: false,
    val: "#f0f",
  },
  'axisTxtColor': {
    type: StyleItemType.Color,
    style: "axisColor",
    name: "轴线文字颜色",
    readonly: false,
    val: "#f0f",
  },
  'xMeshShow': {
    type: StyleItemType.Switch,
    style: "axisColor",
    name: "X网格线是否显示",
    readonly: false,
    val: false,
  },
  'yMeshShow': {
    type: StyleItemType.Switch,
    style: "yMeshShow",
    name: "y网格线是否显示",
    readonly: false,
    val: false,
  },




}

export type ConfigAttrKey = keyof typeof configAttr

export type ConfigKey = keyof typeof configStyle
