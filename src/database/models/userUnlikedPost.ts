import { DataType, DataTypes, DATE } from "sequelize";
import { sequelize } from "../connect";


const UserUnlikedPostRelation = sequelize.define('userUnlikePostRelation',{
    userId: {
        type: DataTypes.INTEGER,
    },
    postId: {
        type: DataTypes.INTEGER
    }
});


export default UserUnlikedPostRelation;