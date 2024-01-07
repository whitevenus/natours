const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.fisrtName = user.name.split(" ")[0];
    this.url = url;
    this.from = `White Venus <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        prot: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        // Activate in Gmail "less secure app" option
      });
      // Sendgrid
      // console.log("=================:", process.env.SENDGRID_PASSWORD);
      // return nodemailer.createTransport({
      //   service: "SendGrid",
      //   auth: {
      //     user: process.env.SENDGRID_USER,
      //     pass: process.env.SENDGRID_PASSWORD,
      //   },
      // });
      // const mg = mailgun.client({
      //   username: "api",
      //   key: "<PRIVATE_API_KEY>",
      // });
      // mg.messages
      //   .create(sandboxae258466b79746018d74bd8a1ae06efe.mailgun.org, {
      //     from: "Mailgun Sandbox <postmaster@sandboxae258466b79746018d74bd8a1ae06efe.mailgun.org>",
      //     to: ["j1908386454@gmail.com"],
      //     subject: "Hello",
      //     text: "Testing some Mailgun awesomness!",
      //   })
      //   .then((msg) => console.log(msg)) // logs response data
      //   .catch((err) => console.log(err)); // logs any error`;
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      prot: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Activate in Gmail "less secure app" option
    });
  }

  // send the actual email
  async send(template, subject) {
    // 1) Render HTML based on pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      fisrtName: this.fisrtName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // 3) Create a transporter and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWellcome() {
    await this.send("welcome", "欢迎来到 Natours 大家庭~");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "你的密码重置令牌有效期只有 10 分钟 📢");
  }
};
