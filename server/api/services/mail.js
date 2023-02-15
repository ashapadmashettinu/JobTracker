import nodemailer from 'nodemailer';
const mailID = process.env.MAIL
const passKey = process.env.PASS

export const sendMail = async function(from = mailID, to, subject, text){
    return new Promise((resolve,reject)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailID,// like : abc@gmail.com
            pass: passKey
        }
    });
    
    let mailOptions = {
     from: from,
     to: to,
     subject: subject,
     text: text
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve(info);
    }); 
});
}