import Agent from "../model/Agent";
import bcrypt from "bcryptjs";

//maka ny agent rehetra anaty base
export const getAllAgent = async (req, res, next) => {
  let agents;

  try {
    agents = await Agent.find();
  } catch (error) {
    console.log(error);
  }
  if (!agents) {
    return res.status(404).json({ message: "Pas d'agents!" });
  }
  return res.status(200).json({ agents });
};

//mi creer ny agent ray
export const createAgent = async (req, res, next) => {
  const { name, lastname, email, password, roles } = req.body;

  let existingAgent;
  try {
    existingAgent = await Agent.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingAgent) {
    return res.status(400).json({ message: "Cet agent exist déjà!" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const agent = new Agent({
    name,
    lastname,
    email,
    password: hashedPassword,
    task_number : 0,
    roles,
  });

  try {
    await agent.save();
  } catch (error) {
    return console.log(error);
  }

  return res.status(201).json({ agent });
};

//manao mise à jour ny agent iray ra ilaina
export const updateAgent = async (req, res, next) => {
  let id = re.params.id;
  try {
    const agent = await Agent.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: false,
    });
    if (!agent) {
      return res.status(404).json({ message: "L'agent n'existe pas!" });
    }
    res.status(201).json({ dossier });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

// login an'ny agent
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingAgent;
  try {
    existingAgent = await Agent.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!existingAgent) {
    return res.status(400).json({ message: "Cet agent n'exist pas!" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAgent.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Mot de passe incorrect!" });
  }

  return res.status(200).json({ message: "Login avec succès!" });
};
