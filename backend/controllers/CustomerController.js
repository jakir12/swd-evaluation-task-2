import Customer from "../models/CustomerModule.js";


export const getIndex = async(req, res)=>{
    try {
        const msg = "Hello Nploy";
        res.json(msg);
    } catch (error) {
        console.log(error.message);
    }
}


// Get Customer List

export const getCustomers = async(req, res)=>{
    try {
        const response = await Customer.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Get Customer By Id

export const getCustomerById = async(req, res)=>{
    try {
        const response = await Customer.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Save Customer

export const saveCustomer = async(req, res)=>{
     
    const cust_code = req.body.customer_code;
    const dupCustomer = await Customer.findOne({
        where:{
            customer_code : cust_code
        }
    });
     
    if(dupCustomer){
        return res.status(300).json({msg: "This customer code is already exits."});
    }else{
        const customer_code = req.body.customer_code;
        const customer_name = req.body.customer_name;
        const customer_address = req.body.customer_address;
        try {
            const insertID = await Customer.create({customer_code: customer_code, customer_name: customer_name, customer_address: customer_address});
            // console.log(insertID.id); This is the way to get last insert id
            res.status(200).json({msg: "Customer Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    }
}

// Update Customer

export const updateCustomer = async(req, res)=>{
      
    const customer = await Customer.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!customer) return res.status(404).json({msg: "No Data Found"});
    
    const customer_code = req.body.customer_code;
    const customer_name = req.body.customer_name;
    const customer_address = req.body.customer_address;
    
    try {
        await Customer.update({customer_code: customer_code, customer_name: customer_name, customer_address: customer_address},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Customer Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
 
}

// Delete Customer

export const deleteCustomer = async(req, res)=>{

    const customer = await Customer.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!customer) return res.status(404).json({msg: "No Data Found"});

    try {
        await Customer.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Customer Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}