const Fakulteti = require("../models/fakultetiModel");
const moment=require("moment");

exports.checkBody = (req, res, next) => {
    if (!req.body.emertimi) {
      return res.status(400).json({
        status: 'fail',
        message: 'Mungon emertimi i  fakultetit'
      });
    }
    next();
  };
  exports.getAllFakulteti = async (req, res) => {
    try {
      // EXECUTE QUERY
      
        
      const fakultetet = await Fakulteti.find();
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: fakultetet.length,
        data: {
          fakultetet
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.getFakulteti = async (req, res) => {
    try {
      const fakulteti = await Fakulteti.findById(req.params.id);
      // Tour.findOne({ _id: req.params.id })
  
      res.status(200).json({
        status: 'success',
        data: {
          fakulteti
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.createFakulteti =  async (req, res) => {
    // console.log(req.body);
  
    const newFakulteti = await Fakulteti.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
          fakulteti: newFakulteti
        }
      });
    };
  
  exports.updateFakulteti = async (req, res) => {
    try {

      const fakulteti = await Fakulteti.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
       
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          fakulteti
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.deleteFakulteti = async (req, res) => {
    try {
      await Fakulteti.findByIdAndDelete(req.params.id);
  
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };