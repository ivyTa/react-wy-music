# react-learn

# 1. react

## 1.1. [高级指南](https://reactjs.org/docs/jsx-in-depth.html)

### 1.1.1 [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)

1. JSX 只是给React.createElement(component, props, ...children) 提供了语法糖

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
与下面的是相等的

```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

没有子元素的时候，可以这样写

```js
<div className="sidebar" />
```

等同于

```js
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```

2.  点语法

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

3. 自定义的组件必须大写

```js
import React from 'react';

// Correct! This is a component and should be capitalized:
function Hello(props) {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Correct! React knows <Hello /> is a component because it's capitalized.
  return <Hello toWhat="World" />;
}
```


4. JSX 的类型不能是一个表达式

    + 错误方式
    
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}

```
    + 正确方式
    
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}


```
    
5. Props in JSX
    
5.1. 字符串props, 下面两种写法一样的
    
```js
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />


<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
``` 
       
5.2. Props 默认是 “True” 
     
- 如果没有给prop赋值，默认是'true'

```js
// 同等
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

- 一般来说，我们不建议使用它，因为它可能与{foo：foo}而不是{foo：true}的ES6对象速记{foo}混淆。这种行为就是为了匹配HTML的行为

5.3. 扩展运算符

- 以下两种是等价的

```js
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

5.4 Booleans, Null, and Undefined 是被忽略的

```js
//以下是同等的
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>

```

- 一些应用场景

```js
//showHeader为true的时候，展示header组件
<div>
  {showHeader && <Header />}
  <Content />
</div>
```
> 0 还是会被渲染的，所以要值的注意

```js
<div>
{props.messages.length > 0 &&
 <MessageList messages={props.messages} />
}
</div>
```


- 如果你想展示false, true, null, or undefined ，首先得把他们转换成字符串

```js
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```

### 1.1.2 [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

> React.PropTypes 已经在 v15.5被移除了. 请使用 prop-types 库.


```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

- PropTypes 提供了一种验证，可以保证传入的数据格式是正确的，如果是一个无效数据，控制台会有一个警告。propTypes只有在开发环境才会检查。

1. 通过设置defaultProps 来设定默认值

```js
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```
typechecking 也适用于defaultProps




### 1.1.3 [Static Type Checking](https://reactjs.org/docs/static-type-checking.html)


