import * as SQLite from 'expo-sqlite';
import { createContext, ReactNode, useEffect } from 'react';

export interface INote {
  title: string;
  body: string;
}

export type NoteContextType = {
  createNote: (payload: INote) => void;
};

export const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const db = SQLite.openDatabaseSync('notes.db');

  async function createNote({ title, body }: INote) {
    const result = await db.runAsync(`INSERT INTO notes (title, body) VALUES (?, ?)`, title, body);
    console.log(result);
  }

  useEffect(() => {
    async function setup() {
      await db.withTransactionAsync(async () => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR NOT NULL, body VARCHAR)
        `);
      });

      const notes = await db.getAllAsync('SELECT * FROM notes');
      console.log(notes);
    }

    setup();
  }, [db]);

  return <NoteContext.Provider value={{ createNote }}>{children}</NoteContext.Provider>;
};
