#### 数据格式设计
```
client login:
{
    'type':'login',
    'nickname':'xxx'
}

server login:
{
    'type':'login',
    'success':true|false,
    'message':'登录成功｜失败',
    'sumUsers':10
}
```

```
client message:
{
    'type':'broadcast',
    'message':'xxx'
}

server message:
{
    'type':'broadcast',
    'nickname':'xxx',
    'message':'xxxx'
}
```

```
@jack hell //此时只有jack 可以收到
client p2p
{
    'type':'p2p',
    'to':'xxx',
    'message':'xxx'
}

server p2p:
{
    'type':'p2p',
    'from':'xxx',
    'to':'xxxx'
    'message':'xxx'
}

log 谁上线/下线了
```

#### 功能实现：
##### 1、用户登录