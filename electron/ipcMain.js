const { ipcMain } = require('electron')
// const fs = require('fs')
const {update, load} = require('json-update')
const path = require('path')
const {parseEpub} = require('@gxl/epub-parser')
const DomParser = require('dom-parser')
const parser = new DomParser()

class BookScheme {
  constructor(name, path, brief) {
    this.name = name
    this.path = path
    this.brief = brief
    this.progress = 0
  } 
}
const getIntroduceRule = /_chapter_/


const booksPath = path.join(__dirname, 'books.json')

ipcMain.handle('onGetFile', async (event, args) => {
  console.log({ args, booksPath})
  const epub = await parseEpub(args.path, {
    type: 'path'
  })
  // console.log(epub)
  let newBook = new BookScheme(args.name, args.path, {
    title: epub?.info?.title ?? '',
    author: epub?.info?.author,
    introduce: ''
  })
  try {
    const booksO = await load(booksPath)
    await update(booksPath, {books: [...booksO.books, newBook]})
    const booksN = await load(booksPath)
    return booksN
  } catch (error) {
    console.log(error)
    return []
  }
})
ipcMain.handle('onInitFile', async (event, args) => {
  let data = await load(booksPath)
  return data
})