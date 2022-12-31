import { DataType, DataTypes, DATE } from "sequelize";
import { sequelize } from "../connect";


const UserLikedPostRelation = sequelize.define('userLikePostRelation',{
    userId: {
        type: DataTypes.INTEGER,
    },
    postId: {
        type: DataTypes.INTEGER
    }
});


export default UserLikedPostRelation;