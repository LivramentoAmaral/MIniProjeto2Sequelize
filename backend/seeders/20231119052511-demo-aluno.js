'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentTime = new Date();
    await queryInterface.bulkInsert('alunos', [
      {
        nome: 'Jéssica', email: 'jessica@aluno.ifpi.br', cur_id: 12,

        createdAt: currentTime, updatedAt: currentTime
      },

      {
        nome: 'Gabriel', email: 'gabriel@aluno.ifpi.br', cur_id: 12,

        createdAt: currentTime, updatedAt: currentTime
      },

      {
        nome: 'marcos', email: 'luana@aluno.ifpi.br', cur_id: 13, createdAt:

          currentTime, updatedAt: currentTime
      },

      {
        nome: 'Romário', email: 'sabrina@aluno.ifpi.br', cur_id: 14,

        createdAt: currentTime, updatedAt: currentTime
      },

      {
        nome: 'Leandro', email: 'leandro@aluno.ifpi.br', cur_id: 14,

        createdAt: currentTime, updatedAt: currentTime
      }

    ], {});



  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunos', null, {});
  }
};