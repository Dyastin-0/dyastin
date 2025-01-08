import TerminalInput from "./TerminalInput";

export interface CommandHandler {
  command: string;
  description: string;
  execute: () => React.ReactNode[];
}

interface CommandHandlerProps {
  commandHandlers: CommandHandler[];
  input: string;
  setOutput: React.Dispatch<React.SetStateAction<React.ReactNode[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const CommandHandler: React.FC<CommandHandlerProps> = ({
  commandHandlers,
  input,
  setOutput,
  setInput,
}) => {
  const findCommandHandler = (command: string): CommandHandler | undefined =>
    commandHandlers.find(
      (handler) => handler.command === command.toLowerCase()
    );

  const handleCommand = (command: string): React.ReactNode[] => {
    const handler = findCommandHandler(command);
    if (handler) {
      return handler.execute();
    }
    return [
      <span>
        Unknown command:{" "}
        <span className="text-primary-highlight">{command}</span>
      </span>,
      <span>
        Type <span className="text-primary-highlight">"!help"</span> for
        available commands.
      </span>,
    ];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.trim().toLowerCase() === "clear") {
      setOutput([]);
      setInput("");
    } else {
      const response = handleCommand(input.trim());
      setOutput((prev) => [...prev, <span>&gt; {input}</span>, ...response]);
      setInput("");
    }
  };

  return (
    <TerminalInput
      setInput={setInput}
      input={input}
      handelSubmit={handleSubmit}
    />
  );
};

export default CommandHandler;
