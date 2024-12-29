
import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils';
import { auth } from '@/auth'; // Đường dẫn tới cấu hình NextAuth

export const GET = async (req:NextRequest) => {
    try {
        const url = new URL(req.url);
        const email = url.searchParams.get('email'); // Lấy giá trị của query parameter 'id'
        const response = await httpClient.get({
            url: apiLinks.user.getmail,
            params:{"email":email}
        })

        const data = response.data;

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('Error during get api:', error);

        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data?.message || 'Failed to get product api'; // Thay đổi thông điệp lỗi nếu cần
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

