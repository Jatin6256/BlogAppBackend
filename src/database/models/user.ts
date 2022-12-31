import { DataType, DataTypes } from "sequelize";
import { sequelize } from "../connect";
import Post from "./post";


const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password   : {
        type: DataTypes.STRING,
        allowNull: false
    },
});

User.hasMany(Post, {
    foreignKey: 'userId',
});
Post.belongsTo(User,{
    foreignKey: "userId"
});


export default User;