function organizeFn(dirPath) {
    // console.log("Organize command implemented for ",dirPath);
    // 1.input -> dir path given
    let destPath;
    if (dirPath == undefined) {
        destPath = process.cwd();
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            //2. create -> organize_files -> dir
            destPath = path.join(dirPath, "organize_files")
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }

        } else {
            console.log("Kindly enter the correct path :)");
            return;
        }

    }
    organizeHelper(dirPath, destPath);




}
function organizeHelper(src, dest) {
    //3. idenity categories of all the files present in that i/p directory
    let childNames = fs.readdirSync(src);
    console.log("childNames: " + childNames);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], " belongs to --> ", category);
            //4. copy / cut files to that organized directory inside of any of category folder.
            sendFiles(childAddress, dest, category);
        }

    }
}
function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    // fs.unlinkSync(srcFilePath); ->behave as cut 
    console.log(fileName, " -> copied to ->", category);

}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    // console.log(ext);
    for (let type in types) {
        let currTypeArr = types[type];
        for (let i = 0; i < currTypeArr.length; i++) {
            if (ext == currTypeArr[i]) {
                return type;
            }
        }
        // return "others"; - pehle yha tha
    }
    return "others";
}

module.exports = {
    organizeKey: organizeFn
}
