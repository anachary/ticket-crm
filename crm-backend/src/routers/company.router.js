const express = require("express")
const router = express.Router()
const {
    getCompanies,
    getCompanyById,
    insertCompany,
    updateCompany
  } = require("../model/company/Company.model");

const { userAuthorization} = require("../middleware/authorization.middleware");
const {createNewCompanyValidation } = require("../middleware/formValidation.middleware.js")

router.all("/", (req,res,next) =>{
 //res.json({message:"ticket router is healthy"})

 next();
})

// Get all companies for a specific user
router.get("/", userAuthorization, async (req, res) => {
    try {
      const userId = req.userId;
      const result = await getCompanies();
  
      return res.json({
        status: "success",
        result,
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });
  
  // Get all tickets for a specific user
  router.get("/:_id", userAuthorization, async (req, res) => {
    try {
      const { _id } = req.params;
  
      const clientId = req.userId;
      const result = await getCompanyById(_id);
  
      return res.json({
        status: "success",
        result,
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });


// create new Company
router.post(
    "/",
    createNewCompanyValidation,
    userAuthorization,
    async (req, res) => {
      try {
        const { name, status} = req.body;
  
        const companyObj = {
          name,
          status,
          updatedBy:req.userId,
          updatedDate: Date.now,
        };
  
        const result = await insertCompany(companyObj);
  
        if (result._id) {
          return res.json({
            status: "success",
            message: "New Company has been created!",
          });
        }
  
        res.json({
          status: "error",
          message: "Unable to create the comapany , please try again later",
        });
      } catch (error) {
        res.json({ status: "error", message: error.message });
      }
    }
  );
  

// update ticket
router.post("/update-company/:_id", userAuthorization, async (req, res) => {
    
    try {
    const { status, name} = req.body;
  
        const userId = req.userId;
        const { _id } = req.params;
  
        const companyObj = {
          _id,
          status,
          name,
          updateDate: Date.now(),
          updatedBy:req.userId
        };
  
        const result = await updateCompany({_id, companyObj});
        
        if (result._id) {
          return res.json({
            status: "success",
            message: "Company has been updated!",
          });
        }
  
        res.json({
          status: "error",
          message: "Unable to update the company , please try again later",
        });
      } catch (error) {
        res.json({ status: "error", message: error.message });
      }
  });

  module.exports = router 