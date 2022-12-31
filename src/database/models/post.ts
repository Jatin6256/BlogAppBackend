import { DataType, DataTypes, DATE } from "sequelize";
import { sequelize } from "../connect";


const Post = sequelize.define('Post',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
    },
    keywords: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    like: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    unlike: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});


export default Post;