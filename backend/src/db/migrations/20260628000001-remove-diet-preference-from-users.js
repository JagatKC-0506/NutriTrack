export async function up({ context: { queryInterface } }) {
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('users')) return;
  const tableInfo = await queryInterface.describeTable('users');
  if (tableInfo.diet_preference) {
    await queryInterface.removeColumn('users', 'diet_preference');
  }
}

export async function down({ context: { queryInterface, Sequelize } }) {
  const tables = await queryInterface.showAllTables();
  if (!tables.includes('users')) return;
  await queryInterface.addColumn('users', 'diet_preference', {
    type: Sequelize.STRING,
    defaultValue: 'Non-Vegetarian',
    allowNull: true,
  });
}
