import { useState } from 'react';
import { useTimer } from './hooks/useTimer';
import { Timer } from './components/Timer';
import { TimerSettings } from './components/TimerSettings';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import clsx from 'clsx';

function App() {
  // Start with 15 minutes by default
  const {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setTime,
    addTime
  } = useTimer(15 * 60);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <main className="min-h-screen w-full bg-bg-core flex items-center justify-center relative overflow-hidden font-rajdhani">

      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-accent/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center z-10">

        {/* Tournament Branding Placeholder */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-teko uppercase tracking-[0.2em] text-text-primary">
            BGMI <span className="text-primary-accent font-bold">Showdown</span>
          </h1>
          <p className="tracking-[0.4em] uppercase text-text-secondary mt-2 text-sm max-w-lg mx-auto">
            Official Tournament Stream
          </p>
        </div>

        {/* Main Timer Display */}
        <Timer timeLeft={timeLeft} />

        {/* Additional decorative elements */}
        <div className="mt-16 flex items-center justify-center gap-4 text-zinc-600 opacity-50 uppercase tracking-widest text-xs font-bold">
          <span className="w-16 h-px bg-zinc-700"></span>
          STREAM WILL RESUME SHORTLY
          <span className="w-16 h-px bg-zinc-700"></span>
        </div>

      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-4 z-20">
        {isRunning ? (
          <button
            onClick={pause}
            title="Pause"
            className="p-4 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-full transition-all border border-zinc-700 shadow-lg hover:scale-110 active:scale-95"
          >
            <Pause size={24} />
          </button>
        ) : (
          <button
            onClick={timeLeft > 0 ? start : undefined}
            title={timeLeft > 0 ? "Resume" : "Finished"}
            className={clsx(
              "p-4 rounded-full transition-all shadow-lg hover:scale-110 active:scale-95",
              timeLeft > 0
                ? "bg-primary-accent hover:bg-primary-hover text-zinc-900 shadow-[0_0_15px_rgba(250,204,21,0.4)]"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none border border-zinc-800"
            )}
          >
            <Play size={24} />
          </button>
        )}

        <button
          onClick={reset}
          title="Reset"
          className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-all border border-zinc-700 shadow-lg hover:scale-110 active:scale-95 text-text-secondary hover:text-text-primary"
        >
          <RotateCcw size={24} />
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          title="Settings"
          className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-all border border-zinc-700 shadow-lg hover:scale-110 active:scale-95 text-text-secondary hover:text-primary-accent group"
        >
          <Settings size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {isSettingsOpen && (
        <TimerSettings
          onClose={() => setIsSettingsOpen(false)}
          onSetTime={setTime}
          onAddTime={addTime}
        />
      )}

    </main>
  );
}

export default App;
