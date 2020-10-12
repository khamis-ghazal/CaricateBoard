const accounts = require("./accounts.js");
const Joi = require("joi");
const express = require("express");

const authRouter = express.Router();

authRouter.get("/accounts", (req, res) => {
  res.json(accounts);
});

authRouter.post("/sign-up", (req, res) => {
  const { error } = validateAccount(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const account = {
    id: accounts.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  accounts.push(account);
  res.json(account);
});

authRouter.put("/change-account-information/:id", (req, res) => {
  const account = accounts.find(
    (account) => account.id === parseInt(req.params.id)
  );
  if (!account)
    return res.status(404).json("The account with the given ID was not found.");

  const { error } = validateAccount(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
  }

  account.name = req.body.name;
  account.email = req.body.email;
  account.password = req.body.password;

  res.json(account);
});

authRouter.put("/change-account-name/:id", (req, res) => {
  const account = accounts.find(
    (account) => account.id === parseInt(req.params.id)
  );
  if (!account)
    return res.status(404).json("The account with the given ID was not found.");

  const { error } = validateAccountName(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
  }

  account.name = req.body.name;

  res.json(account);
});

authRouter.put("/change-account-email/:id", (req, res) => {
  const account = accounts.find(
    (account) => account.id === parseInt(req.params.id)
  );
  if (!account)
    return res.status(404).json("The account with the given ID was not found.");

  const { error } = validateAccountEmail(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
  }

  account.email = req.body.email;

  res.json(account);
});

authRouter.put("/change-account-password/:id", (req, res) => {
  const account = accounts.find(
    (account) => account.id === parseInt(req.params.id)
  );
  if (!account)
    return res.status(404).json("The account with the given ID was not found.");

  const { error } = validateAccountPassword(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
  }

  account.password = req.body.password;

  res.json(account);
});

authRouter.delete("/remove-account/:id", (req, res) => {
  const account = accounts.find(
    (account) => account.id === parseInt(req.params.id)
  );
  if (!account)
    return res.status(404).json("The account with the given ID was not found.");

  const index = accounts.indexOf(account);
  accounts.splice(index, 1);
  res.json(account);
});

const validateAccount = (account) => {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(account, schema);
};

const validateAccountName = (account) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(account, schema);
};

const validateAccountEmail = (account) => {
  const schema = {
    email: Joi.string().min(3).required(),
  };
  return Joi.validate(account, schema);
};

const validateAccountPassword = (account) => {
  const schema = {
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(account, schema);
};

module.exports = authRouter;
