import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils'

export const GET = async (request: NextRequest) => {
    try {
        const token = request.headers.get('Authorization');

        const response = await httpClient.get({
            url: apiLinks.voucher.getVouchers,
            token: token
        })

        const data = response.data;

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('Error during get api:', error);

        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data?.message || 'Failed to get home page api';
            return NextResponse.json(
                { message: errorMessage },
                { status: error.response.status }
            );
        }

        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
};