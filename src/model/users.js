const Pool = require("../config/db");

const create = (data) => {
  const { id_user, email_user, password_user, fullname_user, role_user, otp } =
    data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id_user,email_user,password_user,fullname_user,role_user,verif,otp)VALUES('${id_user}','${email_user}','${password_user}','${fullname_user}','${role_user}',0,'${otp}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};
const findEmail = (email_user) =>
  new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE email_user='${email_user}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
const findUsers = (id_user) =>
  new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users where id_user='${id_user}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
const verification = (email_user) =>
  new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET verif=1 WHERE "email_user"='${email_user}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
const getUserById = (id_user) => {
  console.log(id_user);
  return Pool.query(`SELECT * FROM users WHERE id_user = '${id_user}'`);
};
const updateProfile = ({
  id_user,
  fullname_user,
  email_user,
  phone_user,
  gender_user,
  date_user,
  photo_user,
}) =>
  new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET fullname_user = COALESCE($2, fullname_user), email_user = COALESCE($3, email_user), phone_user = COALESCE($4, phone_user),
      gender_user = COALESCE($5, gender_user),date_user = COALESCE($6, date_user),photo_user = COALESCE($7,photo_user) WHERE id_user = $1`,
      [
        id_user,
        fullname_user,
        email_user,
        phone_user,
        gender_user,
        date_user,
        photo_user,
      ],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
module.exports = {
  create,
  findEmail,
  verification,
  findUsers,
  getUserById,
  updateProfile,
};
