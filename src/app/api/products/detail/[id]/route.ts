import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils';

// Chỉ nhận req, không cần params
export async function GET(req: NextRequest) {
  // Lấy id từ URL bằng req.nextUrl.pathname
  const id = req.nextUrl.pathname.split('/').pop(); // Lấy phần cuối của URL (id)

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  try {
    // Gọi API và truyền id vào URL động
    const response = await httpClient.get({
      url: `${apiLinks.homepage.getDetailProduct}/${id}`,
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

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}