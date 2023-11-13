const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      blog_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Blog',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            Key: 'id',
        },
      }
    },
    {
      sequelize,
      timestamps: true,   // need create time and updated time
      freezeTableName: true,
      underscored: true,
      modelName: 'comment',
    }
  );
  
  module.exports = Comment;