import React, {Component} from 'react'
import './index.css'
import Autocomplete from 'react-autocomplete'

export default class App extends Component {
  render() {
    return (
      <div>
        <Autocomplete>
          <h3>剑三网</h3>
          <p>-</p>
          <p>请输入游戏昵称</p>
          <input name='xsplayer' type='text' placeholder={'玩家姓名'} />
          <p>请输入游戏ID</p>
          <input name='xsphone' type='text' placeholder={'电话号码'} />
        </Autocomplete>
      </div>
    )
  }
}
