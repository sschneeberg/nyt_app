'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class movie extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    movie.init({
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        byline: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        headline: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        pub_date: {
            type: DataTypes.DATE,
            validate: { isDate: true }
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: { isUrl: true }
        }
    }, {
        sequelize,
        modelName: 'movie',
    });
    return movie;
};