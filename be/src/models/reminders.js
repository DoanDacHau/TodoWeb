'use strict';
module.exports = (sequelize) => {
    const { Model, DataTypes } = require('sequelize');
    class Reminders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Categories}) {
            this.belongsTo(Categories, {
                foreignKey: 'category_id',
            });
        }
    }
    Reminders.init(
        {
            reminder_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            due_date: DataTypes.STRING,
            priority: DataTypes.INTEGER,
            status: DataTypes.STRING,
            category_id:DataTypes.INTEGER,
            user_id:DataTypes.INTEGER,
            schedule:DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Reminders',
            freezeTableName: true,
            createdAt: 'created_date',
            updatedAt: 'updated_date',
            
        }
    );
    return Reminders;
};
