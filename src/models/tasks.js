// 'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define(
    'Tasks',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      deadline: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      imageEvidence: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      }
    },
    {}
  );
  // eslint-disable-next-line
  Tasks.associate = models => {
    // associations can be defined here
  };
  return Tasks;
};
