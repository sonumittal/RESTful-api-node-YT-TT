const express=require('express');
const res = require('express/lib/response');
require('./db/conn');
const Student=require('./models/students');
const app=express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req,res)=>{
 res.send("hello sonu");
 
})

app.post('/students', (req,res)=>{
    console.log(req.body);
    const user= new Student(
    //     // {
    //     //     "name":"sonu1",
    //     //     "email":"sonu@gmail.com",
    //     //     "phone":"2345234567",
    //     //     "address":"suihs jsh"
    //     // }

        req.body
    )
    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })

// -----------OR with async/await use async at function async(req,res)---------------
    // try{
    // const user= new Student(req.body)
    // const createUser= await user.save();
    // res.status(201).send(createUser);    
    // }catch(e){
    //     res.status(400).send(e);
    // }

// -----------OR without promise---------------
//     user.save((err, doc)=>{
//         if(err){
//             console.log('Error in Post Data'+err)
//         }else{
//             res.send(doc);
//         }
//     }   )
    
    // console.log(user);
   })

   
   app.get('/students', async (req,res)=>{
       try{
        const studentData= await Student.find();
        res.status(200).send(studentData) 
       }catch(e){
        res.status(500).send(e)
       }
   })

   
   app.get('/students/:id', async (req,res)=>{
    try{
     const _id= req.params.id;
     const studentData= await Student.findById(_id);
     res.status(200).send(studentData);
    }catch(e){
     res.status(500).send(e)
    }

// -----------OR without promise---------------
 // Student.findById(req.params.id, (err, doc) =>{
 //     if(err){
 //         console.log('Error in Get Employee by id '+ err)
 //     }else{
 //         res.send(doc);
 //     }
 // });

})


//-------find with name---diff root cz get id root is same--
   app.get('/students/name/:name1', async (req,res)=>{
    console.log(req.params)
    try{
     const name= req.params.name1;
     const studentData= await Student.find({name:name});
     res.status(200).send(studentData);
    }catch(e){
     res.status(500).send(e)
    }
})

 
   app.patch('/students/:id', async (req,res)=>{
    try{
        const _id= req.params.id;
     const studentData= await Student.findByIdAndUpdate(_id,req.body,{new:true});
     res.status(200).send(studentData) 
    }catch(e){
     res.status(400).send(e)
    }
})


app.delete('/students/:id', async (req,res)=>{
    try{
     const studentData= await Student.findByIdAndDelete( req.params.id);
    if(! req.params.id){
        return res.status(400).send();  
    }
     res.status(200).send(studentData) 
    }catch(e){
     res.status(500).send(e)
    }
})





app.listen(port,()=>{
    console.log(`set up at ${port}`);
});