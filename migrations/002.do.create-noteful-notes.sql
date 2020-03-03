DROP TABLE IF EXISTS noteful_notes;

CREATE TABLE noteful_notes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    note_name TEXT NOT NULL,
    folder_id TEXT NOT NULL ON DELETE CASCADE NOT NULL
);

