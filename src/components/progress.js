import React, {Component} from "react"
require('./listItem.less')
const PubSub = require('pubsub-js')

export default class Progress extends Component {
    getDefaultProps() {
        return {
            barColor: '#2f9842'
        }
    }

    changeProgress(e) {
        let progressBar = this.refs.progressBar
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth
        this.props.onProgressChange && this.props.onProgressChange(progress)
    }

    render() {
        return (
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress"
                     style={{width: `${this.props.progress}%`, background: this.props.barColor}}></div>
            </div>
        )
    }
}