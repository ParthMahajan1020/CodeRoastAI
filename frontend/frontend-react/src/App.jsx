import { useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  Bot,
  Check,
  ChevronDown,
  Clipboard,
  Code2,
  Loader2,
  RotateCcw,
  Sparkles,
  TriangleAlert,
  Zap,
} from "lucide-react";

const API_URL = "http://127.0.0.1:5000/api/roast";

const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {

        int a = 10;
        int b = 20;

        System.out.println(a + b);
    }
}`;

const languages = [
  "Java",
  "C",
  "C++",
  "Python",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "React",
  "Node.js",
  "Other",
];

function App() {
  const [language, setLanguage] = useState("Java");
  const [code, setCode] = useState(DEFAULT_CODE);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [copied, setCopied] = useState("");

  const roastCode = async () => {
    if (!code.trim()) {
      setError("Paste some code first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          language,
          code,
        }),
      });

      // Read response safely
      const contentType = response.headers.get("content-type") || "";

      let data;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          `Backend returned a non-JSON response (${response.status}). ${text.slice(
            0,
            100,
          )}`,
        );
      }

      if (!response.ok) {
        throw new Error(data?.error || "The backend returned an error.");
      }

      if (!data?.result) {
        throw new Error("AI returned an empty response.");
      }

      // Backend now returns structured JSON.
      setResult(data.result);
    } catch (err) {
      console.error(err);

      setError(err.message || "Failed to connect to the CodeRoast backend.");
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text, type) => {
    try {
      let content = "";

      if (Array.isArray(text)) {
        content = text.join("\n");
      } else {
        content = text || "";
      }

      await navigator.clipboard.writeText(content);

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {
      setError("Could not copy the text.");
    }
  };

  const reset = () => {
    setCode("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen text-zinc-100">
      {/* =========================================
          NAVBAR
      ========================================= */}

      <header className="border-b border-white/[0.07] bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
              <Bot size={18} />
            </div>

            <div>
              <h1 className="text-sm font-semibold tracking-tight">
                CodeRoast AI
              </h1>

              <p className="hidden text-[10px] text-zinc-500 sm:block">
                AI code review, but brutally honest.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs text-emerald-300 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI Online
            </div>

            <a
              href="https://github.com/ParthMahajan1020/CodeRoastAI.git"
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <Code2 size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* =========================================
          HERO
      ========================================= */}

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8 lg:pt-20">
        <section className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400">
            <Sparkles size={13} />
            AI-powered code review
          </div>

          <h2 className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Your code deserves
            <span className="block bg-gradient-to-r from-zinc-200 via-white to-zinc-500 bg-clip-text text-transparent">
              a little roasting.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
            Paste your code. Pick your language. Let CodeRoast AI find the bugs,
            questionable decisions, and questionable life choices.
          </p>
        </section>

        {/* =========================================
            EDITOR
        ========================================= */}

        <section className="mx-auto mt-12 max-w-6xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111113] shadow-2xl shadow-black/30">
            {/* EDITOR HEADER */}

            <div className="flex flex-col gap-3 border-b border-white/[0.07] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>

                <span className="ml-2 text-xs text-zinc-500">
                  code-review.txt
                </span>
              </div>

              {/* LANGUAGE */}

              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none rounded-lg border border-white/10 bg-white/[0.05] py-2 pl-3 pr-9 text-xs text-zinc-300 outline-none transition focus:border-white/25"
                >
                  {languages.map((item) => (
                    <option key={item} value={item} className="bg-zinc-900">
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />
              </div>
            </div>

            {/* CODE AREA */}

            <div className="relative overflow-hidden">
              {/* LINE NUMBERS */}

              <div className="pointer-events-none absolute left-0 top-0 bottom-0 hidden w-12 select-none overflow-hidden border-r border-white/[0.05] bg-black/10 py-5 text-right font-mono text-xs leading-6 text-zinc-700 sm:block">
                {Array.from(
                  {
                    length: Math.max(code.split("\n").length, 10),
                  },
                  (_, i) => (
                    <div key={i} className="pr-3">
                      {i + 1}
                    </div>
                  ),
                )}
              </div>

              {/* TEXTAREA */}

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                placeholder="Paste your code here..."
                className="block min-h-[360px] w-full resize-y overflow-auto bg-transparent px-5 py-5 font-mono text-sm leading-6 text-zinc-300 outline-none placeholder:text-zinc-700 sm:pl-16"
              />
            </div>

            {/* EDITOR FOOTER */}

            <div className="relative z-10 flex flex-col gap-3 border-t border-white/[0.07] bg-[#111113] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 text-xs text-zinc-600">
                <span>{code.length} characters</span>

                <span>{code.split("\n").length} lines</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={reset}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <RotateCcw size={14} />
                  Clear
                </button>

                <button
                  onClick={roastCode}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Roasting...
                    </>
                  ) : (
                    <>
                      <Zap size={14} />
                      Roast My Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            ERROR
        ========================================= */}

        {error && (
          <div className="mx-auto mt-5 flex max-w-6xl items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.05] p-4 text-sm text-red-300">
            <TriangleAlert size={18} className="mt-0.5 shrink-0" />

            <div>
              <p className="font-medium">Something went wrong</p>

              <p className="mt-1 text-xs leading-5 text-red-300/70">{error}</p>
            </div>
          </div>
        )}

        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (
          <div className="mx-auto mt-12 max-w-6xl">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] py-16">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <Loader2 size={20} className="animate-spin text-zinc-300" />
              </div>

              <p className="text-sm font-medium text-zinc-300">
                Your code is being roasted...
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Finding bugs and questionable decisions.
              </p>
            </div>
          </div>
        )}

        {/* =========================================
            RESULTS
        ========================================= */}

        {result && !loading && (
          <section className="mx-auto mt-12 max-w-6xl">
            {/* RESULT HEADER */}

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
                  <Code2 size={13} />
                  Analysis complete
                </div>

                <h3 className="text-2xl font-semibold tracking-tight">
                  The verdict is in.
                </h3>
              </div>

              {/* SCORE */}

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-base font-bold text-black">
                  {result.score ?? 0}
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    Code score
                  </p>

                  <p className="text-sm font-medium text-zinc-300">out of 10</p>
                </div>
              </div>
            </div>

            {/* =========================================
                ROAST
            ========================================= */}

            <ResultCard
              title="The Roast"
              icon={<Bot size={16} />}
              type="markdown"
              text={result.roast}
              copyKey="roast"
              copied={copied}
              onCopy={copyText}
            />

            {/* =========================================
                ISSUES + SUGGESTIONS
            ========================================= */}

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <ListResultCard
                title="Issues"
                icon={<TriangleAlert size={16} />}
                items={result.issues}
                copyKey="issues"
                copied={copied}
                onCopy={copyText}
                type="issue"
              />

              <ListResultCard
                title="Suggestions"
                icon={<Sparkles size={16} />}
                items={result.suggestions}
                copyKey="suggestions"
                copied={copied}
                onCopy={copyText}
                type="suggestion"
              />
            </div>
          </section>
        )}
      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-7 text-xs text-zinc-600 sm:flex-row lg:px-8">
          <p>CodeRoast AI</p>

          <p>Built with React · Tailwind · AI</p>
        </div>
      </footer>
    </div>
  );
}

/* =========================================
   ROAST RESULT CARD
========================================= */

function ResultCard({ title, icon, text, copyKey, copied, onCopy }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111113]">
      {/* CARD HEADER */}

      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
          <span className="text-zinc-500">{icon}</span>

          {title}
        </div>

        <button
          onClick={() => onCopy(text, copyKey)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
        >
          {copied === copyKey ? (
            <>
              <Check size={13} />
              Copied
            </>
          ) : (
            <>
              <Clipboard size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* CARD CONTENT */}

      <div className="px-5 py-6">
        {text ? (
          <div className="markdown-content">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm leading-7 text-zinc-500">
            No response was generated.
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================================
   ISSUES / SUGGESTIONS CARD
========================================= */

function ListResultCard({ title, icon, items, copyKey, copied, onCopy, type }) {
  const safeItems = Array.isArray(items) ? items : [];

  const copyContent = safeItems.join("\n");

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111113]">
      {/* CARD HEADER */}

      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
          <span className="text-zinc-500">{icon}</span>

          {title}
        </div>

        <button
          onClick={() => onCopy(copyContent, copyKey)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-zinc-600 transition hover:bg-white/[0.05] hover:text-zinc-300"
        >
          {copied === copyKey ? (
            <>
              <Check size={13} />
              Copied
            </>
          ) : (
            <>
              <Clipboard size={13} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* LIST */}

      <div className="space-y-3 px-5 py-5">
        {safeItems.length > 0 ? (
          safeItems.map((item, index) => (
            <div
              key={index}
              className="group flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 transition hover:border-white/[0.1] hover:bg-white/[0.04]"
            >
              {/* NUMBER */}

              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                  type === "issue"
                    ? "bg-red-400/10 text-red-300"
                    : "bg-emerald-400/10 text-emerald-300"
                }`}
              >
                {index + 1}
              </div>

              {/* TEXT */}

              <div className="markdown-content min-w-0 flex-1 pt-0.5">
                <ReactMarkdown>{item}</ReactMarkdown>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm leading-7 text-zinc-500">
            No {title.toLowerCase()} were detected.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
