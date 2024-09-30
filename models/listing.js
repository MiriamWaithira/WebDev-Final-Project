// models/listing.js
const { Model, DataTypes } = require('sequelize'); // Import Model and DataTypes from sequelize

module.exports = (sequelize) => {
    class Listing extends Model {
        static associate(models) {
            // Define associations here, if any
        }
    }

    Listing.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        cost: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contacts: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        workingHours: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Use DataTypes.NOW here
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Use DataTypes.NOW here
        },
    }, {
        sequelize,
        modelName: 'Listing',
        tableName: 'Listings',
        timestamps: true, // If you are using createdAt and updatedAt
    });

    return Listing;
};
