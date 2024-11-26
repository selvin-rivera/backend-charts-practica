const express = require('express')
const sequelize= require('./config/database')
const Producto = require('./modelos/producto')

const cors = require('cors')


const app= express();
app.use(express.json())
var port = 5000;


app.use(cors())


//SELECT productType, SUM(value) valor_total FROM producto GROUP BY productType;

app.get('/suma-valor-tipoProducto', async(req,resp) =>{

    try {
        
        const result = await Producto.findAll({
            attributes:[
                'productType',
                [sequelize.fn('SUM', sequelize.col('value')), 'Valor_Total']
            ],
            group: ["productType"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});


//Select plannerCode, MAX(value) precio_mayor from producto group by plannerCode;

app.get('/valor-productos-alto', async(req,resp) =>{

    try {
        
        const result = await Producto.findAll({
            attributes:[
                'plannerCode',
                [sequelize.fn('MAX', sequelize.col('value')), "valor_alto"]
            ],
            group: ["plannerCode"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});

//select valueCurrency, avg(value) from producto group by valueCurrency;

app.get('/promedio-tipoMoneda', async(req,resp) =>{

    try {
        
        const result = await Producto.findAll({
            attributes:[
                'valueCurrency',
                [sequelize.fn('AVG', sequelize.col('value')), 'Promedio_tipo_Moneda']
            ],
            group: ["valueCurrency"]
        });

        resp.json(result)

    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
    }

});

app.listen(port, ()=>{
    console.log('aplicacion ejecutando en puerto:' , port)
})