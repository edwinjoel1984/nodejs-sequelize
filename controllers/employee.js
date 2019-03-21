const Employee = require('../models').Employee;
const EmployeeSerializer = require('../serializers/employee.serializer');

module.exports = {
    create(req,res){
        const {name, last_name, designation, companyId} = req.body
        return Employee.create({name, last_name,  designation, companyId})
                    .then(employee => res.status(201).send(employee))
                    .catch(error => res.status(400).send(error))
    },
    update(req,res){
        return Employee.update({name: req.body.name, last_name: req.body.last_name,  designation: req.body.desgination, companyId: req.body.companyId},
                               { returning:true, where: {id: req.params.id }})
                    .then(() => {
                        Employee.findByPk(req.params.id)
                        .then(employee => {
                            res.status(200).send(EmployeeSerializer.serialize(employee))
                          })
                        .catch(error => res.status(400).send(error))
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(400).send(error)})
    },
    all(req,res){
        return Employee.findAll()
          .then(employees => res.status(201).send(EmployeeSerializer.serialize(employees)))
            .catch(error =>{ 
                console.log(error);
                res.status(400).send(error)
            })
    },
    getById(req,res){
        return Employee.findByPk(req.params.id,{
             include: [{all:true}]
        })
          .then(employee => {
              res.status(201).send(EmployeeSerializer.serialize(employee))
            })
          .catch(error => res.status(400).send(error))
    },
}