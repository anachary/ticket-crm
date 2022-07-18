const { CompanySchema } = require("./Company.schema")

async function getCompanies(){
      try {
         const data = await CompanySchema.find()
         return data
        } catch (error) {
        throw error
      }
  };
  
  async function getCompanyById(_id){
      try {
        const data = await CompanySchema.find({ _id })
        return data
      } catch (error) {
        throw error
      }
  };
  
  async function insertCompany(companyObj){
      try {
        const data = await CompanySchema(companyObj).save()
        console.log(data)
        return data
      } catch (error) {
        throw error;
      }
  };
  
  
  async function updateCompany ({_id,companyObj}){
      try {
        const data = await CompanySchema.findOneAndUpdate(
          { _id },
          {
            ...companyObj,
          },
          { new: false }
        )
        return data
      } catch (error) {
        throw error
      }
  };
  
  module.exports = {
    getCompanies,
    getCompanyById,
    insertCompany,
    updateCompany
  };
  