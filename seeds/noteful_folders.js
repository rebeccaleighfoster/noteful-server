
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('noteful_folders').del()
    .then(function () {
      // Inserts seed entries
      return knex("noteful_folders").insert([
        { id: 1, folder_name: "lannister" },
        { id: 2, folder_name: "stark" },
        { id: 3, folder_name: "targaryan" }
      ]);
    });
};
