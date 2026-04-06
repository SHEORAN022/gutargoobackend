const bunnyService = require("../services/bunnyService");
const CastAndCrew = require("../models/CrewCast");
const uploadImage = async (file, prefix) => {
  try {
    const result = await bunnyService.uploadImage(
      file.buffer,
      `${prefix}_${Date.now()}_${file.originalname}`,
      file.mimetype,
    );

    return {
      url: result.url,
      publicId: result.publicId,
    };
  } catch (err) {
    console.log("Upload error:", err.message);
    return null;
  }
};
exports.createCastAndCrew = async (req, res) => {
  try {
    const { personName, role, characterName } = req.body;
    let data = {
      personName,
      role,
      characterName,
    };
    if (req.files?.profileImage?.[0]) {
      const logo = await uploadImage(req.files.profileImage[0], "profile ");
      if (logo) data.profileImage = logo;
    }
    const castCrewData = await CastAndCrew.create(data);

    res.status(201).json({
      success: true,
      message: "Cast and Crew created successfully",
      data: castCrewData,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong ",
    });
  }
};
exports.getCastAndCrew = async (req, res) => {
  try {
    let { page = 1, limit = 50 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    const data = await CastAndCrew.find()
      // .skip(skip)
      // .limit(limit)
      // .sort({ createdAt: -1 });
    const countDocuments = await CastAndCrew.countDocuments();
    res.status(201).json({
      success: true,
      data,
      message: "",
      // page,
      // limit,
      // total: countDocuments,
      // totalRecords: Math.ceil(countDocuments / limit),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateCastAndCrew = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const update = await CastAndCrew.findByIdAndUpdate(
      id,updatedData,{new:true,runValidator:true}
    )
    if(!update){
      res.status(401).json({
        success:false,
        message:"Cast/Crew not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Cast/Crew Updated Successfully",
      data:update
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


exports.deleteCastAndCrew = async (req,res) =>{
  try{
    const {id} = req.params
    const deleteData = await CastAndCrew.findByIdAndDelete(id)
    if(!deleteData){
      res.status(400).json({
        success:"false",
        message:"Cast/Crew not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Cast/Crew Deleted Successfully"
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:"Something wend wrong "
    })
  }
}

exports.getCastCrewByID = async(req,res)=>{
  try{
    const {id} = req.params
    const getData = await CastAndCrew.findById(id)
    if(!getData){
      res.status(400).json({
        success:false,
        message:"Cast/Crew data not dound "
      })
    }

  }
  catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Something went wrong"
    })
  }
}