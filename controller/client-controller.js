import Client from "../model/Client";
import { generatePassword } from "../utils/password";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Définir une fonction pour envoyer un e-mail de bienvenue contenant le mot de passe généré pour le client
async function sendWelcomeEmail(clientEmail, clientPassword) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fssproject37@gmail.com",
      pass: "fss12345678",
    },
  });

  const mailOptions = {
    from: "fssproject37@gmail.com",
    to: clientEmail,
    subject: "Bienvenue chez nous !",
    text: `Bonjour,\n\nBienvenue chez nous ! Votre mot de passe est : ${clientPassword}\n\nCordialement,\nL\'équipe de notre entreprise`,
  };

  await transporter.sendMail(mailOptions);
}

// maka ny client rehetra
export const getAllClient = async (req, res, next) => {
  let clients;

  try {
    clients = await Client.find();
  } catch (error) {
    console.log(error);
  }
  if (!clients) {
    return res.status(404).json({ message: "Pas de client!" });
  }
  return res.status(200).json({ clients });
};

//mi creer ny client iray
export const createClient = async (req, res) => {
  // try {
  //   const client = new Client(req.body);
  //   await client.save();
  //   res.status(201).json({ message: "Le cliet à bien été enregistrer!" });
  // } catch (error) {
  //   res.status(400).json({ message: error });
  // }

  const { name, phone, email, password } = req.body;
  let existingClient;
  try {
    existingClient = await Client.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingClient) {
    return res.status(400).json({ message: "Ce client exist déjà!" });
  }
  const clientPassword = generatePassword();
  const hashedPassword = bcrypt.hashSync(password);

  const client = new Client({
    name,
    phone,
    email,
    password: hashedPassword,
    roles: ["client"],
  });

  try {
    await client.save();
    //await sendWelcomeEmail(email, clientPassword);
  } catch (error) {
    return console.log(error);
  }

  return res.status(201).json({ client });
};
