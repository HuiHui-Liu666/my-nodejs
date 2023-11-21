# egg-mongooese   nodejs 16 
## 一、环境配置：
```
    1、npm init egg —type=simple
    2、npm i 

    3、npm i egg-mongoose --save
    4、在config/plugin.js里面添加配置：
    mongoose: {
        enable: true,
        package: 'egg-mongoose',
    },
    5、在config/config.default.js里面配置：
    config.mongoose = { //默认27017端口,会自动创建下面的库
        url: 'mongodb://127.0.0.1/blog',
        option: {},
    };
```
## 二、编写Schema   app/model/posts.js
## 三、设计路由，添加数据：
```
    路由：router.js  增删改茶：
        router.resources('posts', '/api/posts', controller.home);
    控制器：controller/home.js

    接收post请求的时候需要在 请求头 添加 x-csrf-token字段  字段值为 ctx.csrf
    
    针对每次返回的信息：try catch处理 ； httpController
    


```




## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org




