const Joi = require("joi");

//=============================//
//     Joi schema Validate     //
//=============================//
const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
});

//======================================//
//     Joi schema Validate for login    //
//======================================//
const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

//=============================//
//    User schema Validate    //
//=============================//
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

//===================================//
//    User Update schema Validate    //
//===================================//
const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string(),
});

//=============================//
//    Employee schema Validate    //
//=============================//
const employeeSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

//====================================//
//    Update Employee schema Validate    //
//====================================//
const updateEmployeeSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string(),
  teamId: Joi.string(),
});

//==================================//
//     Password schema Validate     //
//==================================//
const email = Joi.object({
  email: Joi.string().email().required(),
});

//==================================//
//     Invoice schema Validate     //
//==================================//
const invoiceSchema = Joi.object({
  customer_id: Joi.string().required(),
  invoiceNumber: Joi.string().required(),
  totalAmount: Joi.number().required(),
  items: Joi.array().items(
    Joi.object({
      description: Joi.string().required(),
      quantity: Joi.number().required(),
      unitPrice: Joi.number().required(),
    })
  ),
});

//==================================//
//     Project schema Validate      //
//==================================//
const projectSchema = Joi.object({
  projectName: Joi.string().min(3).max(30).required(),
  team: Joi.array().items(Joi.string()),
  tasks: Joi.array().items(Joi.string()),
});

//========================================//
//    Update Project schema Validate      //
//========================================//
const updateProjectSchema = Joi.object({
  projectName: Joi.string().min(3).max(30),
  team: Joi.array().items(Joi.string()),
  tasks: Joi.array().items(Joi.string()),
});

//==================================//
//       Task schema Validate       //
//==================================//
const taskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(200).required(),
  projectId: Joi.string(),
  assignedTo: Joi.array().items(Joi.string()),
});

//========================================//
//      Update Task schema Validate       //
//========================================//
const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  description: Joi.string().min(3).max(200),
  projectId: Joi.string(),
  assignedTo: Joi.array().items(Joi.string()),
});

//==================================//
//       Team schema Validate       //
//==================================//
const teamSchema = Joi.object({
  teamName: Joi.string().min(3).max(30).required(),
  members: Joi.array().items(Joi.string()),
  projectId: Joi.array().items(Joi.string()),
});
//========================================//
//      Update Team schema Validate       //
//========================================//
const updateTeamSchema = Joi.object({
  teamName: Joi.string().min(3).max(30),
  members: Joi.array().items(Joi.string()),
  projectId: Joi.array().items(Joi.string()),
});

module.exports = {
  schema,
  userSchema,
  updateUserSchema,
  employeeSchema,
  updateEmployeeSchema,
  email,
  schemaLogin,
  invoiceSchema,
  projectSchema,
  updateProjectSchema,
  taskSchema,
  updateTaskSchema,
  teamSchema,
  updateTeamSchema
};
