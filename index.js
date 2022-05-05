const fs = require('fs-extra')
const path = require('path');

const dirApp = path.resolve(__dirname, '../')
const pathNodeModules = dirApp + '/node_modules'
const pathOracleCxCommerce = dirApp + '/node_modules/@oracle-cx-commerce'
const folders = [
    'react-widgets',
    'react-components',
    'react-app',
    'endpoints'
]

const hasPackages = () => {
    return fs.existsSync(pathNodeModules) && fs.existsSync(pathOracleCxCommerce) ? true : false    
}

const hasFolder = (folder) => {
    return new Promise((resolve, reject) => {
        try {
            if(!fs.existsSync(folder)){
                fs.mkdirSync(folder, { recursive: true })
                resolve(true)
            } else { resolve(true) }
        } catch (error) {
            console.error('index - (): ' + error);
            reject(error);
        }
    })
} 

const copyFile = (source, destination, folder) => {
    fs.copy(source, destination, function (err) {
        if (err){
            console.log('An error occured while copying the folder.')
            return console.error(err)
        }
        console.log('Copy folder '+folder+' completed!')
    });
}

const copyNativeFiles = () => {
    folders.forEach(folder => {
        const dest = path.resolve(__dirname, folder )
        const source = path.resolve(pathOracleCxCommerce, folder )
        
        hasFolder(folder)
            .then(res => {
                copyFile(source, dest, folder)
            })
            .catch(err =>  console.log(err) )
    })
}

const init = () =>{
    hasPackages()
        ? copyNativeFiles()
        : console.log('Node Modules not exist. Execute command "npm i" or "yarn"')
} 

init()