import React, {Component, ReactDOM} from 'react'
import {findDOMNode} from 'react-dom'
import './styles.scss'
import './index.css'
import lss from 'localstorage-share'

export default class AutoComplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ifRecommendShow: false,
      recommendList: undefined
    }
    this.name = this.props.listName
  }

  static defaultProps = {
    listName: 'defaultRecommendList',
    listClass: 'rlac-recommend'
  }

  componentDidMount() {
    this.watchInputDom()
  }

  watchInputDom() {
    const rootDom = findDOMNode(this)
    rootDom.addEventListener('focus', (e) => {
      clearTimeout(this.bulrTimer)
      this.inputDom = e.target
      if (this.inputDom) {
        this.name = this.inputDom.name ? this.inputDom.name : this.props.listName
        this.updateList(this.name)

        const enterBlur = (e) => {
          if (e.keyCode === 13) {
            this.inputDom.blur()
            this.inputDom.removeEventListener('keyup', enterBlur)
          }
        }
        this.inputDom.addEventListener('keyup', enterBlur)
      }
    }, true)
    rootDom.addEventListener('change', (e) => {
      const value = e.target.value
      if (value) this.saveList(this.name, value)
    }, true)
    rootDom.addEventListener('blur', () => {
      this.bulrTimer = setTimeout(() => this.setState({ifRecommendShow: false}), 100)
    }, true)
  }

  saveList(key, value) {
    const item = {value, rate: 0}
    lss.getItem(key).then(res => {
      let list = res[key] || []
      const listIndex = this.ifValueInList(list, value)
      if (listIndex >= 0) {
        list[listIndex].rate += 1
      } else {
        if (list.length < 10) {
          list.push(item)
        } else {
          list[10] = item
        }
      }
      list = this.clearNullObjs(list)
      list = this.sortRecommendList(list)
      lss.setItem(key, list)
    })
  }

  // 清理空值对象
  clearNullObjs(list) {
    list.forEach((item, index) => {
      if (!item.value) {
        list.splice(index, 1)
      }
    })
    return list
  }

  // 判断含有某一属性值的对象是否在某个对象列表里
  ifValueInList(list, value) {
    let index = -1
    list.forEach((item, i) => {
      if (item.value === value) index = i
    })
    return index
  }

  // 根据对象的某一属性值重排对象列表
  sortRecommendList(list) {
    const compareObj = (key) => {
      return (a, b) => {
        const x = a[key]
        const y = b[key]
        return (x - y)
      }
    }
    return list.sort(compareObj('rate')).reverse()
  }

  updateList(key) {
    this.setState({ifRecommendShow: false})
    lss.getItem(key).then(res => {
      console.log('recommendList', res)
      if (!res[key]) return
      const recommendPos = this.inputDom.getBoundingClientRect()
      this.setState({ifRecommendShow: true, recommendList: res[key], recommendPos})
    })
  }

  selectRecommend(e) {
    const value = e.target.innerText
    if (value) this.inputDom.value = value
    clearTimeout(this.bulrTimer)
    this.setState({ifRecommendShow: false})
  }

  renderRecommendList() {
    const {
      ifRecommendShow, recommendList = [], recommendPos = {
        left: 0,
        top: 0,
        height: 0,
        width: 0
      }
    } = this.state
    return (
      <div
        style={{
          display: ifRecommendShow ? '' : 'none',
          top: recommendPos.top + recommendPos.height + 5,
          left: recommendPos.left,
          width: recommendPos.width
        }}
        className={this.props.listClass}
        onClick={e => {
          this.selectRecommend(e)
        }}
      >
        {recommendList.map((item, index) => (
          <li key={index}>
            {item.value}
          </li>
        ))}
      </div>
    )
  }

  render() {
    const {children} = this.props
    return (
      <div className='rlac-root'>
        <div className='rlac-main'>{children}</div>
        {this.renderRecommendList()}
      </div>
    )
  }
}
