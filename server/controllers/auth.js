import User from '../models/user';
import { hashPassword, comparePassword } from '../utils/auth'; 


export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body
        //validation
        if (!name) return res.status(400).send("Name Is Required")
        if (!password || password.length < 6) {
            res.status(400).send("Password Is Required And Should Be Min. 6 Characters")
        }
        let userExist = await User.findOne({ email }).exec();
        if (userExist) return res.status(400).send("Email Is Already Taken.");

        //hashed password
        const hashedPassword = await hashPassword(password);

        //register
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        // console.log("Saved User", user);
        return res.json({ ok: true });

    } catch (err) {
        console.log(err);
        return res.status(400).send("Error Try Again.");
    }
    
};
 