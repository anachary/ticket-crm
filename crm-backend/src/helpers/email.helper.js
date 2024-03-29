const nodemailer = require("nodemailer");
const { getPinByEmailPin } = require("../model/restPin/RestPin.model");


const getTransporter = async ()=>{
  //const testAccount = await nodemailer.createTestAccount();
  //console.log(testAccount)
  return  transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: 'akashnacharya@gmail.com',
      pass: 'jdwfq7r4HV6gsF9C',
    },
  });
  
}

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      let transporter = await getTransporter()
      let result = await transporter.sendMail(info);

      console.log("Message sent: %s", result.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      resolve(result);
    } catch (error) {
      console.log(error);
    }
  });
};

const emailProcessor = ({ email, pin, type, verificationLink = "" , ticketId =""}) => {
  let info = "";
  switch (type) {
    case "request-new-password":
      info = {
        from: '"TICKET CRM CAPSTONE" <abe.kohler59@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Password rest Pin", // Subject line
        text:
          "Here is your password rest pin" +
          pin +
          " This pin will expires in 1day", // plain text body
        html: `<b>Hello </b>
      Here is your pin 
      <b>${pin} </b>
      This pin will expires in 1day
      <p></p>`, // html body
      };

      send(info);
      break;

    case "update-password-success":
      info = {
        from: '"TICKET CRM CAPSTONE" <abe.kohler59@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Password updated", // Subject line
        text: "Your new password has been update", // plain text body
        html: `<b>Hello </b>
       
      <p>Your new password has been update</p>`, // html body
      };

      send(info);
      break;

    case "new-user-confirmation-required":
      info = {
        from: '"CRM Company" <abe.kohler59@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Please verify your new user", // Subject line
        text:
          "Please follow the link to very your account before you can login", // plain text body
        html: `<b>Hello </b>
        <p>Please follow the link to very your account before you can login</p>
        <p>${verificationLink}</P>
        `, // html body
      };

      case "update-ticket":
        info = {
          from: '"TICKET CRM CAPSTONE" <abe.kohler59@ethereal.email>', // sender address
          to: email, // list of receivers
          subject: `Ticket updated ${ticketId}`, // Subject line
          text: "There has been update on this ticket", // plain text body
          html: `<b>Hello </b>
         
        <p>There has been update on this ticket</p>`, // html body
        };

      send(info);
      break;

    default:
      break;
  }
};

const emailTestProcessor = (email) =>{
  const info = {
    from: '"CMR Company" <abe.kohler59@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Test EMAIL", // Subject line
    text:
      "This is the test email.", // plain text body
    html: `
    <p>This is the test email.</p>
    `, // html body
  };
  send(info)
  return true
}


module.exports = { emailProcessor, emailTestProcessor };
