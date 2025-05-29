import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils';
import { auth } from '@/auth';

export const PUT = async (req: NextRequest) => {
    const session=await auth()
    const token =session?.user?.accessToken

    try {        
        const body = await req.json();
        const data = body;  
        console.log("data:",data)
   
        const response = await httpClient.post({
            url: apiLinks.bill.placeOrder,
            token: token,
            data:data
        });
        const res = response.data;
        
        return NextResponse.json({ res }, { status: 200 });
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