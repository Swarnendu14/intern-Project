const validator = require("validator")
const isURL = require('is-url')
const axios = require('axios')
const mongoose = require('mongoose')
const collegeModel=require('../models/collegeModel')
const internModel=require('../models/internModel')


const isValid = function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const validReqBodyCollege= async (req,res,next)=>{
    try{
    const {name,fullName,logoLink}=req.body;
    if(!isValid(name))
        return res.status(400).send({status:false,message:"Please enter College Name"});

    let colName=await collegeModel.findOne({name:name});
    if(colName)
        return res.status(400).send({status:false,message:"College Name already exists"});
    
    if(!isValid(fullName))
        return res.status(400).send({status:false,message:"Please enter College Full Name"});
    
    if(!isValid(logoLink))
        return res.status(400).send({status:false,message:"Please enter College Logo Link"});
    
    if(!isURL(logoLink))
        return res.status(400).send({ status: false, msg: "invalid logoLink" })
    
    if (!validator.isURL(logoLink)) 
        return res.status(400).send({ status: false, msg: "invalid logoLink" })

    let checkURL = await axios.get(logoLink).then(() => longURL).catch(() => null)
    if(!checkURL) 
        return res.status(400).send({status : false, message : "invalid logoLink"})

    next();
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message});
    }
}

const validReqBodyIntern=async (req,res,next)=>{
    try{
        const {name,email,mobile,collegeId}=req.body;
        if(!isValid(name))
            return res.status(400).send({status:false,message:"Please enter Intern Name"});
            
        if(!isValid(email)){
            return res.status(400).send({status:false,message:"Please enter Intern Email"});
        }
    
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
                return res.status(400).send({status:false,message:"Email should be a valid email"})
        }
        const isemailAlreadyUsed = await internModel.findOne({email:email});

        if(isemailAlreadyUsed)
            return res.status(400).send({status:false,message:`${email} email address is already registered`})
           
        
        if(!collegeId || typeof collegeId !=mongoose.Schema.Types.ObjectId)
            return res.status(400).send({status:false,message:"Please enter Intern College Id"});
           
        const colId=await collegeModel.findOne({_id:collegeId});
        if(!colId)
            return res.status(400).send({status:false,message:"Please enter Valid College Id"});

        if(!isValid(mobile))
            return res.status(400).send({status:false,message:"Please enter Intern MobileNo"});

        if(!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)))
            return res.status(400).send({status:false,message:"Please enter valid Intern MobileNo"});
        
        next();
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message});
    }
    
}

module.exports={validReqBodyCollege,validReqBodyIntern}