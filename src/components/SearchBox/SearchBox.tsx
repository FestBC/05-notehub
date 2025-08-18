import css from "./SearchBox.module.css";

interface PropsSearchBox {
    text: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchBox({ text, onChange }: PropsSearchBox) {
    return (
        <input
            className={css.input}
            type="text"
            defaultValue={text}
            placeholder="Search notes"
            onChange={onChange}
        />
    );
}