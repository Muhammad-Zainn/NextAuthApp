import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

type mail = {
  email: string;
  emailType: string;
  userId: number;
};

export const sendEmail = async ({ email, emailType, userId }: mail) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
      console.log("Updated User for Verify: ", updatedUser);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // set to true if using port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: "zainjamil@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your password",
      html: `<p>CLick <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here<a/> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy or paste the link in your browser <br/> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken} </p>`,
    };

    const MailResponse = await transporter.sendMail(mailOptions);
    return MailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
