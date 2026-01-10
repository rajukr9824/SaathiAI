import { useEffect, useState, useRef } from "react";
import { sendMessage } from "../services/api";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const userId = localStorage.getItem("userId");

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
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center h-full w-full p-0 sm:p-4">
      <div className="w-full max-w-2xl bg-slate-900/50 flex flex-col sm:rounded-2xl sm:border sm:border-slate-800 shadow-2xl overflow-hidden">
        
        <div className="text-center border-b border-slate-800 bg-slate-950/50 py-3 shrink-0">
          <h2 className="text-sm sm:text-base font-semibold text-green-400">Saathi</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">AI Companion</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "ml-auto bg-indigo-600 text-white rounded-tr-none"
                  : "mr-auto bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-[11px] text-slate-400 animate-pulse">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Saathi is thinking...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 sm:p-4 bg-slate-950/80 border-t border-slate-800 shrink-0">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-green-500/50"
            />
            <button
              onClick={handleSend}
              className="bg-green-500 hover:bg-green-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;