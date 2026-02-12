import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !url.startsWith('http') || url.includes('your-supabase-url')) {
        console.warn('Supabase configuration missing: LogicBricks is running in demo mode. To persist flows, please add your credentials to .env.local.');
    }

    return createBrowserClient(
        url || 'https://placeholder-url.supabase.co',
        key || 'placeholder-key'
    );
};
