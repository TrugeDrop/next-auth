import connectMongo from '../../../utils/connectMongo';
import Test from '../../../models/Users';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addUser(req, res) {
  try {
    await connectMongo();
    
    console.log('CREATING DOCUMENT');
    const test = new Test(req.body);
    test.save(function(err){
        if(err) return res.json({ error: err });
        res.json({ test });
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
