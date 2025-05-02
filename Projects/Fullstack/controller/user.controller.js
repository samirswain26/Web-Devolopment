const registeruser = async (req,res) => {
    // res.send("registered")
    // get data 
    // validate
    // check if the user is already exists
    // create a user in the databse
    // create a verificatio token 
    // send token to the database
    // send token as email to user
    // send success status to user
    
    const{name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }
};

export {registeruser}