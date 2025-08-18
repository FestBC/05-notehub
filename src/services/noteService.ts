import axios from "axios";
import { type Note } from "../types/note";

interface GetResponse {
    notes: Note[],
    totalPages: number
}

export async function fetchNotes(query: string, page: number): Promise<GetResponse> {
    const response = await axios.get<GetResponse>("https://notehub-public.goit.study/api/notes", {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        },
        params: {
            search: query,
            page: page,
            perPage: 12
        }
    });

    return response.data;
}

export async function createNote(title: string, content: string, tag: string): Promise<Note> {
    const response = await axios.post<Note>("https://notehub-public.goit.study/api/notes", {
        title: title,
        content: content,
        tag: tag
    }, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    });

    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    });

    return response.data;
}