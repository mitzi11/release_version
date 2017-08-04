// profiles: major, minor, micro

var fs = require('fs');
var fileName = "./build.json";
var file = require(fileName);
var version = file["post-processors"][0][0].tag;



function bumpVersion(profile){ 
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

version = bumpVersion("minor");
fs.writeFile(fileName, JSON.stringify(file), 'UTF-8', 4, function(err){
    if(err) return console.log(err);
    console.log("writing to " + fileName);
});

function commit_file(){
    var Client = require('svn-spawn');
    var client = new Client({
        cwd: './',
        username: '*****', // optional if authentication not required or is already saved
        password: '*****', // optional if authentication not required or is already saved
        noAuthCache: true, // optional, if true, username does not become the logged in user on the machine
    });

    client.add('./build.json', function(err, data) {
        client.commit(['GDO-1 bumped version of build.json', './build.json'], function(err, data) {
            console.log('committed one file!');
        });
    });
}

commit_file();