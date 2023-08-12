'use strict';
module.exports = (sequelize) => {
    const { Model, DataTypes } = require('sequelize');
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Users }) {
            // define association here
            this.hasMany(Users, {
                foreignKey: 'role_id',
            });
        }
    }
    Role.init(
        {
            role_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Role',
            freezeTableName: true,
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['name'],
                },
            ],
        }
    );
    return Role;
};
