import { Avatar } from "../services/post.service";

export abstract class PostUtil {

    // Paleta 12 kolorów pasujących do projektu (np. pastelowe/tailwindowe)
    static readonly AVATAR_COLORS = [
        '#f87171', // red-400
        '#fb923c', // orange-400
        '#fbbf24', // yellow-400
        '#34d399', // green-400
        '#38bdf8', // sky-400
        '#60a5fa', // blue-400
        '#a78bfa', // purple-400
        '#f472b6', // pink-400
        '#facc15', // amber-400
        '#4ade80', // emerald-400
        '#818cf8', // indigo-400
        '#c084fc', // violet-400
    ];

    // Funkcja generująca avatar
    public static generateAvatar(title: string, content: string): Avatar {
        const letter = (title?.trim() ? title.trim()[0] : content?.trim()?.[0] || '').toUpperCase();
        // Prosty hash na podstawie tekstu, żeby kolor był deterministyczny dla danego posta
        let hash = 0;
        for (let i = 0; i < letter.length; i++) {
            hash = letter.charCodeAt(i) + ((hash << 5) - hash);
        }
        const colorHex = this.AVATAR_COLORS[Math.abs(hash) % this.AVATAR_COLORS.length];

        // Wylicz kontrastujący kolor tekstu (czarny lub biały)
        function getContrastYIQ(hex: string) {
            // Usuwa # jeśli jest
            hex = hex.replace('#', '');
            // Zamienia na RGB
            const r = parseInt(hex.substr(0,2),16);
            const g = parseInt(hex.substr(2,2),16);
            const b = parseInt(hex.substr(4,2),16);
            // YIQ formula
            const yiq = ((r*299)+(g*587)+(b*114))/1000;
            return yiq >= 128 ? '#222' : '#fff';
        }
        const textColor = getContrastYIQ(colorHex);

        return { colorHex: colorHex, letterColorHex: textColor, letter };
    } 
}