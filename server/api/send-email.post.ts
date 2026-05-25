import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Mensaje desde portafolio",
      text: `
Nombre: ${body.name}
Email: ${body.email}
Mensaje: ${body.message}
      `,
    });

    return { ok: true };
  } catch (error) {
    console.error(error);
    return { ok: false, error };
  }
});