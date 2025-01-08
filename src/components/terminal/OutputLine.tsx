import React from 'react';

interface OutputLineProps {
  line: React.ReactNode;
}

const OutputLine: React.FC<OutputLineProps> = ({ line }) => (
  <div className="whitespace-pre-line">{line}</div>
);

export default OutputLine;
