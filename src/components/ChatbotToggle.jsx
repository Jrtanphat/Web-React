import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker from "emoji-picker-react";

const BotAvatar = () => (
  <svg
    className="h-9 w-9 shrink-0 rounded-full p-1.5 bg-indigo-600 text-white"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
  >
    <path
      fill="#fff"
      d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"
    />
  </svg>
);

const ThinkingDots = () => (
  <div className="flex gap-1 py-2">
    <span className="h-2 w-2 rounded-full bg-indigo-600/80 animate-bounce [animation-delay:-.2s]"></span>
    <span className="h-2 w-2 rounded-full bg-indigo-600/80 animate-bounce"></span>
    <span className="h-2 w-2 rounded-full bg-indigo-600/80 animate-bounce [animation-delay:.2s]"></span>
  </div>
);

const MessageBubble = ({ role, text, attachment }) => {
  const isUser = role === "user";
  return (
    <div
      className={`flex ${isUser ? "flex-col items-end" : "items-start gap-2"}`}
    >
      {!isUser && <BotAvatar />}
      <div
        className={`max-w-[75%] text-sm ${
          isUser
            ? "text-white bg-indigo-600 rounded-[13px_13px_3px_13px]"
            : "bg-indigo-50 text-slate-900 rounded-[13px_13px_13px_3px]"
        } px-4 py-3 whitespace-pre-line`}
      >
        {text}
      </div>
      {attachment && (
        <img
          alt="attachment"
          src={attachment}
          className={`mt-1 rounded-[13px_3px_13px_13px] ${
            isUser ? "ml-auto" : ""
          } w-1/2 object-cover`}
        />
      )}
    </div>
  );
};

export default function ChatbotToggle({ position = "br" }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [sending, setSending] = useState(false);

  const textareaRef = useRef(null);
  const listRef = useRef(null);

  const corner = position === "bl" ? "left-10 bottom-10" : "right-35 bottom-9";
  const mobilecorner = position === "bl" ? "left-5 bottom-5" : "right-25 ";

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  const readFileAsBase64 = (file) =>
    new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => {
        const [meta, base64] = String(fr.result).split(",");
        const mime = meta.match(/data:(.*);base64/)[1];
        res({ base64, mime, dataUrl: fr.result });
      };
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text && !file) return;
    setInput("");
    setShowEmoji(false);

    setMessages((prev) => [
      ...prev,
      { role: "user", text, attachment: file?.dataUrl ?? null },
      { role: "thinking", text: "", attachment: null },
    ]);
    setFile(null);
    setSending(true);

    // Giả lập bot trả lời sau 1 giây
    setTimeout(() => {
      setMessages((prev) => {
        const next = [...prev];
        const idx = next.findIndex((m) => m.role === "thinking");
        if (idx !== -1) {
          next.splice(idx, 1, {
            role: "model",
            text: `Bot đã nhận: "${text}"`,
          });
        }
        return next;
      });
      setSending(false);
    }, 1000);
  }, [input, file]);

  const handleFileChange = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const parsed = await readFileAsBase64(f);
    setFile({ ...parsed });
  };

  return (
    <>
      {/* Nút bật/tắt */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className={`fixed z-50 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg md:${corner} ${mobilecorner}`}
        animate={{ rotate: open ? 90 : 0 }}
      >
        {open ? "✕" : "💬"}
      </motion.button>

      {/* Khung chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`fixed ${
              position === "bl" ? "left-5" : "right-5"
            } bottom-24 w-[420px] max-w-[calc(100vw-1.25rem)] overflow-hidden rounded-2xl bg-white shadow-2xl`}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-indigo-600 px-5 py-3 text-white">
              <span className="font-semibold">Chatbot</span>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* Body */}
            <div
              ref={listRef}
              className="flex h-[460px] flex-col gap-4 overflow-y-auto px-5 py-6"
            >
              {messages.length === 0 && (
                <div className="text-center text-sm text-slate-500">
                  Bắt đầu trò chuyện 👋
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i}>
                  {m.role === "thinking" ? (
                    <div className="flex items-start gap-2">
                      <BotAvatar className="bg-white" />
                      <div className="rounded-2xl bg-indigo-50 px-3">
                        <ThinkingDots />
                      </div>
                    </div>
                  ) : (
                    <MessageBubble
                      role={m.role}
                      text={m.text}
                      attachment={m.attachment}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="relative border-t border-slate-200 px-4 pb-5 pt-3">
              <div
                className={`flex items-end rounded-full border ${
                  input.length > 0 ? "border-indigo-600" : "border-indigo-200"
                } bg-white px-2`}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Nhập tin nhắn..."
                  className="max-h-44 w-full resize-none bg-transparent px-3 py-3 text-sm outline-none"
                  rows={1}
                />
                <div className="flex items-center gap-1 py-1 pr-1">
                  {/* File upload */}
                  <div className="relative">
                    <input
                      type="file"
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      className="grid h-9 w-9 place-content-center rounded-full text-slate-600 hover:bg-indigo-50"
                    >
                      📎
                    </button>
                  </div>
                  {/* Emoji */}
                  <button
                    type="button"
                    onClick={() => setShowEmoji((v) => !v)}
                    className="grid h-9 w-9 place-content-center rounded-full text-slate-600 hover:bg-indigo-50"
                  >
                    😊
                  </button>
                  {/* Send */}
                  <button
                    onClick={handleSend}
                    disabled={sending || (!input.trim() && !file)}
                    className="ml-1 grid h-9 w-9 place-content-center rounded-full bg-indigo-600 text-white disabled:opacity-50"
                  >
                    ➤
                  </button>
                </div>
              </div>

              {/* File preview */}
              {file && (
                <div className="mt-2 flex items-center gap-2">
                  <img
                    src={file.dataUrl}
                    alt="preview"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <button
                    onClick={() => setFile(null)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Bỏ tệp
                  </button>
                </div>
              )}

              {/* Emoji picker */}
              <AnimatePresence>
                {showEmoji && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full"
                  >
                    <div className="w-[350px] max-w-[86vw] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                      <EmojiPicker
                        onEmojiClick={(emojiData) => {
                          setInput((prev) => prev + emojiData.emoji);
                        }}
                        theme="light"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
