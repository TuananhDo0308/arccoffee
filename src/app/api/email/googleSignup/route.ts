import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils';

export const POST = async (request: NextRequest) => {
  try {
    // Lấy dữ liệu từ body của request
    const body = await request.json();
    console.log("Received Body:", body);

    // Gửi yêu cầu POST với JSON
    const response = await httpClient.post({
      url: apiLinks.authen.registerGoogle,
      data: body, // Dữ liệu từ request body
    });

    // Trả về dữ liệu phản hồi từ API
    const responseData = response.data;
    return NextResponse.json({ data: responseData }, { status: 200 });
  } catch (error) {
    console.error('Error during registration:', error);

    // Xử lý lỗi từ Axios
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || 'Failed to authenticate';
      return NextResponse.json(
        { message: errorMessage },
        { status: error.response.status }
      );
    }

    // Xử lý lỗi không xác định
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
