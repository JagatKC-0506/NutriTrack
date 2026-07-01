export default {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('users');
    if (tableInfo.diet_preference) {
      await queryInterface.removeColumn('users', 'diet_preference');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'diet_preference', {
      type: Sequelize.STRING,
      defaultValue: 'Non-Vegetarian',
      allowNull: true,
    });
  },
};
