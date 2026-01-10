import { useEffect, useState, useRef } from "react";
import { sendMessage } from "../services/api";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage({ userId, message: input });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-2 pt-14">
      <div className="
        w-full
        max-w-xl
        h-screen
        sm:h-[80vh]
        bg-slate-900
        rounded-none
        sm:rounded-2xl
        shadow-2xl
        flex
        flex-col
      ">

        {/* Header */}
        <div className="text-center border-b border-slate-800 bg-slate-950 py-3">
          <h2 className="text-base sm:text-lg font-semibold tracking-wide text-green-400">
            Saathi
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400">
            Your thoughtful companion
          </p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-3">

          {messages.map((m, i) => (
            <div
              key={i}
              className={`
                max-w-[85%] sm:max-w-[75%]
                px-4 py-2
                rounded-2xl
                text-sm
                leading-relaxed
                shadow
                ${
                  m.role === "user"
                    ? "ml-auto bg-linear-to-br from-cyan-400 to-indigo-500 text-slate-900"
                    : "mr-auto bg-green-500/90 text-slate-900"
                }
              `}
            >
              {m.content}
            </div>
          ))}

          {loading && (
            <div className="text-xs text-slate-400 italic">
              Saathi is typing…
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-2 sm:p-3 border-t border-slate-800 bg-slate-950">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message…"
            className="
              flex-1
              bg-slate-900
              border border-slate-600
              rounded-xl
              px-4 py-2
              text-sm text-white
              placeholder-slate-400
              outline-none
              focus:ring-2 focus:ring-white
            "
          />

          <button
            onClick={handleSend}
            className="
              px-4 sm:px-5
              py-2
              rounded-xl
              font-medium
              bg-linear-to-br from-cyan-400 to-indigo-500
              text-slate-900
              hover:opacity-90
            "
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;

