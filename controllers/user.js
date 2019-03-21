const User = require('../models').User;
const jwt = require('jsonwebtoken')

module.exports = {
    create(req,res){
        return User.create({username: req.body.username, password: req.body.password })
                    .then(user => res.status(201).send(user))
                    .catch(error => res.status(400).send(error))
    },
    login(req,res){
        console.log("edwin", req.body);
        return User.findAll({where:{username: req.body.username, password: req.body.password}})
                    .then(user => {
                        if(user.length){
                            const currentUser = user[0].dataValues;
                            console.info(currentUser);
                            var tokenData = {
                                user:currentUser.id
                              }
                            var token = jwt.sign(tokenData, 'Secret Password', {
                                expiresIn: 60 * 60 * 24 // expires in 24 hours
                            });
                            tokenData = { ...tokenData,
                                            token
                              }
                            res.status(200).send(tokenData)

                        }else{
                            res.status(404).send(null)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(400).send(error)

                    })
    },
    // all(req,res){
    //     console.log(req)
    //     return Company.findAll({
    //         include: [{all:true}]
    //     })
    //         .then(companies => res.status(201).send(CompanySerializer.serialize(companies)))
    //         .catch(error => res.status(400).send(error))
    // },
    // getById(req,res){
    //     return Company.findByPk(req.params.id)
    //       .then(company => res.status(201).send(CompanySerializer.serialize(company)))
    //       .catch(error => res.status(400).send(error))
    // },
}