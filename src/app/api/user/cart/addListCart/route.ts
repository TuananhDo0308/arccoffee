import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils';
import { auth } from '@/auth';

export const POST = async (req: NextRequest) => {
    const session=await auth()
    const token =session?.user?.accessToken

    try {        
        const body = await req.json();
        const { items } = body;  
        console.log("data:",items)
   
        const response = await httpClient.post({
            url: apiLinks.cart.addListCart,
            token: token,
            data:items
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