import { useState, useEffect, useCallback } from 'react';

export function useTimer(initialSeconds: number = 0) {
    const [targetSeconds, setTargetSeconds] = useState(initialSeconds);
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: number;
        if (isRunning && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft <= 0) {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const setTime = useCallback((seconds: number) => {
        setTargetSeconds(seconds);
        setTimeLeft(seconds);
        setIsRunning(false);
    }, []);

    const addTime = useCallback((seconds: number) => {
        setTargetSeconds((prev) => prev + seconds);
        setTimeLeft((prev) => prev + seconds);
    }, []);

    const start = useCallback(() => setIsRunning(true), []);
    const pause = useCallback(() => setIsRunning(false), []);
    const reset = useCallback(() => {
        setTimeLeft(targetSeconds);
        setIsRunning(false);
    }, [targetSeconds]);

    return {
        timeLeft,
        targetSeconds,
        isRunning,
        setTime,
        addTime,
        start,
        pause,
        reset
    };
}

export function formatTime(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return {
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0')
    };
}
