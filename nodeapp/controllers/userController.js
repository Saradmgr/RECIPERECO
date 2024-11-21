
import { comparePassword, hashPassword} from "../helpers/hashing.js";
import { User } from "../models/userModels.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


//Route To save new User
export const register = async (request, response) => {
    try {
      const { name, password, email, phone } = request.body;
  
      // Validate required fields
      if (!name || !password || !email || !phone) {
        return response.status(400).send({
          message: "Please send all required fields",
        });
      }
  
      // Check if the email is already taken
      const exist = await User.findOne({ email });
      if (exist) {
        return response.status(400).json({
          error: "Email is already taken",
        });
      }
  
      // Create new user object with hashed password
      const hashedPassword = await hashPassword(password);
      const newUser = {
        name,
        password: hashedPassword,
        email,
        phone,
      };
  
      // Create the user in the database
      const user = await User.create(newUser);
      return response.status(201).json(user);  // 201 status for successful creation
  
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  };

  //Route for Login Authentication 
  export const loginUser = async (request, response) => {
    try {
      const { email, password } = request.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(400).json({
          error: "Invalid Credentials",
        });
      }
  
      // Check if password matches
      const match = await comparePassword(password, user.password);
      if (!match) {
        return response.status(400).json({
          error: "Invalid Credentials",
        });
      }
  
      // Generate JWT token
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }, // Set an expiry time
        (err, token) => {
          if (err) {
            return response.status(500).json({ error: "Error generating token" });
          }
      
          // Set cookie with options
          response.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only set secure in production
            sameSite: 'lax', // Adjust sameSite based on your requirements
          });
          return response.json({ user });
        }
      );
      
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  };

//Route for GET All Users from database
export const alluser = async (request, response) => {
  try {
    const user = await User.find({});
    return response.status(200).json({
      count: user.length,
      data: user,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};
//Route for GET One Users from database by id
export const byid = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};
//Route for Update User
export const updateUser = async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.password ||
      !request.body.email ||
      !request.body.phone
    ) {
      return response.status(400).send({
        message: "send all required fields",
      });
    }
    const { id } = request.params;
    const result = await User.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "User not Found" });
    }
    return response.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};
//Route for Delete User
export const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "User not Found" });
    }
    return response.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

//Router for user track
export const getProfile=(req,res)=>{
  const {token}= req.cookie;
  if (token) {
    jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
      if(err) throw err;
      res.json(user)
    })
  } else {
    res.json(null)
  }
}

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Check for token in cookies or headers

  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info from the token to the request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};