const Departamenti = require("../../models/departamentiModel");
const Evidenca = require("../../models/evidencat/evidencaModel");
const Fakulteti = require("../../models/fakultetiModel");
const User = require("../../models/users/userModel");
//const moment=require("moment");

exports.checkBody = (req, res, next) => {
    if (!req.body.emertimi || !req.body.fakulteti) {
      return res.status(400).json({
        status: 'fail',
        message: 'Mungon emertimi i  Departamentit ose i fakultetit'
      });
    }
    next();
  };

  exports.getAllEvidenca = async (req, res) => {
    try {
      let fak=await Fakulteti.findById(req.params.fakulteti);
      let depi=await Departamenti.findById(req.params.dep);
     // const formularet = await Evidenca.find({"fakulteti": fak.emertimi, "departamenti": depi.emertimi, "vitiakademik":req.params.vitiakademik});
     
      
      let pipeline = [
        {$match:{"vitiakademik":req.params.vitiakademik, "departamenti":depi.emertimi ,"fakulteti": fak.emertimi
      }
  } ,
  {
    "$lookup": {
        "from": "evidencepermbajtjas",
        "localField": "_id",
        "foreignField": "evidenca",
        "as": "alookup"
    }},
    {
      "$unwind": {
          "path": "$alookup"
      }
  },
  {
    $addFields: {
        totleksione: {

            "$reduce": {
                "input": "$alookup.leksione",
                "initialValue": 0,
                "in": {
                    $sum: [
                        "$$value",
                        "$$this.shuma"
                    ]
                }

            }

        }
    }
},
{
  $addFields: {
      totseminare: {

          "$reduce": {
              "input": "$alookup.seminare",
              "initialValue": 0,
              "in": {
                  $sum: [
                      "$$value",
                      "$$this.shuma"
                  ]
              }

          }

      }
  }
},
{
  $addFields: {
      totlaboratore: {

          "$reduce": {
              "input": "$alookup.laboratore",
              "initialValue": 0,
              "in": {
                  $sum: [
                      "$$value",
                      "$$this.shuma"
                  ]
              }

          }

      }
  }
},
{
  $addFields: {
      totpraktika: {

          "$reduce": {
              "input": "$alookup.praktika",
              "initialValue": 0,
              "in": {
                  $sum: [
                      "$$value",
                      "$$this.shuma"
                  ]
              }

          }

      }
  }
},{
$addFields: {
  totAuditor: {
$add: [ "$totleksione","$totseminare","$totlaboratore","$totpraktika"]

  }
}
}
,{
  $addFields: {
    udheheqjedoktorate: {
      $multiply: ["$alookup.udhehqjedoktorate", 25]
  
    }
  }
  }
  ,{
    $addFields: {
      tezedoktorate: {
        $multiply: ["$alookup.tezedoktorate", 80]
    
      }
    }
    },
    {
      $addFields: {
        juridoktorate: {
          $multiply: ["$alookup.juridoktorate", 15]
      
        }
      }
      },
      {
        $addFields: {
            udheheqjediplome: {
      $add: [{
                        $multiply: ["$alookup.diploma1", 10]
                    }, {
                        $multiply: ["$alookup.diploma2", 20]
                    }, {
                        $multiply: ["$alookup.diploma3", 30]
                      }
                    
                      ]

                    }
                  }
    },
    {
      $addFields: {
        totjashteAuditor: {
      $add: [ "$udheheqjediplome","$juridoktorate","$tezedoktorate","$udheheqjedoktorate"]
      
        }
      }
      }
      ,
    {
      $addFields: {
        oretotal: {
      $add: [ "$totjashteAuditor","$totAuditor"]
      
        }
      }
      } ,

      

 
      {
        $lookup: {
           from: "ngarkesas",
           let: {
              emerpedagogu1: "$emerpedagogu",
              mbiemerpedagogu1: "$mbiemerpedagogu",
              fakulteti1:"$fakulteti",
              departamenti1:"$departamenti"
           },
           pipeline: [
              {
                 $match: {
                    $expr: {
                       $and: [
                          {
                             $eq: [
                                "$emerpedagogu",
                                "$$emerpedagogu1"
                             ]
                          },
                          {
                             $eq: [
                                "$mbiemerpedagogu",
                                "$$mbiemerpedagogu1"
                             ]
                          }
                          ,
                          {
                             $eq: [
                                "$fakulteti",
                                "$$fakulteti1"
                             ]
                          }
                          ,
                          {
                             $eq: [
                                "$departamenti",
                                "$$departamenti1"
                             ]
                          }
                       ]
                    }
                    
                 }

  
              },
                             

     {
      $project: {vitiakademik:1, norma:1
      }},
        
           ],
           as: "result"
        }
     }  ,
     
     {$unwind: {path:"$result"} }
     ,
  
     {
      "$lookup": {
          "from": "ngarkesepermbajtjas",
          "localField": "result._id",
          "foreignField": "ngarkesa",
          "as": "alookup2"
      }
  }, {
      "$unwind": {
          "path": "$alookup2"
      }
  }, {
      $addFields: {
          totneAuditor: {
 
              "$reduce": {
                  "input": "$alookup2.lendet",
                  "initialValue": 0,
                  "in": {
                      $sum: [
                          "$$value",
                          "$$this.shuma"
                      ]
                  }
 
              }
 
          }
      }
  }, {
      $addFields: {
          totjashteAuditor: {
    $add: [{
                      $multiply: ["$alookup2.diploma1", 10]
                  }, {
                      $multiply: ["$alookup2.diploma2", 20]
                  }, {
                      $multiply: ["$alookup2.diploma3", 30]
                  }, {
                      $multiply: ["$alookup2.udhehqjedoktorate", 25]
                  }, {
                      $multiply: ["$alookup2.tezedoktorate", 80]
                  }, {
                      $multiply: ["$alookup2.juridoktorate", 15]
                  }
 
              ]
 
          }
      }
  },
 {
      $addFields: {
          planifikimi: {
    $add: [ "$totneAuditor","$totjashteAuditor"]
 
          }
      }
  },
                 

  {
    $project: {alookup2:0
    }},
    



      ];

      const formularet = await Evidenca.aggregate(pipeline);
  
      res.status(200).json({
        status: 'success',
        data: {
          formularet
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
 
  
  exports.getEvidenca = async (req, res) => {
    try {
      const evidenca = await Evidenca.findById(req.params.id);
      // Tour.findOne({ _id: req.params.id })
  
      res.status(200).json({
        status: 'success',
        data: {
          evidenca
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.createEvidenca = async (req, res) => {
    try {
        console.log("hello");
      // const newTour = new Tour({})
      // newTour.save()
      let ped= {};
     
      if (req.params.dep && req.params.vitiakademik && req.params.fakulteti && req.params.pedagogu )
      {
        ped=await User.find({"_id": req.params.pedagogu}).populate('fakulteti departamenti');
       


    }
    if (ped.length> 0) {
        

        req.body.emerpedagogu=ped[0].emri;
        req.body.mbiemerpedagogu=ped[0].mbiemri;
        req.body.titullpedagogu=ped[0].titulli;
      req.body.fakulteti=ped[0].fakulteti.emertimi;
      req.body.departamenti=ped[0].departamenti.emertimi;
      
      
        
      } 
  
      const newEvidenca = await Evidenca.create(req.body);
  
      res.status(201).json({
        status: 'success',
        data: {
          evidenca: newEvidenca
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.updateEvidenca = async (req, res) => {
    try {

      const evidenca = await Evidenca.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
       
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          evidenca
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.deleteEvidenca = async (req, res) => {
    try {
      await Evidenca.findByIdAndDelete(req.params.id);
  
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

  