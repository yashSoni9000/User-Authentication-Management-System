const User = require("../models/User");
const Team = require("../models/Team");

/////////////////////////////////
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send("Email already exists");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    const savedUser = await user.save();
    res.status(200).send({ msg: "Customer Created!!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/////////////////////////////////
// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/////////////////////////////////
// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Check if user exists
    const currentUser = await User.findById(id).exec();
    if (!currentUser) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    currentUser.username = username;
    currentUser.email = email;
    currentUser.password = hashedPassword;
    const updatedUser = await currentUser.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/////////////////////////////////
// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    // Check if user exists and then delete
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
