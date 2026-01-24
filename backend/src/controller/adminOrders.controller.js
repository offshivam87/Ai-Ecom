const orderModel =require("../models/order.model")

async function adminOrders(req,res) {
    const AllPendingOrders = await orderModel.find({status:"Pending"})
    console.log(AllPendingOrders);
    res.json({
        AllPendingOrders
    })
    
    
}

module.exports = adminOrders