const { CompanySchema } = require("./Company.schema")

const getCompanies = () => {
    return new Promise((resolve, reject) => {
      try {
        CompanySchema.find()
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const getCompanyById = (_id) => {
    return new Promise((resolve, reject) => {
      try {
        CompanySchema.find({ _id })
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const insertCompany = (companyObj) => {
    return new Promise((resolve, reject) => {
      try {
        CompanySchema(companyObj)
          .save()
          .then((data) => {
            console.log(data)
            resolve(data)})
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  };
  
  
  const updateCompany = ({_id,companyObj})=> {
    return new Promise((resolve, reject) => {
      try {
        CompanySchema.findOneAndUpdate(
          { _id },
          {
            ...companyObj,
          },
          { new: false }
        )
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  };
  updateCompany
  module.exports = {
    getCompanies,
    getCompanyById,
    insertCompany,
    updateCompany
  };
  