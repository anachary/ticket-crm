const { token } = require("morgan");
const { ResetPinSchema } = require("./RestPin.schema");

const { randomPinNumber } = require("../../utils/randomGenerator");

async function setPasswordRestPin(email) {
  //reand 6 digit
  const pinLength = 6;
  const randPin = await randomPinNumber(pinLength);

  const restObj = {
    email,
    pin: randPin,
  };

  try {
    const data = await ResetPinSchema(restObj).save()
    return data
  } catch (error) {
    throw error
  }
}

async function getPinByEmailPin(email, pin) {
    try {
      ResetPinSchema.findOne({ email, pin }, (error, data) => {
        if (error) {
          console.log(error);
          return false;
        }
      return data;
      });
    } catch (error) {
      console.log(error);
      return false
    }
}

function deletePin(email, pin) {
  try {
    ResetPinSchema.findOneAndDelete({ email, pin }, (error, data) => {
      if (error) {
        console.log(error);
      }
      return
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  setPasswordRestPin,
  getPinByEmailPin,
  deletePin,
};
