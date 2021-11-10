import React, { Component } from 'react'
import './index.sass'

export default class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '恶之花',
            introduce: '在厌倦和巨大的忧伤后面，它们充满着雾霭沉沉的生存……',
            author: '[法] 夏尔.波德莱尔',
            date: 'asd',
        }
    }
    render() {
        const { state, props } = this
        return (
            <div className={`book ${props.className}`}>
                <h3 className="book-title">
                    <span className="book-title-value">{props.title ?? state.title}</span>
                    <span className="book-author">{props.title ?? state.author}</span>
                </h3>
                <section className="book-introduce">{props.introduce ?? state.introduce}</section>
            </div>
        )
    }
}
