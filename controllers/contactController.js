const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContact=asyncHandler(async(req,res)=>
{
    const contacts=await Contact.find({user_id:req.user.id});
    // res.status(200).json(contacts);
    res.status(200).json(contacts);
    console.log(contacts);
    res.status(200);
})

//@desc Create new contacts
//@route POST /api/contacts/:id
//@access private
const createContact=asyncHandler(async(req,res)=>
{
    console.log("details:",req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone)
    {
        res.status(400)
        throw new Error("all fileds required");
    }
    const contact=await Contact.create({
        user_id:req.user.id,
        name,
        email,
        phone,
    })
   res.status(201).json(contact);
})

//@desc get single contacts
//@route GET /api/contacts/:id
//@access private
const getSingleContact=asyncHandler(async(req,res)=>
{
    const contact=await Contact.find({name:req.params.id});
    if(!contact)
    {
        throw new Error("contact not found");
    }
    else
    res.status(200).json(contact);
    console.log(contact);
    console.log("hello");
})

//@desc update contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact=asyncHandler(async(req,res)=>
{
    const contact=await Contact.find({name:req.params.id});
    if(!contact)
    {
        throw new Error("contact not found");
    }
    if(contact.user_id.toString()!=req.user.id)
    {
        res.status(403);
        throw new Error("User donot of permisson to update other users")
    }
    const updatedContact=await Contact.findOneAndUpdate(
        {name:req.params.id},
        req.body,
        {new:true}
        );
    res.json(updatedContact);
})

//@desc delete contacts
//@route DELETE /api/contacts/:id
//@access private

const deleteContact=asyncHandler(async(req,res)=>
{
    const contact=await Contact.findById(req.params.id);
    console.log(contact.user_id.toString());
    if(!contact)
    {
        throw new Error("contact not found");
    }
    if(contact.user_id.toString()!==req.user.id)
    {
        res.status(403);
        throw new Error("User donot of permisson to delete other users")
    }
    await Contact.deleteOne({_id:req.params.id});
    res.send(`deleted contact ${req.params.id}`);
})
module.exports={getContact,createContact,getSingleContact,updateContact,deleteContact};