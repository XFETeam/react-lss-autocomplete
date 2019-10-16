# react-lss-autocomplete

> 通过共享存储进行输入推荐

[![NPM](https://img.shields.io/npm/v/react-lss-autocomplete.svg)](https://www.npmjs.com/package/react-autocomplete) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-lss-autocomplete
```

## Usage

```jsx
import React, { Component } from 'react'

import Rlac from 'react-lss-autocomplete'

class Example extends Component {
  render () {
    return (
        <Rlac>         
          <p>请输入游戏昵称</p>
          <input name='xsplayer' type='text' placeholder={'玩家姓名'} />
        </Rlac>
    )
  }
}
```

## Example

在逍遥网输入过的游戏ID信息会被保存到本地共享存储中，剑三网的输入推荐值可以读取这条信息，亲自测试👇
* [逍遥网](https://browniu.github.io/react-lss-autocomplete/)
* [剑三网](https://browniu.github.io/react-lss-autocomplete-example/)
      
## License

MIT © [browniu](https://github.com/browniu)
