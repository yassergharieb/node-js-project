const express = require("express");
const res = require("express/lib/response");
const userModel = require("../db/models/user.models");
const fs = require("fs");
const path = require("path");

class User {
  static admminRegister = async (req, res) => {
    try {
      const user = new userModel(req.body);
      user.role = "admin";

      await user.save();
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "admin registered successfully",
      });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        data: error.message,
        message: "something wrong happend",
      });
    }
  };

  static userRegister = async (req, res) => {
    try {
      const user = new userModel(req.body);
      user.role = "user";
      await user.save();
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "user registered successfully",
      });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        data: error.message,
        message: "something wrong happend",
      });
    }
  };

  static getSingleUser = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        res.status(404).send({
          apiStatus: false,
          data: null,
          message: "invalid user ID",
        });
      }
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "data fetched",
      });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        error: error,
        message: error.message,
      });
    }
  };

     static getAllUsers = async (req, res) => {
    try {
      const AllUsers = await userModel.find();
      res.status(200).send({
        apiStatus: true,
        data: AllUsers,
        message: "data fethched",
      });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        data: null,
        error: error,
        message: error.message,
      });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const userData = await userModel.findByIdAndDelete(req.user._id);
      res.status(200).send({
        apiStatus: true,
        data: userData,
        message: "data deleted",
      });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        error: error,
        message: e.message,
      });
    }
  };

  static updateUser = async (req, res) => {
    try {
      const userData = await userModel.findByIdAndUpdate(
        req.user._id,
        req.user.body,
        { runValidators: true }
      );
      res.status(200).send({
        apiStatus: true,
        data: userData,
        message: "data updated",
      });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        error: error,
        message: e.message,
      });
    }
  };

  static login = async (req, res) => {
    try {
      const user = await userModel.loginUser(req.body.Email, req.body.Password);
      const token = await user.generateToken();
      res.status(200).send({
        apiStatus: true,
        data: { user, token },
        message: "logged in",
      });
    } catch (error) {
      res
        .status(500)
        .send({ apiStatus: false, error: error, message: error.message });
    }
  };

  static updatePassword = async () => {
    try {
      const user = req.user;
      user.Password = req.body.Password;
      await userData.save();
      res.status(200).send({
        apiStatus: true,
        data: user,
        message: "PASSWORD UPDATED",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        message: "logged out",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };
  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        message: "logged out",
      });
    } catch (e) {
      res.status(500).send({ apiStatus: false, error: e, message: e.message });
    }
  };

  static uploadImageFIRST = async (req, res) => {
    try {
      const ext = path.extname(req.file.originalname);
      const newName = "images/" + req.file.fieldname + Date.now() + ext;
      fs.rename(req.file.path, newName, () => {});
      req.user.image = newName;
      req.user.name = req.body.name;
    
      await req.user.save();
      res.send({ data: req.user });
    } catch (e) {
      res.send(e.message);
    }
  };

  static uploadImageNEW = async (req, res) => {
    try {
      const oldFile = req.user.image;
      req.user.image = req.file.path;
      req.user.name = req.body.name;
  
      await req.user.save();
      fs.unlinkSync(oldFile);
      res.send({ data: req.user });
    } catch (e) {
      res.send(e.message);
    }
  };
  static profile = async (req, res) => {
    res
      .status(200)
      .send({ apiStatus: true, data: req.user, message: "data featched" });
  };
}

module.exports = User;
