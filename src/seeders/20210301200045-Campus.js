module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('campus', [
      {
        name: 'Test campus',
        address: 'Test address',
        city: 'Test city',
        province: 'Test province',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('campus', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
