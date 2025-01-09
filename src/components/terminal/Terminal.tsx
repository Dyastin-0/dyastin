import React, { useState, useEffect } from "react";
import CommandHandler from "./CommandHandler";
import OutputLine from "./OutputLine";

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<React.ReactNode[]>([]);

  const commandHandlers = {
    "!help": {
      description: "List all available commands",
      execute: () => [
        <span>Available Commands:</span>,
        <span>
          <span className="text-primary-highlight">about</span> - Learn about me
        </span>,
        <span>
          <span className="text-primary-highlight">projects</span> - See my work
        </span>,
        <span>
          <span className="text-primary-highlight">contact</span> - Get in touch
        </span>,
        <span>
          <span className="text-primary-highlight">tools</span> - Tools I use
        </span>,
        <span>
          <span className="text-primary-highlight">clear</span> - Clear the
          terminal
        </span>,
      ],
    },
    about: {
      description: "Learn about me",
      execute: () => [
        <span>
          Hi, I am{" "}
          <span className="text-primary-highlight">Justine Paralejas</span>, a
          passionate developer building projects with modern web technologies. I
          enjoy crafting web applications, and continuously learning new
          technologies to enhance my skills.
        </span>,
      ],
    },
    projects: {
      description: "See my work",
      execute: () => [
        <a
          href="https://filmpin.dyastin.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-highlight underline"
        >
          Filmpin
        </a>,
        <a
          href="https://filespace.dyastin.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-highlight underline"
        >
          Filespace
        </a>,
        <a
          href="https://gitsense.dyastin.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-highlight underline"
        >
          Gitsense
        </a>,
        <a
          href="https://omnisense.dyastin.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-highlight underline"
        >
          Omnisense
        </a>,
      ],
    },
    contact: {
      description: "Get in touch",
      execute: () => [
        <a
          href="mailto:mail@dyastin.tech"
          className="text-primary-highlight underline"
        >
          mail@dyastin.tech
        </a>,
      ],
    },
    tools: {
      description: "Tools I use",
      execute: () => [
        <span className="text-primary-highlight">Backend</span>,
        <span>Go, Node.js, Express, Socket.IO, MongoDB, Firebase</span>,
        <span className="text-primary-highlight">Frontend</span>,
        <span>React, Vite, Framer Motion, Tailwind CSS</span>,
        <span className="text-primary-highlight">Data Fetching</span>,
        <span>Axios, SWR</span>,
        <span className="text-primary-highlight">DevOps</span>,
        <span>AWS EC2, GCS, Caddy</span>,

        <span className="text-primary-highlight">Version Control</span>,
        <span>Git, GitHub</span>,
      ],
    },
    clear: {
      description: "Clear the terminal",
      execute: () => {
        setOutput([]);
        return [];
      },
    },
  };

  useEffect(() => {
    const initialCommands = commandHandlers["!help"].execute();
    setOutput(initialCommands || []);
  }, []);

  return (
    <div className="flex flex-col text-primary-foreground font-mono h-screen">
      <div className="bg-secondary-secondary text-secondary-foreground p-2 rounded-t-md">
        <span className="text-primary-highlight">Dyastin</span>@portfolio:~
      </div>
      <div className="bg-secondary flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-secondary-accent rounded-b-md">
        {output.map((line, index) => (
          <OutputLine key={index} line={line} />
        ))}
        <CommandHandler
          commandHandlers={commandHandlers}
          input={input}
          setOutput={setOutput}
          setInput={setInput}
        />
      </div>
    </div>
  );
};

export default Terminal;