### 1.1.4 [Refs and the DOM
](https://reactjs.org/docs/refs-and-the-dom.html)


#### 1.1.4.1 什么时候用Refs

1. 管理焦点、文本选择或媒体回放。Managing focus, text selection, or media playback.
2. 触发必要的动画。Triggering imperative animations.
3. 与第三方DOM库集成。Integrating with third-party DOM libraries.


#### 1.1.4.2 不要过度使用Refs

1. 














    
    



























## 1.2. 

## 1.3. react-css-modules

### 1.3.1. **样式默认局部**

- 使用了 CSS Modules 后，就相当于给每个 class 名外加加了一个 :local，以此来实现样式的局部化，如果你想切换到全局模式，使用对应的 :global。

```css
.normal {
  color: green;
}

/* 以上与下面等价 */
:local(.normal) {
  color: green; 
}

/* 定义全局样式 */
:global(.btn) {
  color: red;
}

/* 定义多个全局样式 */
:global {
  .link {
    color: green;
  }
  .box {
    color: yellow;
  }
}
```
### 1.3.2. **Compose 来组合样式**

- 对于样式复用，CSS Modules 只提供了唯一的方式来处理：composes 组合

```css
/* components/Button.css */
.base { /* 所有通用的样式 */ }

.normal {
  composes: base;
  /* normal 其它样式 */
}

.disabled {
  composes: base;
  /* disabled 其它样式 */
}
```

```js
import styles from './Button.css';

buttonElem.outerHTML = `<button class=${styles.normal}>Submit</button>`
```

生成的 HTML 变为

```html
<button class="button--base-daf62 button--normal-abc53">Submit</button>
```

由于在 .normal 中 composes 了 .base，编译后会 normal 会变成两个 class。

- composes 还可以组合外部文件中的样式。

```css
/* settings.css */
.primary-color {
  color: #f40;
}

/* components/Button.css */
.base { /* 所有通用的样式 */ }

.primary {
  composes: base;
  composes: primary-color from './settings.css';
  /* primary 其它样式 */
}
```

- 对于大多数项目，有了 composes 后已经不再需要 Sass/Less/PostCSS。但如果你想用的话，由于 composes 不是标准的 CSS 语法，编译时会报错。就只能使用预处理器自己的语法来做样式复用了。
  
### 1.3.3. **class 命名技巧**

CSS Modules 的命名规范是从 BEM 扩展而来。BEM 把样式名分为 3 个级别，分别是：

- Block：对应模块名，如 Dialog

- Element：对应模块中的节点名 Confirm Button

- Modifier：对应节点相关的状态，如 disabled、highlight

- 综上，BEM 最终得到的 class 名为 dialog__confirm-button--highlight。使用双符号 __ 和 -- 是为了和区块内单词间的分隔符区分开来。虽然看起来有点奇怪，但 BEM 被非常多的大型项目和团队采用。我们实践下来也很认可这种命名方法。

- CSS Modules 中 CSS 文件名恰好对应 Block 名，只需要再考虑 Element 和 Modifier。BEM 对应到 CSS Modules 的做法是：
  
```css
/* .dialog.css */
.ConfirmButton--disabled {
}
```

你也可以不遵循完整的命名规范，使用 camelCase 的写法把 Block 和 Modifier 放到一起：

```css
/* .dialog.css */
.disabledConfirmButton {
}
```

### 1.3.4. **如何实现CSS，JS变量共享**

>注：CSS Modules 中没有变量的概念，这里的 CSS 变量指的是 Sass 中的变量

- 上面提到的 :export 关键字可以把 CSS 中的 变量输出到 JS 中。下面演示如何在 JS 中读取 Sass 变量：

```scss
/* config.scss */
$primary-color: #f40;

:export {
  primaryColor: $primary-color;
}
```

```js
/* app.js */
import style from 'config.scss';

// 会输出 #F40
console.log(style.primaryColor);
```
### 1.3.5. CSS Modules 使用技巧

- CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则：

    + 不使用选择器，只使用 class 名来定义样式
    + 不层叠多个 class，只使用一个 class 把所有样式定义好
    + 所有样式通过 composes 组合来实现复用
    + 不嵌套
    
- 上面之所以称为建议，是因为 CSS Modules 并不强制你一定要这么做.
  
### 1.3.6. CSS Modules 结合 React 实践

- 在 className 处直接使用 css 中 class 名即可。

```css
/* dialog.css */
.root {}
.confirm {}
.disabledConfirm {}
```

```js
import classNames from 'classnames';
import styles from './dialog.css';

export default class Dialog extends React.Component {
  render() {
    const cx = classNames({
      [styles.confirm]: !this.state.disabled,
      [styles.disabledConfirm]: this.state.disabled
    });

    return <div className={styles.root}>
      <a className={cx}>Confirm</a>
      ...
    </div>
  }
}
```
- 注意，一般把组件最外层节点对应的 class 名称为 root。这里使用了 classnames 库来操作 class 名。
  如果你不想频繁的输入 styles.**，可以试一下 react-css-modules，它通过高阶函数的形式来避免重复输入 styles.**。
  
  
### 1.3.7. 外部如何覆盖局部样式

当生成混淆的 class 名后，可以解决命名冲突，但因为无法预知最终 class 名，不能通过一般选择器覆盖。我们现在项目中的实践是可以给组件关键节点加上 data-role 属性，然后通过属性选择器来覆盖样式。

```js
// dialog.js
  return <div className={styles.root} data-role='dialog-root'>
      <a className={styles.disabledConfirm} data-role='dialog-confirm-btn'>Confirm</a>
      ...
  </div>
```

```css
// dialog.css
[data-role="dialog-root"] {
  // override style
}
```

因为 CSS Modules 只会转变类选择器，所以这里的属性选择器不需要添加 :global。

#### 1.3.8. 如何与全局样式共存

前端项目不可避免会引入 normalize.css 或其它一类全局 css 文件。使用 Webpack 可以让全局样式和 CSS Modules 的局部样式和谐共存。下面是我们项目中使用的 webpack 部分配置代码：

```js
module: {
  loaders: [{
    test: /\.jsx?$/,
    loader: 'babel'
  }, {
    test: /\.scss$/,
    exclude: path.resolve(__dirname, 'src/styles'),
    loader: 'style!css?modules&localIdentName=[name]__[local]!sass?sourceMap=true'
  }, {
    test: /\.scss$/,
    include: path.resolve(__dirname, 'src/styles'),
    loader: 'style!css!sass?sourceMap=true'
  }]
}
```

```js
/* src/app.js */
import './styles/app.scss';
import Component from './view/Component'

/* src/views/Component.js */
// 以下为组件相关样式
import './Component.scss';
```
目录结构如下：

```text
src
├── app.js
├── styles
│   ├── app.scss
│   └── normalize.scss
└── views
    ├── Component.js
    └── Component.scss
```

这样所有全局的样式都放到 src/styles/app.scss 中引入就可以了。其它所有目录包括 src/views 中的样式都是局部的。










## 1.4. router

## 1.5. immutable.js

-api:[fromJS](http://facebook.github.io/immutable-js/docs/#/fromJS)
-github:[fromJS](https://github.com/facebook/immutable-js)
-介绍:[fromJS](https://www.w3ctech.com/topic/1595)

1. setIn 赋值
2. getIn 取值
3. mergeDeep
4. updateIn





## 1.6  react组件间通信

### 1.6.1 父组件 向 子组件 传递信息

1. 主要是通过 prop进行传值

// 子组件
```js
import React, {Component} from 'react'

export default class Son extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {list} = this.props

    const option = list.map(item=><li key={item}>{item}</li>)

    return (
      <div>
        <ul>{option}</ul>
      </div>
    )
  }
}
```

// 父组件

```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Son from './son'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:['haha','aaaa','bbbb','ccccc']
    }
  }

  render() {
    const {data} = this.state

    return(
      <div>
          <Son list={data} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))
```


2. 父组件 向更深层的 子组件 进行传递信息————利用（context）

- 首先在顶层组件中：定义了顶层组件所拥有的子类context对象——该顶层组件所拥有的的子类context对象为title，且必须为字符串。然后通过getChildText方法，来给子context对象的属性赋值；

- 越级传递：因为title属性，在一级子组件Son中并没有直接用到，因此我们可以直接传递到最底层（越级），在Grandson组件中使用；

- 最底层：声明了所接受到的context的子组件title的类型，声明必须为字符串。

// 孙子组件
```js
import React, {Component} from 'react'

export default class GrandSon extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <div>
        <h1>{this.context.title}</h1>
      </div>
    )
  }
}

GrandSon.contextTypes = {
  title: React.PropTypes.string
}
```

// 子组件
```js
import React, {Component} from 'react'
import Grandson from './grandson'

export default class Son extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {list} = this.props

    const option = list.map(item => <li key={item}>{item}</li>)

    return (
      <div>
        <Grandson />
        <ul>{option}</ul>
      </div>
    )
  }
}
```

// 父组件
```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Son from './son'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:['haha','aaaa','bbbb','ccccc']
    }
  }

  getChildContext() {
    return {title: "列表"};
  }

  render() {
    const {data} = this.state

    return(
      <div>
          <Son list={data} />
      </div>
    )
  }
}
App.childContextTypes = {
  title: React.PropTypes.string
};

ReactDOM.render(<App />, document.getElementById('main'))
```


### 1.6.2 子组件 向 父组件 传递信息

- 依赖 props 来传递事件的引用，并通过回调的方式来实现的;

// 子组件

```js
import React, {Component} from 'react'

export default class Son extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleChange() {
    var newState = !this.state.checked
    this.setState({
      checked: newState
    })
    this.props.changeParent(newState)
  }

  render() {

    return (
      <div>
        <label>
          选择：
          <input type='checkbox' checked={this.state.checked} onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    )
  }
}
```
// 父组件

```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Son from './son'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false
    }
  }

  handleChange(value) {
    console.log('value', value);
    this.setState({
      value: value
    })
  }

  render() {

    const {value} = this.state

    return (
      <div>
        <h1>是否选中: {value > 0 ? '是' : '否'}</h1>
        <Son changeParent={this.handleChange.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))
```

- 在子组件利用 this.props.changeParent(newState) 触发父组件的方法，在父组件绑定changeParent={this.handleChange.bind(this)}，进而将子组件的数据（newState）传递到了父组件。


### 1.6.3 兄弟组件之间传值

- 使用PubSub监听机制传参

    + 发送消息：PubSub.publish(名称,参数)
    + 订阅消息：PubSub.subscrib(名称,函数)
    + 取消订阅：PubSub.unsubscrib(名称)
    
// check组件
 
```js
import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class Check extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleChange() {
    var newState = !this.state.checked
    this.setState({
      checked: newState
    })
    PubSub.publish('checkmessage',newState)
  }

  render() {

    return (
      <div>
        <label>
          选择：
          <input type='checkbox' checked={this.state.checked} onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    )
  }
}
``` 
// result组件
```js
import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  componentDidMount() {
    this.pubsub_check = PubSub.subscribe('checkmessage',function (topic, message) {
      this.setState({
        checked:message
      })
    }.bind(this))
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.pubsub_check)
  }

  render() {

    return (
      <div>
        <h1>选中了吗: {this.state.checked > 0 ? '是' : '否'}</h1>
      </div>
    )
  }
}
```

- 在check组件中发布一个消息checkmessage，在result组件中订阅这个消息，使得两个组件又产生了联系，进行传递的信息。


### 1.6.4 利用react-redux进行组件之间的状态信息共享

- Redux 的基本做法：用户发出 Action，Reducer 函数算出新的 State，View 重新渲染。

// actions

- 在里面定义actionType，也可以单独文件定义，然后引入进来
- action：存放数据的对象，即消息的载体。

```js
export const actionType = {
  CHECK_MESSAGE: 'CHECK_MESSAGE',
}

export const actions = {
  check (value){
    console.log('value', value);
    return dispatch => {
      dispatch({
        type: actionType.CHECK_MESSAGE,
        payload: {
          checked: !value
        }
      })
    }
  }
}
```

- 以下是两个组件，共享checked这个属性 

// components/check

```js
import React, {Component} from 'react'

export default class Check extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange() {
    var newState = this.props.checked
    this.props.check(newState)
  }

  render() {

    return (
      <div>
        <label>
          选择：
          <input type='checkbox' checked={this.props.checked} onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    )
  }
}
```

// components/result
```js
import React, {Component} from 'react'

export default class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {

    return (
      <div>
        <h1>选中了吗: {this.props.checked > 0 ? '是' : '否'}</h1>
      </div>
    )
  }
}
```

- connect来向component中注入state。

// containers/App
```js
import React,{Component}  from 'react'
import {connect} from 'react-redux'
import Check from '../components/check'
import Result from '../components/result'
import {actions} from '../actions'

class App  extends Component{


  render() {
    const props = this.props

    return (
      <div>
        <Result {...props} />
        <Check {...props} />
      </div>
    )
  }
}
export default connect(state => state, actions)(App)

```

- State 的计算过程就叫做 Reducer

// reducers

```js
import {actionType} from '../actions'

export const initState = {
  checked: false
}

export function reducer(state = initState, action) {
  const {type, payload} = action
  switch (type) {
    case actionType.CHECK_MESSAGE:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}
```

-  React Redux 组件 <Provider> 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。

// index
```js
import React from 'react'
import {compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { reducer, initState } from './reducers'


let buildStore = compose(applyMiddleware(thunk))(createStore)
let store = buildStore(reducer, initState)

export default class Page extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

ReactDOM.render(<Page/>, document.getElementById('main'))

```



## react 和 antd 的版本升级

[antd的升级方案](https://github.com/ant-design/ant-design/issues/3759)

1. [antd-migration-helper](https://github.com/ant-design/antd-migration-helper)

扫描项目代码，找出使用了废弃/移除 API 的地方，类似 ESLint

2. [antd-codemod](https://github.com/ant-design/antd-codemod)

自动修改代码

```shell
jscodeshift -t getFieldProps-to-getFieldDecorator.js /Users/lianjia/tt/project/ljfe-ehr-estuary/src/client
jscodeshift -t time-related-value-to-moment.js /Users/lianjia/tt/project/ljfe-ehr-estuary/src/client
jscodeshift -t GregorianCalendar-to-moment.js /Users/lianjia/tt/project/ljfe-ehr-estuary/src/client
jscodeshift -t Popover-overlay-to-content.js /Users/lianjia/tt/project/ljfe-ehr-estuary/src/client

```

3. 自测，处理antd 内置的 warning






# 2. redux

如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。

- Redux 的适用场景：多交互、多数据源。

 + 用户的使用方式复杂
 + 不同身份的用户有不同的使用方式（比如普通用户和管理员）
 + 多个用户之间可以协作
 + 与服务器大量交互，或者使用了WebSocket
 + View要从多个来源获取数据


- 从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux.

 + 某个组件的状态，需要共享
 + 某个状态需要在任何地方都可以拿到
 + 一个组件需要改变全局状态
 + 一个组件需要改变另一个组件的状态
 
- Redux 的设计思想:

 + Web 应用是一个状态机，视图与状态是一一对应的。
 + 所有的状态，保存在一个对象里面。
  


## 2.2.1 Action

State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

### 2.2.1.1 Action

- Action是把数据从应用传到store的有效载荷。是store数据的**唯一**来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

- 添加新任务的 action 是这样的

>constants／ActionTypes.js

```js
export const ADD_TODO = 'ADD_TODO'
```
Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

>actions／index.js

```js
export const addTodo = text => ({ type: types.ADD_TODO, text })
```
可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

### 2.2.1.2 Action创建函数

- View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

- 在 Redux 中的 action 创建函数只是简单的返回一个 action:

>actions／index.js

```js
export const addTodo = text => ({ type: types.ADD_TODO, text })
```
Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程。

```js
dispatch(addTodo(text))
dispatch(completeTodo(index))
```

或者创建一个 被绑定的 action 创建函数 来自动 dispatch：

```js
const boundAddTodo = (text) => dispatch(addTodo(text))
const boundCompleteTodo = (index) => dispatch(completeTodo(index))

//然后直接调用它们：

boundAddTodo(text);
boundCompleteTodo(index);
```

store 里能直接通过 store.dispatch() 调用 dispatch() 方法，但是多数情况下你会使用 react-redux 提供的 connect() 帮助器来调用。

bindActionCreators() 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。


## 2.2.2 Reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。 Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

- **永远不要在 reducer 里做这些操作：**

 + 修改传入参数；
 + 执行有副作用的操作，如 API 请求和路由跳转；
 + 调用非纯函数，如 Date.now() 或 Math.random()。

- 整个应用的初始状态，可以作为 State 的默认值

>reducers/todos.js

```js
const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ]

    ...
    
    default:
      return state
  }
}
```

>注意:

- 不要修改 state。 使用 Object.assign() 新建了一个副本。不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。你必须把第一个参数设置为空对象。你也可以开启对ES7提案对象展开运算符的支持, 从而使用 { ...state, ...newState } 达到相同的目的。

- 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。


### 2.2.2.1 combineReducers

- Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

```js
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp;
```
- 这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名

- 你也可以给它们设置不同的 key，或者调用不同的函数。下面两种合成 reducer 方法完全等价：
 
```js
const reducer = combineReducers({
         a: doSomethingWithA,
         b: processB,
         c: c
       })
       function reducer(state = {}, action) {
         return {
           a: doSomethingWithA(state.a, action),
           b: processB(state.b, action),
           c: c(state.c, action)
         }
  }
```  
  
>combineReducers 接收一个对象，可以把所有顶级的 reducer 放到一个独立的文件中，通过 export 暴露出每个 reducer 函数，然后使用 import * as reducers 得到一个以它们名字作为 key 的 object：

```js
import { combineReducers } from 'redux'
import * as reducers from './reducers'

const todoApp = combineReducers(reducers) 
```
 
## 2.2.3 Store
 
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

- Store 有以下职责：

 + 维持应用的 state；
 + 提供 getState() 方法获取 state；
 + 提供 dispatch(action) 方法更新 state；
 + 通过 subscribe(listener) 注册监听器;
 + 通过 subscribe(listener) 返回的函数注销监听器。

- Redux 提供createStore这个函数，用来生成 Store。

```js
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```

- createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。

```js
let store = createStore(todoApp, window.STATE_FROM_SERVER)
```

## 2.2.4 组件

- React-Redux 将所有组件分成两大类：UI 组件（component）和容器组件（container）

- **UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑**


### 2.2.4.1 UI组件

UI 组件有以下几个特征:

  + 只负责 UI 的呈现，不带有任何业务逻辑
  + 没有状态（即不使用this.state这个变量）
  + 所有数据都由参数（this.props）提供
  + 不使用任何 Redux 的 API


>因为不含有状态，UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

### 2.2.4.2 容器组件

容器组件的特征:

  + 负责管理数据和业务逻辑，不负责 UI 的呈现
  + 带有内部状态
  + 使用 Redux 的 API
  
  
>如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。

>React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。  
  
>明智的做法是只在最顶层组件（如路由操作）里使用 Redux。其余内部组件仅仅是展示性的，所有数据都通过 props 传入.

|               | 容器组件           | 展示组件         |
| ------------- |:-------------:   | -----:         |
| Location      | 最顶层，路由处理     | 最顶层，路由处理  |
| Aware of Redux|  是               |   否           |
| 读取数据        |从Redux获取state   |从props获取数据   |
| 修改数据        |向Redux派发actions |从props调用回调函数|


### 2.2.4.3 连接到 Redux

将 App 组件连接到 Redux 并且让它能够 dispatch actions 以及从 Redux store 读取到 state。

- 首先，我们需要获取从之前安装好的 react-redux 提供的 Provider，并且在渲染之前将根组件包装进 <Provider>。

```js
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'

let store = createStore(todoApp);

let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```
- 原理是React组件的context属性

```js
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
```


- 接着，我们想要通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux。尽量只做一个顶层的组件，或者 route 处理。

```js
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

const App = ({todos, actions}) => (
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

```

- connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

#### 2.2.4.3.1 mapStateToProps

- mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
  作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射.
  
```js
const mapStateToProps = state => ({
  todos: state.todos
})
```  
- mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

- mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。


#### 2.2.4.3.2 mapDispatchToProps

mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

- bindActionCreators

- bindActionCreators(actionCreators, dispatch)
  把 action creators 转成拥有同名 keys 的对象，但使用 dispatch 把每个 action creator 包围起来，这样可以直接调用它们。

```js
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})
```

### 2.2.5 React-Router 路由库

- 可以使用Provider在Router外面包一层。

```js
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
```

# 3. test/mocha

## 3.1 安装

全局安装

```js
 npm install --global mocha
```
或局部安装项目依赖

```js
npm install --save-dev mocha
```

## 3.2 测试脚本的写法

所谓"测试脚本"，就是用来测试源码的脚本。

- 下面是一个加法模块add.js的代码。

```js
module.exports = function add(x, y) {
    return x + y;
}
```

- 通常，测试脚本与所要测试的源码脚本同名，但是后缀名为.test.js（表示测试）或者.spec.js（表示规格）。比如，add.js的测试脚本名字就是add.test.js，或者add.spec.js。

```js
const add = require('./add');
const expect = require('chai').expect;

describe('加法函数测试',function () {
    it('1+1应该等于2',function () {
        expect(add(1,1)).to.be.equal(2)
    })
})
```

- 上面这段代码，就是测试脚本，它可以独立执行。测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块。

    + describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。
    + it块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。


## 3.3 断言库的用法

```js
expect(add(1, 1)).to.be.equal(2);
```

所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。上面这句断言的意思是，调用add(1, 1)，结果应该等于2。

- 所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的关键。断言功能由断言库来实现，Mocha本身不带断言库，所以必须先引入断言库。

```js
var expect = require('chai').expect;
```

- 断言库有很多种，Mocha并不限制使用哪一种。上面代码引入的断言库是[chai](http://chaijs.com/)，并且指定使用它的expect断言风格。

- expect断言的优点是很接近自然语言

```js
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);
```
基本上，expect断言的写法都是一样的。头部是expect方法，尾部是断言方法，比如equal、a/an、ok、match等。两者之间使用to或to.be连接。

- 如果expect断言不成立，就会抛出一个错误。事实上，只要不抛出错误，测试用例就算通过。

```js
it('1 加 1 应该等于 2', function() {});
```

上面的这个测试用例，内部没有任何代码，由于没有抛出了错误，所以还是会通过。


## 3.4 Mocha的基本用法

有了测试脚本以后，就可以用Mocha运行它。请进入子目录，执行下面的命令。

```text

$ mocha add.test.js

  加法函数的测试
    ✓ 1 加 1 应该等于 2

  1 passing (8ms)
```

- 上面的运行结果表示，测试脚本通过了测试，一共只有1个测试用例，耗时是8毫秒。

- mocha命令后面紧跟测试脚本的路径和文件名，可以指定多个测试脚本。

```text
$ mocha file1 file2 file3
```
