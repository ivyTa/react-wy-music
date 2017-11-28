import React, {Component} from 'react'
import {MUSIC_LIST} from '../file'
import ListItem from '../components/listitem'

export default class List extends Component {
    render() {
        let Items = this.props.musicList.map((item) => {
            return (
                <ListItem
                    key={item.id}
                    data={item}
                    focus={this.props.currentMusitItem === item}
                />
            )
        })
        return (<ul>{Items}</ul>)
    }
}

