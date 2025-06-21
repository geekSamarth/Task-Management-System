import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Management",
      link: "https://mailgen.js/",
    },
  });

  var emailText = mailGenerator.generatePlaintext(options);
};

const emailVerificationMailGenContent = (username, verificationUrl) => {
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
