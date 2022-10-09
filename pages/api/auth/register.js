import connectMongo from '../../../utils/connectMongo';
import Test from '../../../models/Users';

export default async function addUser(req, res) {
  try {
    await connectMongo();
    
    const test = new Test(req.body);
      
    test.save(function(err){
        if(err) return res.json({ status: 502, message: "Something went wrong!" });
        res.json({ status: 200, message: "Successful!" });
    });
  } catch (error) {
    res.json({ status: 500, message: error });
  }
}
