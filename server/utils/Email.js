const nodemailer = require("nodemailer");

class Email {
  constructor(user, url = "") {
    this.user = user;
    this.to = user.email;
    this.from = `Homyz <${process.env.EMAIL_FROM}>`;
    this.url = url;
    this.name = user.firstName;
  }

  newTransport() {
    const dev = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const prod = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    return process.env.NODE_ENV === "prod" ? prod : dev;
  }

  async send(subject, text, html = "") {
    try {
      const mailOptions = {
        from: this.from,
        to: this.to,
        text: text,
        subject,
        html,
      };

      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      console.log(err);
      const error = new Error(
        "There was an error sending the email. Try again later!"
      );
      error.name = "EmailSendingError";

      this.user.emailVerifyToken = undefined;
      this.user.passwordResetToken = undefined;
      this.user.passwordResetExpires = undefined;
      await this.user.save({ validateBeforeSave: false });

      throw error;
    }
  }

  async sendWelcome() {
    const subject = `Welcome ${this.name}`;
    const text = `
      Hello, Thank you for choosing to register with us and become a valued member of our community.
      Your journey with us begins now, and we are committed to providing you with an exceptional experience.
      `;
    const html = `<p>${text}</p>`;

    await this.send(subject, text, html);
  }

  async sendEmailVerification() {
    const subject = `Hey ${this.name} verify your Email`;
    const text = `
    To complete your account setup, please click the link below to verify your email address:
      `;
    const html = `<p>
    ${text}
    <br>
    <a href="${this.url}" target="_blank">Verify me</a>
    </p>`;

    await this.send(subject, text, html);
  }

  async sendPasswordReset() {
    const subject = `Hey ${this.name} reset your password`;
    const text = `
          Hello,
        We received a request to reset your password. To proceed, please click the link below:
        <link>
        <br>
        If you didn't initiate this request, you can safely ignore this email.
      `;
    const link = `<a href="${this.url}" target="_blank">Reset My Password</a>`;

    const html = `<p>
    ${text.replace("<link>", `<br> ${link}`)}
    </p>`;

    await this.send(subject, text, html);
  }
}

module.exports = Email;
