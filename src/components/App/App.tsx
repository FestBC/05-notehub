import css from "./App.module.css";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

import { fetchNotes } from "../../services/noteService";

import { type Note} from "../../types/note";

import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 0;

  const handleChange = (value: string): void => {
    setQuery(value);
    setPage(1);
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
              onCancel={handleClose}
            />
          </Modal>
      }
	    <header className={css.toolbar}>
        <SearchBox
          searchTextValue={query}
          onChange={handleChange}
        />
        {
          totalPages > 1 &&
            <Pagination
              onPageChange={setPage}
              currentPage={page}
              totalNumberPages={totalPages}
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
        notes.length === 0 && !isLoading &&
        <p>Sorry, but there's no results on this query.</p>
      }
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong...</p>}
      {
        notes.length !== 0 &&
          <NoteList
            notes={notes}
          />
      }
    </div>
  );
}