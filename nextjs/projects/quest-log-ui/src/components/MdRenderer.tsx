import ReactMarkdown from "react-markdown";

export default function MdRenderer({ fileContents }: { fileContents: string }) {
  return (
    <div>
      <ReactMarkdown>{fileContents}</ReactMarkdown>
    </div>
  );
}
