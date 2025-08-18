import css from "./SearchBox.module.css";

interface SearchBoxProps {
    searchTextValue: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchBox({ searchTextValue, onChange }: SearchBoxProps) {
    return (
        <input
            className={css.input}
            type="text"
            defaultValue={searchTextValue}
            placeholder="Search notes"
            onChange={onChange}
        />
    );
}