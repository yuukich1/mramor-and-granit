import axios from 'axios';
import { Callback } from '@/types/callback';

export async function createCallback(data: Callback) {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/callback/`, 
        data
    );
}