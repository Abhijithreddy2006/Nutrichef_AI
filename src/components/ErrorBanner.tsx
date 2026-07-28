import { AlertTriangle, RotateCcw, Key, ExternalLink } from 'lucide-react'

interface ErrorBannerProps {
  message: string
  onRetry: () => void
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  const isKeyError =
    message.toLowerCase().includes('api key') ||
    message.toLowerCase().includes('groq') ||
    message.toLowerCase().includes('openrouter') ||
    message.toLowerCase().includes('gemini') ||
    message.toLowerCase().includes('missing')

  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 dark:border-red-900/60 bg-red-50/90 dark:bg-red-950/40 p-6 md:p-8 shadow-sm space-y-4 animate-slide-up"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
        <div className="flex gap-3.5 items-start">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-300 flex items-center justify-center shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-bold text-lg text-red-900 dark:text-red-200">
              Recipe Generation Failed
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed max-w-2xl">
              {message}
            </p>
          </div>
        </div>

        <button
          onClick={onRetry}
          className="flex items-center gap-2 font-semibold text-sm text-white bg-red-600 hover:bg-red-700 active:scale-95 px-5 py-2.5 rounded-xl transition-all shrink-0 shadow-sm cursor-pointer"
        >
          <RotateCcw size={16} />
          Try Again
        </button>
      </div>

      {isKeyError && (
        <div className="pt-4 border-t border-red-200/80 dark:border-red-900/50 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-red-800 dark:text-red-300 flex items-center gap-1.5">
            <Key size={14} /> Quick Free API Key Setup Guide:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-white/70 dark:bg-stone-900/70 p-3.5 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                1. Groq API Key (Recommended)
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 inline-flex items-center"
                >
                  <ExternalLink size={12} />
                </a>
              </span>
              <p className="text-stone-600 dark:text-stone-400 leading-normal">
                Sign up at console.groq.com &rarr; Create API key &rarr; Add to <code className="bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded">.env.local</code> as:
              </p>
              <code className="block bg-stone-900 text-emerald-400 p-2 rounded-lg font-mono text-[11px] overflow-x-auto">
                VITE_GROQ_API_KEY=gsk_...
              </code>
            </div>

            <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-white/70 dark:bg-stone-900/70 p-3.5 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                2. OpenRouter API Key
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 inline-flex items-center"
                >
                  <ExternalLink size={12} />
                </a>
              </span>
              <p className="text-stone-600 dark:text-stone-400 leading-normal">
                Sign up at openrouter.ai &rarr; Create key &rarr; Add to <code className="bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded">.env.local</code> as:
              </p>
              <code className="block bg-stone-900 text-emerald-400 p-2 rounded-lg font-mono text-[11px] overflow-x-auto">
                OPENROUTER_API_KEY=sk-or-v1-...
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
