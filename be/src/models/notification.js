'use strict';
module.exports = (sequelize) => {
    const { Model, DataTypes } = require('sequelize');
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Users }) {
            // define association here
            this.belongsTo(Users, {
                foreignKey: 'user_id',
            });
        }
    }
    Notification.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            user_id: DataTypes.INTEGER,
            content: DataTypes.TEXT,
            status: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Notification',
            freezeTableName: true,
            createdAt: 'created_date',
            updatedAt: 'updated_date',
        }
    );
    return Notification;
};
