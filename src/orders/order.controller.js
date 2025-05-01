const { get } = require("mongoose");
const Order = require("./order.model");

const creatAOrder = async(req,res)=>{
    try{
        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch(error){
        console.log("Error in creating the order", error);
        res.status(500).send({ message: "Failed to create the order", error });
    }

};

const getOrderByEmail = async(req,res)=>{
    try{
        const {email} = req.params;
        const order = await Order.find({email}).sort({createdAt:-1});

        if(!order){
            return res.status(404).send({message:"Order not found !"});
        }
        res.status(200).json(order);        
    }

    catch(error){
        console.log("Error in getting the order", error);
        res.status(500).send({ message: "Failed to get the order", error });
    }
}

module.exports = {creatAOrder,getOrderByEmail};