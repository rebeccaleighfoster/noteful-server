
exports.seed = function(knex) {
  return knex('noteful_notes').del()
    .then(function () {
      // Inserts seed entries
      return knex("noteful_notes").insert([
        {
          id: 1,
          note_name: "Episode One",
          modified: "2019-01-03T00:00:00.000Z",
          folder_id: 1,
          content: "Corporis accusamus placeat quas non voluptas."
        },
        {
          id: 2,
          note_name: "Episode Two",
          modified: "2019-03-05T00:00:00.000Z",
          folder_id: 2,
          content:
            "Eos laudantium quia ab blanditiis temporibus necessitatibus."
        },
        {
          id: 3,
          note_name: "Episode Three",
          modified: "2019-08-30T00:00:00.000Z",
          folder_id: 3,
          content: "Occaecati dignissimos quam qui facere deserunt quia."
        },
        {
          id: 5,
          note_name: "Episode Five",
          modified: "2019-10-03T00:00:00.000Z",
          folder_id: 2,
          content: "Distinctio dolor nihil ad iure quo tempore id ipsum."
        },
        {
          id: 6,
          note_name: "Episode Six",
          modified: "2019-02-09T00:00:00.000Z",
          folder_id: 3,
          content:
            "Aliquid magnam ut quis quas impedit molestiae laudantium adipisci et."
        },
        {
          id: 7,
          note_name: "Episode Seven",
          modified: "2019-02-09T00:00:00.000Z",
          folder_id: 1,
          content: "Eaque aliquid sit. Ducimus consequatur nam."
        },
        {
          id: 8,
          note_name: "Episode Eight",
          modified: "2019-04-11T00:00:00.000Z",
          folder_id: 2,
          content: "Expedita mollitia et."
        },
        {
          id: 9,
          note_name: "Episode Night",
          modified: "2019-06-12T00:00:00.000Z",
          folder_id: 3,
          content: "Rem enim voluptatem autem fuga possimus."
        },
        {
          id: 10,
          note_name: "Episode Ten",
          modified: "2019-06-12T00:00:00.000Z",
          folder_id: 1,
          content: "Occaecati qui magni blanditiis. Et animi quas."
        }
      ]);
    });
};
