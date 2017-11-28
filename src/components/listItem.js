import React, {Component} from "react";
require('./listItem.less')
const PubSub = require('pubsub-js')

class ListItem extends Component{
	deleteHandler(item,e){
		e.stopPropagation();
		PubSub.publish('DEL_MUSIC', item);
	}

	playMusic(item, e) {
		PubSub.publish('PLAY_MUSIC', item);
	}

	render(){
		const {data} = this.props

		
	}
}