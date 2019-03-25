// Imports:
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");

app.use(cors());

// Body Parser Middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));

// Connect to MongoDB server using Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully.");
});

// API routes
require('./routes')(app);

//#region EXAMPLE API
/*
//#region TODO API ENDPOINTS

// The route for '.../todos' to list all todos
todoRoutes.route('/').get(function(req, res)
{
    Todo.find(function(err, todos)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.json(todos);
        }
    })
})

// The route for '../todos/:id' to grab a specific todo object by its ID
todoRoutes.route('/:id').get(function(req, res)
{
    let id = req.params.id;

    Todo.findById(id, function(err, todo)
    {
        res.json(todo);
    });
});

// The route for '../todos/add' to add new todo from local to database
todoRoutes.route('/add').post(function(req, res)
{
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

// The route for '../todos/update/:id' to update an existing todo by its ID
todoRoutes.route('/update/:id').post(function(req, res)
{
    Todo.findById(req.params.id, function(err, todo)
    {
        if (!todo)
        {  
            res.status(404).send('data is not found');
        }
        else
        {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});
//#endregion

//#region USER API ENDPOINTS
/// USER API ENDPOINTS

// The route for '.../users' to list all users
userRoutes.route('/').get(function(req, res)
{
    User.find(function(err, users)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.json(users);
        }
    })
})

// The route for '../user/:id' to grab a specific user by its ID
userRoutes.route('/:id').get(function(req, res)
{
    let id = req.params.id;

    User.findById(id, function(err, todo)
    {
        res.json(todo);
    });
});

// The route for '../users/add' to add new user from local to database
userRoutes.route('/add').post(function(req, res)
{
    let user = new User(req.body);
    user.save()
        .then(todo => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

// The route for '../users/update/:id' to update an existing user by its ID
userRoutes.route('/update/:id').post(function(req, res)
{
    User.findById(req.params.id, function(err, user)
    {
        if (!user)
        {  
            res.status(404).send('data is not found');
        }
        else
        {
            user.user_name = req.body.user_name;
            user.user_password = req.body.user_password;

            user.save().then(user => {
                res.json('User updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

/// END OF USER API ENDPOINTS
//#endregion
*/

//#endregion

// Specify the routers for the APIs
//app.use('/todos', todoRoutes);
//app.use('/users', userRoutes);

// Catch all the uri's not already handled by routers and redirect them to the build index.html so the router can handle them
app.get('/*', function(req, res)
{
    res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err)
            {
                if (err)
                {
                    res.status(500).send(err);
                }
            })
});

// Listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));