const userModel= require("../models/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
SECRET_KEY ="TechnoElevate"

const register=async(req, res, next) => {
   let {fname,lname,email,password,role}=req.body
   try {
    const emailExists=await userModel.findOne({email: email})
    if(emailExists) {
        res.status(400).json({
            error:true,
            message:"email already exists",
            data:null
        })
    }else {
       const saltrounds=10
       //salt of the password,we are encrypting the password using saltround
       const salt= await bcrypt.genSalt(saltrounds)

       //hash password,it makes the password encrypted
       const hashpassword=await bcrypt.hash(password,salt)

       await userModel.insertMany([
            {fname,lname,email,role,password:hashpassword}
       ])
       res.status(200).json({
        error:false,
        message:"registration successful",
        data: ""
       })}}
    
    catch(err) {
        next(err)
        }
    }
        // login Logic
        const login=async(req, res, next) => {
            let{email,password}=req.body
            try{
                const userData= await userModel.findOne({email}).lean()  //without parsing we get the elements
                if(userData){
                    let{fname,role}=userData
                    const isPasswordMatch=await bcrypt.compare(password, userData.password)

                    if(isPasswordMatch){
                        const payload={fname,role}
                        const token=await jwt.sign(payload,SECRET_KEY,{ //token generated actually here                            expiresIn:"5h"
                        })
                        res.status(200).json({
                            error:false,
                            message:"login successful",
                            data: {
                                fname,role,token
                            }
                        })
                    }else{
                        res.json({
                            error:true,
                            message:"Invalid password",
                            data: null
                        })
                    }
                }
                else{
                    res.status(401).json({
                        error:true,
                        message:"User not registered",
                        data: null
                })
        }
    }catch(err) {
            next(err)
        }
    }
    const getAllSamples = async (req, res) => {
        try {
            const samples = await userModel.find().lean();
            res.json({
                error: false,
                message: "",
                data:
                {
                    samples
                }
            })
        }
        catch (err) {
            next(err)
        }
    }
    const getUser=async(req,res)=>{
        console.log(req.params._id);
        _id=parseInt(req.params._id)
        try{
    
             const val=await userModel.findOne({_id:req.params._id}).lean()
            // res.render("./editproduct.handlebars",{selectedProduct:productToEdit})
            res.json({
                error:false,
                message:"get edit",
                data:{
                    val
                }
            })
        }
        catch(err){
           next(err)    
       }
     }
    
    const getUsers=async(req,res)=>{
        console.log(req.body)
        let {_id,fname,email}=req.body;
        try{
            const val1=await userModel.updateOne({_id},{$set:{fname,email}})
            res.json({
                error:false,
                message:"edit successful",
                data:{ val1 }
            })
        }
        catch(err){
            next(err)
        } 
    }
    module.exports = { login, register,getAllSamples ,getUser,getUsers}
    
    

    