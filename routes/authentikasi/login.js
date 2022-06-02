const fastValidator = require("fastest-validator");
const validator = new fastValidator();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("../../config/knex");

const { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRED } = process.env;

module.exports = async function (req, res) {
  try {
    const request = req.body;

    /** validate users input */
    const schema = {
      email: { type: "email", empty: false },
      password: { type: "string", min: 6 },
    };
    const validate = validator.validate(request, schema);
    if (validate.length) {
      return res.status(200).json({
        status: "error",
        message: validate,
      });
    }

    /* cek data */
    const user = await knex("user_data")
      .where("email", request.email)
      .whereNull("deleted_at")
      .first();
    if (!user) throw "User not found";

    /* cek password */
    const isValidpassword = await bcrypt.compare(
      request.password,
      user.password
    );
    if (!isValidpassword) {
      return res.status(403).json({
        status: "error",
        message: "wrong password",
      });
    }

    /** Generate token */
    const payloadToken = {
      id: user.id,
      email: user.email,
      nama: user.nama,
      image: user.image,
    };
    const accessToken = jwt.sign(payloadToken, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    payloadToken.token = accessToken;

    return res.status(200).json({
      status: "success",
      data: payloadToken,
      message: "login successully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};
