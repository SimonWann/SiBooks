import React, { Component } from 'react'
import './index.sass'
import Book from '@components/Book'
import { BookOne } from '@icon-park/react'
import { CSSTransition } from 'react-transition-group';
import setBookInfo from '@/util/setBooksInfo.js'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '书架',
            isDragging: false,
            dropText: '拖拽文件到此处',
            files: [],
            bookRule: /\.(epub|mobi|txt|md)$/
        }
    }
    dragEnterHandler(e) {
        this.setState({
            isDragging: true
        })
    }
    dragLeaveHandler(e) {
        this.setState({
            isDragging: false
        })
    }
    async getFileInfo(books) {
        console.log(books)
        const result = await window.ipcRenderer.invoke('onGetFile', books)
        console.log(result)
    }
    async componentDidMount() {
        const books = await window.ipcRenderer.invoke('onInitFile')
        console.log(books)
    }
    async dropHandler(ev) {
        ev.preventDefault();
        console.log('get files', ev.dataTransfer.items[0])
        await setTimeout(() => {
            
        }, 1000);
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === 'file') {
                    let file = ev.dataTransfer.items[i].getAsFile();
                    let isPut = this.state.files.find(ele => (ele?.name === file?.name))?true:false
                    if(!isPut && this.state.bookRule.test(file.name)) {
                        this.setState({
                            files: [...this.state.files, file]
                        })
                        const info = setBookInfo(file)
                        this.getFileInfo(info)
                    }
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
            }
        }
    }
    render() {
        const {state} = this
        return (
            <div 
            className="home"
            onDragEnter={(e) => {this.dragEnterHandler(e)}}
            onDrop={(e) => {this.dragLeaveHandler(e)}}
            >
                {!state.isDragging
                ?
                <div 
                className="home-container">
                    <h3 className="home-title">
                        <span className="home-title-text">{state.title}</span>
                        <BookOne className="home-title-icon" theme="outline" fill="#fafafa"/>
                    </h3>
                    <ul className="book-container">
                        <li className="book-container-li">
                            <Book className="home-book">
                            </Book>
                        </li>
                    </ul>
                </div>
                :undefined}
                <CSSTransition
                timeout={300}
                classNames="drag-container"
                in={state.isDragging}
                unmountOnExit
                >
                    <div 
                    className="drag-container"
                    onDrop={(e) => {this.dropHandler(e)}}
                    onDragOver={(e) => {e.preventDefault()}}
                    >
                        <span>{state.dropText}</span>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}
