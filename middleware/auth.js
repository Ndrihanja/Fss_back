import Agent from "../model/Agent";
import bcrypt from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import Client from "../model/Client";

const SECRET_JWT_CODE = "psmR3HuOihHKfqZymo1m";

export const signup = async (req, res, next) => {
  const { name, lastname, email, password, roles } = req.body;

  if (!req.body.email || !req.body.password) {
    res.json({ success: false, error: "Entrez les bonnes valeurs" });
    return;
  }
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
    task_number,
    roles,
  });

  try {
    await agent
      .save()
      .then((Agent) => {
        const token = JsonWebToken.sign(
          {
            id: agent.id,
            lastname: agent.lastname,
            email: agent.email,
            password: agent.password,
            roles: agent.roles,
          },
          SECRET_JWT_CODE
        );
        res.json({ success: true, token: token });
      })
      .catch((err) => {
        res.json({ success: false, error: err });
      });
  } catch (error) {
    return console.log(error);
  }

  return res.status(201).json({ agent });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let isPasswordValid;
  // Find the user with the given email address
  const agent = await Agent.findOne({ email }).select(
    "+_id +name +password +roles"
  );

  const client = await Client.findOne({ email }).select(
    "+_id +name +password +roles"
  );

  if (!agent && !client) {
    return res.status(404).json({ message: "User not found!" });
  }

  if (agent) {
    isPasswordValid = await bcrypt.compare(password, agent.password);
  } else if (client) {
    isPasswordValid = await bcrypt.compare(password, client.password);
  }
  // Check the password
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Return the available roles for the user
  if (agent) {
    res.json({
      roles: agent.roles,
      agent_id: agent.id,
      agent_name: agent.name,
    });
  } else if (client) {
    res.json({
      roles: client.roles,
      client_id: client.id,
      client_name: client.name,
    });
  }
};

export const choixRole = async (req, res, next) => {
  let tokenize;
  let token;
  const { role, agent_id, client_id } = req.body;
  if (agent_id) {
    // Generate a token with the selected role
    token = JsonWebToken.sign({ agentId: agent_id, role }, "secret-key", {
      expiresIn: "1h",
    });

    tokenize = {
      agent_id: agent_id,
      role: role,
      token,
    };
  } else if (client_id) {
    // Generate a token with the selected role
    token = JsonWebToken.sign({ clientId: client_id, role }, "secret-key", {
      expiresIn: "1h",
    });
    tokenize = {
      client_id: client_id,
      role: role,
      token,
    };
  }

  // Return the token
  res.json({ tokenize });
};

// Middleware to authenticate a token
export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const agentId = req.body.agent_id;

  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  JsonWebToken.verify(token, "secret-key", (err, agent) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Check if the user has the required role
    if (!agent.roles.includes("agent terrain")) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.body.agent = agent;
    next();
  });
}

export const authent = async (req, res) => {
  // Get the user's role from the token
  const { role } = req.body.role;

  // Use the user's role to determine which interface to display
  if (role === "agent terrain") {
    res.json({ message: "Agent terrain interface" });
  } else if (role === "agent superviseur") {
    res.json({ message: "Agent superviseur interface" });
  } else if (role === "agent opérand") {
    res.json({ message: "Agent opérand interface" });
  } else if (role === "agent déclarant") {
    res.json({ message: "Agent déclarant interface" });
  } else if (role === "agent finance") {
    res.json({ message: "Agent finance interface" });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
