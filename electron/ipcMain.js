const { ipcMain } = require('electron')
// const fs = require('fs')
const {update, load} = require('json-update')
const path = require('path')
const {parseEpub} = require('@gxl/epub-parser')

const bookScheme = {
  name: "",
  path: "",
  brief: {
    title: '',
    author: '',
    introduce: ''
  },
  progress: 0
}

const booksPath = path.join(__dirname, 'books.json')

ipcMain.handle('onGetFile', async (event, args) => {
  console.log({ args, booksPath})
  const epub = await parseEpub(args.path, {
    type: 'path'
  })
  console.log(epub)
  try {
    // const booksO = await load(booksPath)
    // await update(booksPath, {books: [...booksO.books]})
    // const booksN = await load(booksPath)
  } catch (error) {
    console.log(error)
  }
  
  return JSON.parse(JSON.stringify(epub))
})
ipcMain.handle('onInitFile', async (event, args) => {
  let data = await load(booksPath)
  return data
})