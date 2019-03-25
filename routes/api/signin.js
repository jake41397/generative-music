const User = require('../../models/user.model.js');
const UserSession = require('../../models/UserSession.js');

module.exports = (app) => 
{
    /*
     * Sign up
     */
    app.post('/api/account/signup', (req, res, next) => {
        let { body } = req;

        let {
            email,
            password
        } = body;

        if (!email)
        {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }

        if (!password)
        {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        email = email.toLowerCase();
        

        // Steps:
        // 1. Verify email doesn't exist
        // 2. Save it

        User.find({
            email: email
        }, (err, previousUsers) => {
            
            if (err) 
            {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            else if (previousUsers.length > 0)
            {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists'
                });
            }

            // Save the new user
            const newUser = new User();

            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err)
                {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Successfully Signed Up'
                });
            });
        });
    });

    app.post('/api/account/signin', (req, res, next) => {
        let { body } = req;

        let {
            email,
            password
        } = body;

        if (!email)
        {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank'
            });
        }

        if (!password)
        {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank'
            });
        }

        email = email.toLowerCase();

        // Find the user by email and verify the password hash
        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }

            if (users.length != 1)
            {
                return res.send({
                    success: false,
                    message: 'Error: This email is not associated with an account'
                });
            }

            const user = users[0];
            
            if (!user.validPassword(password))
            {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Password'
                });
            }

            // Otherwise user validated
            const userSession = new UserSession();
            userSession.userID = user._id;
            userSession.save((err, doc) => {
                
                if (err) 
                {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }

                return res.send({
                    success: true,
                    message: 'Successfully Signed In',
                    token: doc._id
                });
            });
        });
    });

    app.get('/api/account/verify', (req, res, next) => {
        // Get the token
        const { query } = req;
        const { token } = query;
        // ?token=test

        // Verify the token is one of a kind and it's not deleted

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err)
            {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }

            if (sessions.length != 1)
            {
                console.log(token);
                return res.send({
                    success: false,
                    message: 'Error: Invalid token'
                });
            }
            else
            {
                return res.send({
                    success: true,
                    message: 'Verified'
                });
            }
        });
    });

    app.get('/api/account/logout', (req, res, next) => {
        //Get the token
        const { query } = req;
        const { token } = query;
        // ?token=test

        // Verify the token is one of a kind it's not deleted
        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {$set:{isDeleted:true}}, null, (err, sessions) => {
            if (err)
            {
                return res.send({
                    success: false,
                    message: "Error: Server error"
                });
            }

            return res.send({
                success: true,
                message: 'Successfully logged out'
            })
        });
    });
};