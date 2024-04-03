
import Package from "../models/Package.js"; 
export const createPackage=async(req,res,next)=>{
    const newPackage=new Package(req.body)
try{
    const savedPackage=await newPackage.save()
    res.status(200).json(savedPackage)

}catch(err){

next(err);
}
}
export const updatePackage=async(req,res,next)=>{
        try{
            const updatedPackage=await Package.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedPackage);
        
        }catch(err){

next(err);
}
}
export const deletePackage=async(req,res,next)=>{
        try{
            await Package.findByIdAndDelete(req.params.id);
            res.status(200).json("Package has been deleted");
        
        }catch(err){
            next(err);
}
}
export const getPackage = async (req, res, next) => {
  try {
    const apackage = await Package.findById(req.params.id);
    res.status(200).json(apackage);
  } catch (err) {
    next(err);
  }
};
export const getPackages = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
     
    const packages = await Package.find({...others,price: { $gt: min | 1, $lt: max ||15000 },})
    res.status(200).json(packages);
  } catch (err) {
    next(err);
  }
};
export const countBypackageType = async (req, res, next) => {
    try {
  
      const coupleCount = await Package.countDocuments({ packageType: "Couple" });
      const groupCount = await Package.countDocuments({ packageType: "Group" });
      const ladiesSpecialCount = await Package.countDocuments({ packageType: "Ladies Special" });

  
      res.status(200).json([
        { packageType: "Couple", count:coupleCount },
        { packageType: "Group", count:  groupCount },
        { packageType: "Ladies Special", count: ladiesSpecialCount },
      ]);
    } catch (err) {
      next(err);
    }
  };
  export const getAllDestinations = async (req, res, next) => {
    try {
        // Assuming you have a method in your Package model to fetch destination options
        const destinations = await Package.distinct("destinationName");
        res.status(200).json(destinations);
    } catch (err) {
        next(err);
    }
};
export const getPackageCount = async (req, res, next) => {
  try {
      const packagesCount = await Package.countDocuments();
      res.status(200).json({ packagesCount });
  } catch (err) {
      next(err);
  }
};