const {customer} = require('../models')

exports.create = async(req,res) => {
    try {
        const {name} = req.body;
        const users = await customer.findOne({
            where: {
                name,
            }
        })
        if(!users){
            const newUser = await customer.create(req.body);
            res.status(200).send({newUser})
        }
        else {
            res.status(500).send({message:"Customer Already Exist!"})
        }
    } catch (error) {
        console.log(error)
    }
}

exports.show = async(req,res) => {
    try {
        const users = await customer.findAll()
        res.send({data: users})
    } catch (error) {
        console.log(error)
    }
}