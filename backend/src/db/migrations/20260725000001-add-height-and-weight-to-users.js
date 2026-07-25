export async function up({ context: { queryInterface, Sequelize } }) {
  const tableInfo = await queryInterface.describeTable('users');
  if (!tableInfo.height_cm) {
    await queryInterface.addColumn('users', 'height_cm', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  }
  if (!tableInfo.pre_pregnancy_weight_kg) {
    await queryInterface.addColumn('users', 'pre_pregnancy_weight_kg', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  }
}

export async function down({ context: { queryInterface, Sequelize } }) {
  const tableInfo = await queryInterface.describeTable('users');
  if (tableInfo.height_cm) {
    await queryInterface.removeColumn('users', 'height_cm');
  }
  if (tableInfo.pre_pregnancy_weight_kg) {
    await queryInterface.removeColumn('users', 'pre_pregnancy_weight_kg');
  }
}
