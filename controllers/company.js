const Company = require('../models').Company;
const CompanySerializer = require('../serializers/company.serializer');

module.exports = {
    create(req,res){
        return Company.create({name: req.body.name})
                    .then(company => res.status(201).send(company))
                    .catch(error => res.status(400).send(error))
    },
    all(req,res){
        console.log(req)
        return Company.findAll({
            include: [{all:true}]
        })
            .then(companies => res.status(201).send(CompanySerializer.serialize(companies)))
            .catch(error => res.status(400).send(error))
    },
    getById(req,res){
        return Company.findByPk(req.params.id)
          .then(company => res.status(201).send(CompanySerializer.serialize(company)))
          .catch(error => res.status(400).send(error))
    },
}