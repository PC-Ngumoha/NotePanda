import { INote } from '@/constants/types';
import * as SQLite from 'expo-sqlite';
import { createContext, ReactNode, useEffect } from 'react';

export type NoteContextType = {
  createNote: (payload: Omit<INote, 'id'>) => void;
  listNotes: () => Promise<INote[]>;
  getNote: (id: string) => Promise<INote>;
};

export const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const db = SQLite.openDatabaseSync('notes.db');

  async function createNote({ title, body }: Omit<INote, 'id'>) {
    const result = await db.runAsync(`INSERT INTO notes (title, body) VALUES (?, ?)`, title, body);
    console.log(result);
  }

  async function listNotes(): Promise<INote[]> {
    const notes: INote[] = await db.getAllAsync('SELECT * FROM notes');
    return notes;
  }

  async function getNote(id: string): Promise<INote> {
    const note: INote | null = await db.getFirstAsync('SELECT * FROM notes WHERE id = ?', id);
    if (!note) {
      throw new Error(`Note with ID ${id} not found`);
    }
    return note;
  }

  useEffect(() => {
    async function setup() {
      await db.withTransactionAsync(async () => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR NOT NULL, body VARCHAR)
        `);
      });
    }

    setup();
  }, [db]);

  return (
    <NoteContext.Provider value={{ createNote, listNotes, getNote }}>
      {children}
    </NoteContext.Provider>
  );
};
