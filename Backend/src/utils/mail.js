import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { ApiError } from "../utils/api-error.js";

export const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Management",
      link: "https://mailgen.js/",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailGenContent);
  const emailHtml = mailGenerator.generate(options.mailGenContent);

  // adding nodemailer to send the mail to the user

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
      username: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAILTRAP_SENDER_MAIL,
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error while sending the mail");
    throw new ApiError(
      500,
      "There was an error sending the email, Please try again later",
    );
  }
};

export const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to App! We are very excited to have you onboard.",
      action: {
        instructions: "To get started with our App, pkease click here:",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help",
    },
  };
};

export const resetPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "You have requested to reset your password",
      action: {
        instructions: "To reset your password, please click the button below:",
        button: {
          color: "#22BC66",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "If you did not requested for password reset, no further action is required",
    },
  };
};
