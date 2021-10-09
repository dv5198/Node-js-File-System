
var fs = require('fs');
const readline=require('readline');
const r1=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
var directoryname="";
var fname="";
var content="";
var menu=()=>{
    console.log("1.Create a Directory");
    console.log("2.Remove a Directory");
    console.log("3.Write Data to a File");
    console.log("4.Reading data from the File");
    console.log("5.Appending/Updating a File");
    console.log("6.Deleting a File");
    console.log("7.Renaming a File");
    console.log("7.Exit for the Program");
};
var start=()=>{
    r1.question("Select your Choice:",(choice) => {
        if (choice=="1"){
            createdir();
        }else if (choice=="2"){
            deletedir();
        }else if (choice=="3"){
            write();
        }else if (choice=="4"){
            read();
        }else if (choice=="5"){
            update();
        }else if (choice=="6"){
            Delete();
        }else if (choice=="7"){
            rename();
        }else if (choice=="8"){
            r1.close();
        }else{
            console.log("Select appropriate choice");
            start();
        }
    });
};
menu();
start();
//Creating a new Directory
var createdir=()=>{
    var dir="./data";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        console.log("Directory created Successfully")
    }else{
        console.log("Directory already exists");
        r1.close();
    }
};
//Deleteing the Directiory
var deletedir=()=>{
    r1.question("Do you want to delete the Directiory?(y/n)",(ans)=>{
        result =ans;
    })
    if(ans=="y"){
        rmdir(directoryname,function(err){
            if(err){console.log(err);}else{console.log("Directory removed successfully")}
        });
    }else{
        console.log("Directory Delete successfully");
    }
};
//Wrtitng data to the File
var write=()=>{
    r1.question("Enter File Name: ",(ans)=>{
        var fname=ans+".txt";
        r1.question("File Content: ",(ans1)=>{
            content=ans1;
            console.log(fname+" "+content);
            filecreation();
        });
    });


};
var filecreation=()=>{
    fs.writeFile(fname,content,(err)=>{
        if(err) {
            console.log(err);
        }else{
            console.log("File created successfully");
        }
    });
};
//Reading Data from File
var read=()=>{
    r1.question("Enter File Name",(ans)=>{
        file=ans+".txt";
        read_File();
    }); 
    
};
var read_File=()=>{
    fs.readFile(file,"utf-8", function(err, data) {
       if(err){
           console.log(err);
       }else{
           console.log(data);
       }
      });
};
//Updating a File
var update=()=>{
    r1.question("Enter File Name",(ans)=>{
        var filename=ans;
        r1.question("File Content",(ans1)=>{
            content=ans1;
            update_file();
        });
    });

};
var update_file=()=>{
    fs.appendFile(filename, content, function (err) {
        if (err){
            console.log(err);
        }else{
            console.log('Updated!');
        }
      });
}

//Deleting a File
var Delete=()=>{
    r1.question("File Name",(del)=>{
        delete_file=del+".txt";
    });
    fs.unlink(delete_file, function (err) {
        if (err){
            console.log(err);
        }else{
        console.log('File Deleted!');
        }
      });
};
//Renaming a File
var rename=()=>{
    r1.question("File Name",(rnm)=>{
        rename_file=rnm+".txt";
        r1.question("New File Name",(new_name)=>{
            new_file=new_name+".txt";
        });
    });
    fs.rename(rename_file,new_file, function (err) {
        if (err){
            console.log(err);
        }else{
        console.log('File Renamed!');
        }
      });
};
