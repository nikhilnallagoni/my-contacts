const express=require('express');
const {createContact,getContact,getSingleContact,updateContact,deleteContact}=require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');
const router=express.Router();
// router.route("/").get(getContact)
// router.route("/:id").get(getSingleContact)
// router.route("/:id").post(createContact);
// router.route('/:id').put(updateContact)
// router.route('/:id').delete(deleteContact)
//we can merge similar route containing method as on which will work find

router.use(validateToken)
router.route("/").get(getContact)
router.route("/:id").get(getSingleContact).post(createContact).put(updateContact).delete(deleteContact)
module.exports=router;