const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.listen(8000, () =>{
    console.log('server was connected');
})

app.get('/test',(req, res)=>{
        res.end('Api working');
})

mongoose.connect('mongodb://localhost:27017/test',(err) =>{
    if(err){
        console.log("DB not Connected");
    } else {
        console.log("DB Connected");
    }
});

// const api1 = require('./apiService');
// app.use('/api', api1);

const api2 = require('./apiSchema');

app.post('/create', async(req,res) => {
    const addData = api2({
        order_id : req.body.order_id,
        item_name : req.body.item_name,
        cost : req.body.cost,
        order_date : req.body.order_date,
        delivery_date : req.body.delivery_date 
    });

    const saveData = await addData.save();
    res.status(200).json(saveData);
});

app.get('/showAll', async(req, res) => {
    const data = await api2.find().sort({delivery_date: -1});
    const total = await data.length;
    res.status(200).json({details: data, total: total});
});

app.get('/show/:id', async(req, res) => {
    const data = await api2.findOne({order_id:req.params.id});
    res.status(200).json(data);
});

app.post('/update/:id', async(req, res) => {
    var updateData = await api2.findOneAndUpdate({order_id:req.params.id}, {
        $set:{
            item_name : req.body.item_name,
            cost : req.body.cost,
            order_date : req.body.order_date,
            delivery_date : req.body.delivery_date
        }
    });
    res.status(200).json("Updated Successfully");
});

app.delete('/delete/:id', async (req, res) => {
    await api2.findOneAndDelete({order_id:req.params.id});
    res.status(200).json('Deleted Successfully');
});

