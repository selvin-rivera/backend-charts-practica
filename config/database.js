const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('productos'/*nombre base de datos*/,'root','Amorita26',{
    host:'localhost',
    dialect:'mysql'
})

module.exports=sequelize;