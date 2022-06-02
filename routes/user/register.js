const validator = require("fastest-validator");
const v = new validator();
const knex = require("../../config/knex");
const bcrypt = require("bcryptjs");


module.exports = async function (req, res) {
  try {
    const request = req.body;
    /** data authentikasi user */
    const dataToken = req.user;

    /** validate users input */
    // const schema = {
    //   nama: { type: "string", empty: false },
    //   email: { type: "email", empty: false },
    //   password: { type: "string", min: 6 },
    //   image: { type: "string", empty: false },
    //   role_id: { type: "number", optional: true },
    //   status: { type: "enum", values: ["Active", "In-Active", "Blocked"] },
    // };
    // const validate = v.validate(req.body, schema);
    // if (validate.length) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: validate,
    //   });
    // }

    
    /** user email already exist */
    const iExist = await knex("user_data").where({ email: request.email }).first();
    if (iExist) {
      return res.status(409).json({
        status: "error",
        message: `user with email ${request.email} already exist`,
      });
    }

    /** Encrypt password */
    const encrypt_password = await bcrypt.hash(request.password, 10);

    
    const data = {
      nama: request.nama,
      email: request.email,
      password: encrypt_password,
      status: request.status,
      created_at: new Date(),
      // created_by: dataToken.user_id,
    };

    /** Query insert user */
    const createUser = await knex("user_data").insert(data).returning("*");

    return res.status(200).json({
      status: "success",
      data: {
        id: createUser.id,
      },
      message: "data successfully saved",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};
