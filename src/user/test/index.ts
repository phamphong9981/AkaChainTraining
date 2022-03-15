const level=require("level")
const db=level("./db",{valueEncoding:"json"})
db.put("222",{name:"sfgsfgs", age:22}, function(err){
    db.get(222, function(err,value){
        console.log(value)
    })
})