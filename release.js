// profiles: major, minor, micro

function bumpVersion(version, profile){
    this.version = version;
    var splitString = version.split(".");
    var major = parseInt(splitString[0]);
    var minor = parseInt(splitString[1]);
    var micro = parseInt(splitString[2]);
    var new_version = "";

    if(profile == "major"){
        major = major+1;
        new_version = (String(major)+ "." + String(minor) + "." + String(micro));
        return new_version;
    }

    if(profile == "minor"){
        minor = minor + 1;
        new_version = (String(major)+ "." + String(minor) + "." + String(micro));
        return new_version;
    }

    if(profile == "micro"){
        micro = micro + 1;
        new_version = (String(major)+ "." + String(minor) + "." + String(micro));
        return new_version;
    }    
}

var fs = require('fs');
var fileName = "./build.json";
var file = require(fileName);

file.tag = bumpVersion("1.0.0","minor");
fs.writeFile(fileName, JSON.stringify(file), function(err){
    if(err) return console.log(err);
    //console.log(JSON.stringify(file));
    console.log("writing to " + fileName);

});