import {Sequelize} from "sequelize";

const db = new Sequelize('nploy_native','root','',{
    host: 'localhost',
    port: '4306',
    dialect: "mysql"
});

export default db;