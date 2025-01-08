import { useEffect, useRef } from "react";

interface TerminalInputProps {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  handelSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  setInput,
  input,
  handelSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handelSubmit} className="flex mt-2">
      <span className="text-primary-highlight">Dyastin@portfolio:~$</span>
      <input
        ref={inputRef}
        type="text"
        className="flex-1 bg-transparent ml-2 outline-none text-primary-highlight placeholder-secondary-foreground"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a command..."
        autoFocus
      />
    </form>
  );
};

export default TerminalInput;
