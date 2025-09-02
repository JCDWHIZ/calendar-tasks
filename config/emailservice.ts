import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com", // smtp.gmail.com // smtppro.zoho.eu // smtp.zoho.com
  port: 587,
  secure: false, // true for 465, false for other
  service: "gmail",
  auth: {
    user: "jesseugboh@gmail.com",
    pass: "password",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async () => {
  const info = await transporter.sendMail({
    from: '"Jesse"',
    to: "demilade228@gmail.com, azinofamous@gmail.com",
    subject: "Hello from class ✔",
    html: `<h1 style="background-color: red; color: blue;">Hello world?, how is your day going</h1>`,
  });
  console.log("info", info);
  console.log("Message sent:", info.messageId);
};
