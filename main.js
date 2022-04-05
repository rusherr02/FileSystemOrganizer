#!/usr/bin/env node
let fs = require('fs');
let path = require('path');
let helpCmd = require('./commands/help.js');
let treeCmd = require('./commands/tree.js');
let organizeCmd = require('./commands/organize.js');


let inputArr = process.argv.slice(2);
console.log(inputArr);
let command = inputArr[0];
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
switch (command) {
    case 'tree':
        treeCmd.treeKey(inputArr[1]);
        break;
    case 'organize':
        organizeCmd.organizeKey(inputArr[1]);
        break;
    case 'help':
        helpCmd.helpKey(inputArr[1]);
        break;
    default:
        console.log("🚒 Please 🙏 input right command")

}


