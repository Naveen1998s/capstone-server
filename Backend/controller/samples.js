const samples=require('../models/samplesroutes');
//adding sample details
const addSample=async(req,res,next)=>{
    try{
        let{date,pname,email,sampleId,haemotology,thyroid,glucometry}=req.body
        await samples.insertMany([{
            date,
            pname,
            email,
            sampleId,
            haemotology,
            thyroid,
            glucometry
        }])
        res.json({
            error:false,
            message:"samplereport as been added successfully",
            data:null
        })
    }catch(err){
        next(err)
    }
}
//getting sample details
const getAllsampless=async(req,res,next)=>{
    try{
        const sampledata=await samples.find().lean();
        res.json({
            error:false,
            message:"",
            data:sampledata
        })
    }catch(err){
            next(err)
        }
   
}
module.exports={
    addSample,
    getAllsampless
}