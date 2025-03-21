import './globals.css';
import FontPreload from '@/components/FontPreload';

export const metadata = {
    title: 'Kayak Racing Website',
    description: 'The official hub and launcher for Kayak Racing game. Discover breathtaking courses, latest updates, and join our growing community of racing enthusiasts.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <FontPreload />
        {children}
        </body>
        </html>
    );
}