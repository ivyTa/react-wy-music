import React, {Component} from "react"
require('./listItem.less')
const PubSub = require('pubsub-js')

export default class ListItem extends Component {
    deleteHandler(item, e) {
        e.stopPropagation()
        PubSub.publish('DEL_MUSIC', item)
    }

    playMusic(item, e) {
        PubSub.publish('PLAY_MUSIC', item)
    }

    render() {
        const {data} = this.props

        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`}
                onClick={this.playMusic.bind(this, data)}>
                <p><span className="bold">{data.title}</span> - {data.artist}</p>
                <p className="-col-auto delete" onClick={this.deleteHandler.bind(this, data)}></p>
            </li>
        )
    }
}