export async function up({ context: { queryInterface, Sequelize } }) {
  await queryInterface.createTable('hospital_visits', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    baby_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'babies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    visit_for: {
      type: Sequelize.ENUM('mother', 'baby'),
      defaultValue: 'mother',
      allowNull: false,
    },
    hospital_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    doctor_name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    reason: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    visit_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    follow_up_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM('completed', 'upcoming'),
      defaultValue: 'completed',
      allowNull: false,
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

  await queryInterface.addIndex('hospital_visits', ['user_id'], {
    name: 'idx_hospital_visits_user_id',
  });

  await queryInterface.addIndex('hospital_visits', ['baby_id'], {
    name: 'idx_hospital_visits_baby_id',
  });
}

export async function down({ context: { queryInterface } }) {
  await queryInterface.dropTable('hospital_visits');
}
