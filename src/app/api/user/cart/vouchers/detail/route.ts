import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils';
import { auth } from '@/auth';

export const POST = async  (req: NextRequest) => {
    const { code, subtotal } = await req.json();

    try {
        const session=await auth()
        const token =session?.user?.token        
        const response = await httpClient.get({
            url: apiLinks.voucher.getDetailVoucher, 
            params:{"code":code},
            token: token
        });
        const voucher = response.data;
        console.log(voucher)
        if (!voucher) {
          return NextResponse.json({ success: false, message: "Invalid voucher code" }, { status: 400 });
        }
    
        if (subtotal < voucher.minOrderValue) {
          return NextResponse.json({ success: false, message: `Order value must be at least ${voucher.minOrderValue}` }, { status:  200 });
        }
    
        const data = response.data;

        return NextResponse.json({success:true, data }, { status: 200 });
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