import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils'
export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    console.log(formData)
    const response = await httpClient.post({
      url: apiLinks.user.register,
      data: formData,
      contentType: 'multipart/form-data',
    });

    const data = response.data;
debugger
    // Return success response
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error during authentication:', error);

    // Handle Axios errors
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.message || 'Failed to authenticate';
      return NextResponse.json(
        { message: errorMessage },
        { status: error.response.status }
      );
    }

    // Handle generic errors
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};