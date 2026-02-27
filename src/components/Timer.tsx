import { formatTime } from '../hooks/useTimer';
import clsx from 'clsx';

interface TimerProps {
    timeLeft: number;
}

export function Timer({
    timeLeft
}: TimerProps) {
    const { hours, minutes, seconds } = formatTime(timeLeft);

    // Tactical blink when under 10 seconds
    const isWarning = timeLeft > 0 && timeLeft <= 10;
    const isFinished = timeLeft === 0;

    return (
        <div className={clsx(
            "relative flex flex-col items-center justify-center p-8 bg-zinc-900 border rounded-2xl overflow-hidden w-full max-w-2xl transition-all duration-500",
            isFinished ? "animate-timer-finished" : "border-zinc-800 shadow-2xl"
        )}>

            {/* Decorative Grid Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(var(--color-zinc-800) 1px, transparent 1px), linear-gradient(90deg, var(--color-zinc-800) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            {/* Neon Glow Behind Timer */}
            <div className={clsx(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 blur-[100px] rounded-full pointer-events-none transition-colors duration-1000",
                isFinished ? "bg-status-error/30" :
                    isWarning ? "bg-status-alert/30" :
                        "bg-primary-accent/20"
            )}></div>

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="uppercase tracking-[0.2em] text-primary-accent font-rajdhani font-semibold text-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-accent animate-pulse"></span>
                    Match Starting Soon
                    <span className="w-2 h-2 rounded-full bg-primary-accent animate-pulse"></span>
                </div>

                <div className={clsx(
                    "font-teko text-[12rem] leading-none tracking-tight flex items-baseline gap-4 transition-colors duration-300 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]",
                    isFinished ? "text-status-error drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" :
                        isWarning ? "text-status-alert drop-shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-pulse" :
                            "text-text-primary"
                )}>
                    {parseInt(hours) > 0 && (
                        <>
                            <div className="flex flex-col items-center">
                                <span>{hours}</span>
                                <span className="text-xl font-rajdhani text-text-secondary tracking-widest uppercase mt-[-20px] pb-5">Hours</span>
                            </div>
                            <span className="text-zinc-800 mt-[-40px] text-[8rem]">:</span>
                        </>
                    )}

                    <div className="flex flex-col items-center">
                        <span>{minutes}</span>
                        <span className="text-xl font-rajdhani text-text-secondary tracking-widest uppercase mt-[-20px] pb-5">Minutes</span>
                    </div>

                    <span className="text-zinc-800 mt-[-40px] text-[8rem] px-2">:</span>

                    <div className="flex flex-col items-center">
                        <span>{seconds}</span>
                        <span className="text-xl font-rajdhani text-text-secondary tracking-widest uppercase mt-[-20px] pb-5">Seconds</span>
                    </div>
                </div>
            </div>

            {/* Tactical Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-accent/50 m-4 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-accent/50 m-4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-accent/50 m-4 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-accent/50 m-4 pointer-events-none"></div>
        </div>
    );
}
