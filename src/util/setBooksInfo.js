export default function(file) {
    let rule = /\.(epub|mobi|txt|md)$/
    if(rule.test(file?.name)) {
        return {
            name: file.name,
            path: file.path
        }
    } else {
        throw Error('The file should be the book.')
    }
}