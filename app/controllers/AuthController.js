const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

module.exports = {
  signIn(req, res) {
    let { email, password } = req.body;

        // search user
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ msg: "User with this email not found" });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    // create the token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    res.json({
                        user: user,
                        token: token
                    })

                } else {
                    // Unauthorized Access
                    res.status(401).json({ msg: "Incorrect Password" })
                }
            }

        }).catch(err => {
            res.status(500).json(err);
        })
  },

  signUp(req, res) {


    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

   
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: password
    }).then(user => {

        
        let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires
        });

        res.json({
            user: user,
            token: token
        });

    }).catch(err => {
        res.status(500).json(err);
    });

}
};
