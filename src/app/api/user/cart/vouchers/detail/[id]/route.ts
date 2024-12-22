import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils';
import { auth } from '@/auth';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params; // Lấy id từ URL

    try {
    const session=await auth()
    const token =session?.user?.accessToken        
    const response = await httpClient.get({
            url: apiLinks.voucher.getDetailVoucher, 
            params:{id:id},
            token: token
        });

        const data = response.data;

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('Error during get api:', error);

        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data?.message || 'Failed to fetch bill details';
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