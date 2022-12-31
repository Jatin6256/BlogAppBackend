
import { DataType, DataTypes, DATE } from "sequelize";
import { sequelize } from "../connect";
import Post from "./post";
import User from "./user";


const Comment = sequelize.define('comment',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Comment.belongsTo(Post,{
    foreignKey: 'postId'
});
Comment.belongsTo(User, {
    foreignKey: 'userId'
});
Post.hasMany(Comment, {
    foreignKey: 'postId',
});
User.hasMany(Comment, {
    foreignKey: 'userId'
});

export default Comment;