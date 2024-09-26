import React, { useEffect, useRef, useState } from 'react';

export const TelegramPost = ({ postId }: { postId: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [scriptCode, setScriptCode] = useState<string | null>(null); // script kodini saqlash uchun o'zgaruvchi

    useEffect(() => {
        if (!ref.current) return;

        // Script yaratish
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-post', postId);
        script.setAttribute('data-width', '100%');

        // Script kodini o'zgaruvchiga saqlash
        setScriptCode(script.outerHTML); // script tagini string sifatida saqlaymiz

        ref.current.appendChild(script);

        return () => {
            // O'chirish uchun scriptni olib tashlash
            if (ref.current) {
                ref.current.innerHTML = '';
            }
        };
    }, [postId]);

    // scriptCode o'zgaruvchisini konsolga chiqarish
    useEffect(() => {
        if (scriptCode) {
            console.log('Yuklangan script:', scriptCode);
        }
    }, [scriptCode]);

    return <div ref={ref} />;
};
