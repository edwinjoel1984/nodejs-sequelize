const companyController = require("../controllers").company;
const employeeController = require("../controllers").employee;
const authController = require("../controllers").user;
const jwt = require('jsonwebtoken')


module.exports = (app) => {
    app.get('/api', (req,res) => res.status(200).send({message: "Welcome to the Todos API!"}));

    app.post('/api/company', companyController.create);
    app.get('/api/company/:id', companyController.getById);
    app.get('/api/companies', companyController.all);

    app.post('/api/employee', employeeController.create);
    app.get('/api/employee/:id', employeeController.getById);
    app.put('/api/employee/:id', employeeController.update);
    app.get('/api/employees', employeeController.all);
    
    app.post('/api/user', authController.create);
    app.post('/api/login', authController.login);
    app.post('/api/login2', (req,res) =>{
        console.log(req.body);
        var tokenData = {
            username: req.body.user
          }
        
        var token = jwt.sign(tokenData, 'Secret Password', {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        res.send({token})
    })
}