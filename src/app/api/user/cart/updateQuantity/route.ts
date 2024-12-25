import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils';
import { auth } from '@/auth';

export const PUT = async (req: NextRequest) => {
    const session=await auth()
    const token =session?.user?.accessToken

    try {        
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId'); // Lấy productId từ query params
        const quantity = searchParams.get('Quantity'); // Lấy Quantity từ query params
        console.log(productId, quantity);
        const response = await httpClient.patch({
            url: `${apiLinks.cart.updateQuantity}/${productId}?Quantity=${quantity}`, // Thay productId vào URL
            token: token, // Thay token nếu cần
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