export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('development_milestones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      baby_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'babies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      milestone_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      milestone_key: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      expected_age_months: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      completed_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('development_milestones', ['baby_id'], {
      name: 'idx_milestones_baby_id',
    });

    await queryInterface.addIndex('development_milestones', ['baby_id', 'milestone_key'], {
      name: 'idx_milestones_baby_key',
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('development_milestones');
  },
};
