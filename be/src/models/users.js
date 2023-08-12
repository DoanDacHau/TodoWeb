'use strict';

module.exports = (sequelize) => {
    const { Model, DataTypes } = require('sequelize');
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({Role,Categories}) {
            this.belongsTo(Role, {
                foreignKey: 'role_id',
            });
            this.hasMany(Categories, {
                foreignKey: 'user_id',
            });
        }
    }

    Users.init(
        {
            user_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            role_id: {
                // is member
                defaultValue: 2,
                type: DataTypes.INTEGER,
            },
            codeActive: DataTypes.STRING,
            status: {
                // not verification
                defaultValue: 2,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'Users',
            freezeTableName: true,
            createdAt: 'created_date',
            updatedAt: 'updated_date',
        }
    );
    return Users;
};
