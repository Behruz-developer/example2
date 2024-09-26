// api.js
import axiosClient from './axiosClient';

export const fetchBlogPost = async () => {
    try {
        const data = await axiosClient.get('news/bloger-ispolnila-svoyu-mechtu-i-sozdala-kinoteatr-pod-otkrytym-nebom-v-samarkande-chto-tam-mozhno-posmotret');
        return data; // Olingan ma'lumotlarni qaytarish
    } catch (error) {
        console.error("Xatolik:", error);
        throw error; // Xatolik bo'lsa, tashlash
    }
};
