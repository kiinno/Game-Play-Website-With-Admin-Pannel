const mongoose = require("mongoose");
const { db_uri } = require("../config/globals");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  publish_date: Date,
  image: {
    type: String,
    default: null,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model("user", schema);

function ModelResponse(status, message, data = null) {
  this.status = status;
  this.message = message;
  this.data = data;
}

async function isUserExists(username = "", email = "") {
  try {
    await mongoose.connect(db_uri);
    const user = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (user) {
      if (user.username === username)
        throw new ModelResponse(
          true,
          `Username ${username} is already taken`,
          username
        );
      else user.email === email;
      throw new ModelResponse(
        true,
        `Email ${email} is already exists you can login or reset password`,
        email
      );
    }
    return new ModelResponse(false, null, { username, email });
  } catch (error) {
    return error;
  } finally {
    await mongoose.disconnect();
  }
}

async function addNewUser(data) {
  try {
    const check = await isUserExists(data.username, data.email);
    if (check.status) throw new ModelResponse(false, check.message, check.data);
    else {
      await mongoose.connect(db_uri);
      const hashed_password = await bcrypt.hash(data.password, 15);
      const active_data = Object.assign(
        ({ username, email, first_name, last_name } = data),
        {
          password: hashed_password,
          publish_date: Date.now(),
          image: null,
        }
      );
      const user = new UserModel(active_data);
      const resault = await user.save();
      return new ModelResponse(true, "account created successfuly", resault);
    }
  } catch (error) {
    return error;
  } finally {
    await mongoose.disconnect();
  }
}

async function getUserByID(uid) {
  try {
    await mongoose.connect(db_uri);
    return await UserModel.findById(uid);
  } catch (error) {
    return error;
  } finally {
    await mongoose.disconnect();
  }
}

async function createAuthentication(username, password) {
  try {
    await mongoose.connect(db_uri);
    const _auth = await UserModel.findOne({ username });
    if (_auth) {
      const validate_pass = await bcrypt.compare(password, _auth.password);
      if (validate_pass) {
        if (!_auth.deleted) {
          return new ModelResponse(true, undefined, _auth);
        } else {
          throw new ModelResponse(
            false,
            `Account ${_auth.username} was deleted`,
            { username, password }
          );
        }
      } else
        throw new ModelResponse(false, "Password inccorect please try again", {
          username,
          password,
        });
    } else {
      throw new ModelResponse(false, `User ${username} is not exists`, {
        username,
        password,
      });
    }
  } catch (error) {
    return error;
  } finally {
    await mongoose.disconnect();
  }
}

async function deleteUser(id) {
  try {
    await mongoose.connect(db_uri);
    return await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { deleted: true } }
    );
  } catch (error) {
    return error;
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = {
  isUserExists,
  addNewUser,
  getUserByID,
  createAuthentication,
  deleteUser,
  UserModel,
};
