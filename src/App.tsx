import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const App = () => {
    const url = "https://api.theregistan.uz/v1/api/news/nasha-tsel-pokazat-miru-drugoy-uzbekistan-soosnovateli-gravity-bar-i-sapiens-hotel";

    // API'dan ma'lumot olish uchun funksiya
    async function getData() {
        const res = await axios.get(url);
        return res.data;
    }

    // React Query orqali ma'lumot olish
    const { data, error, isError, isFetching, isLoading } = useQuery({
        queryKey: ["blogPost"],
        queryFn: getData,
    });

    // Xatolik holatini ko'rsatish
    if (isError) {
        console.log('Xatolik:', error);
        return <p>Xatolik yuz berdi: {error.message}</p>;
    }

    // Ma'lumotni to'g'ri formatlash
    const title = data?.data?.title || 'Sarlavha topilmadi';
    const content = data?.data?.content?.data || '';

    // <pre> ichidagi kodlarni HTML formatiga keltirish
    const processPreTags = (html) => {
        const withoutPreTags = html.replace(/<\/?pre[^>]*>/g, "");
        const unescapedContent = withoutPreTags
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
        return unescapedContent;
    };

    // HTML kodni tozalash
    const cleanedContent = processPreTags(content);

    // Sahifa yuklangandan keyin scriptlarni ishlatish
    useEffect(() => {
        const scripts = document.querySelectorAll("script");
        scripts.forEach((script) => {
            const newScript = document.createElement("script");
            newScript.src = script.src;
            newScript.async = true;
            document.body.appendChild(newScript);
        });
    }, []); // cleanedContent dependensiyani olib tashlash

    return (
        <div>
            <h1>Blog Post</h1>
            {isLoading && <p>Yuklanmoqda...</p>}
            {isFetching && <p>Ma'lumot yangilanmoqda...</p>}
            <h2>{title}</h2>

            <div dangerouslySetInnerHTML={{ __html: cleanedContent || 'Tavsif topilmadi' }} />
        </div>
    );
};

export default App;
