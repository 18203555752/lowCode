# nodemon 启动服务后，在文件改变时自动重启服务

# 数据库连接地址

ip 地址：101.35.250.210
用户名： root

# 后端代码项目结构

分为三层：

## 一、controller

- 路由控制层，根据用户的请求接口，定位相应的资源，匹配 service 层业务代码，并返回用户需要的资源

## 二、service

- 该层代码主要用于处理获取到的数据，根据用户请求对数据做一些逻辑处理

## 三、Dao

- 该层代码主要用于与数据库连接，获取数据库数据，将所获取的数据返回给 service 层做处理。

### 四、保存模版
#### 保存

```
1. https://book.lizhan1227.xyz/low/decorate
2. post
{
  "list": [
      {
          "name": "静态",
          "style": {
              "font": {
                  "fontSize": 14,
                  "fontWeight": "normal",
                  "color": "#da574a"
              },
              "pos": {
                  "width": 0,
                  "height": 100,
                  "top": 140,
                  "left": 285
              }
          },
          "attr": {}
      }
  ],
  "userId":0
}
```
#### 获得一个保存
```
1. https://book.lizhan1227.xyz/low/decorate/1
2.get
```
#### 更新
```
1. https://book.lizhan1227.xyz/low/decorate
2. put
3.格式如新增
```
#### 获得一个保存
```
1. https://book.lizhan1227.xyz/low/decorate/list/1
2.get
3.用户id
```

