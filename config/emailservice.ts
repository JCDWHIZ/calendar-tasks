import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com", // smtp.gmail.com // smtppro.zoho.eu // smtp.zoho.com
  port: 587,
  secure: false, // true for 465, false for other
  service: "gmail",
  auth: {
    user: "jesseugboh@gmail.com",
    pass: "ivbaezcwkmajrjqs",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendForgotPasswordMail = async (
  to: string,
  username: string,
  resetLink: string
) => {
  const info = await transporter.sendMail({
    from: '"Jesse"',
    to: to,
    subject: `Dear ${username}`,
    html: `<h1 style="background-color: red; color: blue;">
    Hello, trus your day is going fine
    please click this link to reset your password 
    <a href=${resetLink}>Link here</a>
    </h1>`,
  });
  console.log("info", info);
  console.log("Message sent:", info.messageId);
};
