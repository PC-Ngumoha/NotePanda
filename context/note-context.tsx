import { INote } from '@/constants/types';
import * as SQLite from 'expo-sqlite';
import { createContext, ReactNode, useEffect, useState } from 'react';

export type NoteContextType = {
  createNote: (payload: Omit<INote, 'id'>) => void;
  listNotes: () => Promise<INote[]>;
  getNote: (id: string) => Promise<INote>;
  deleteNote: (id: string) => void;
  refreshKey: number;
  updateNote: (id: string, payload: Omit<INote, 'id'>) => void;
};

export const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const db = SQLite.openDatabaseSync('notes.db');

  const [refreshKey, setRefreshKey] = useState(0); // manual refresh trigger - hacky solution

  async function createNote({ title, body }: Omit<INote, 'id'>) {
    const result = await db.runAsync(`INSERT INTO notes (title, body) VALUES (?, ?)`, title, body);
    // console.log(result);
    setRefreshKey((k) => k + 1); // A change occurred in the DB
  }

  async function updateNote(id: string, { title, body }: Omit<INote, 'id'>) {
    const result = await db.runAsync(
      `UPDATE notes SET title = ?, body = ? WHERE id = ?`,
      title,
      body,
      id,
    );
    console.log(result);
    setRefreshKey((k) => k + 1);
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

  async function deleteNote(id: string) {
    await db.runAsync('DELETE FROM notes WHERE id = ?', id);
    setRefreshKey((k) => k + 1);
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
    <NoteContext.Provider
      value={{ createNote, listNotes, getNote, deleteNote, refreshKey, updateNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
