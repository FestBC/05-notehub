import css from "./App.module.css";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

import { fetchNotes, createNote, deleteNote } from "../../services/noteService";

import { type Note, type NoteFormValues } from "../../types/note";

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData
  });

  const postMutation = useMutation({
    mutationFn: async ({ title, content, tag }: NoteFormValues) => await createNote(title, content, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => setQuery(event.target.value),
    300);
  
  const handleSubmit = (values: NoteFormValues): void => {
    postMutation.mutate({
      title: values.title,
      content: values.content,
      tag: values.tag
    });
  };

  const handleDelete = (id: string): void => {
    deleteMutation.mutate(id);
  };

  const handleClose = (): void => {
    setIsModalOpened(false);
  };

  return (
    <div className={css.app}>
      {
        isModalOpened &&
          <Modal onClose={handleClose}>
            <NoteForm
              onSubmit={handleSubmit}
              onCancel={handleClose}
            />
          </Modal>
      }
	    <header className={css.toolbar}>
        <SearchBox
          text={query}
          onChange={handleChange}
        />
        {
          totalPages > 1 &&
            <Pagination
              setPage={setPage}
              page={page}
              totalPages={totalPages}
            />
        }
        <button
          className={css.button}
          onClick={() => setIsModalOpened(true)}
        >
          Create note +
        </button>
      </header>
      {
        notes.length === 0 && query !== "" && !isLoading &&
        <p>Sorry, but there's no results on this query.</p>
      }
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong...</p>}
      {
        notes.length !== 0 &&
          <NoteList
            notes={notes}
            onDelete={handleDelete}
          />
      }
    </div>
  );
}