import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { httpClient, apiLinks } from '@/src/utils';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { googleID } = body;

    if (!googleID) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Google ID is required.',
        },
        { status: 200 }
      );
    }

    console.log("Sending Google ID:", googleID);

    const response = await httpClient.post({
      url: apiLinks.authen.googlesignin,
      params: { idGG: googleID }, // Kiểm tra nếu backend yêu cầu params
    });

    console.log("Response from backend:", response.data);

    if (response.status === 200) {
      return NextResponse.json(
        {
          ok: true,
          data: response.data,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        message: response.data?.message || 'Authentication failed.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Backend error response:", error.response.data);
      return NextResponse.json(
        {
          ok: false,
          message: error.response.data?.message || 'Failed to authenticate.',
        },
        { status: 200 }
      );
    }

    console.error("Unexpected error:", error.message);
    return NextResponse.json(
      {
        ok: false,
        message: 'Internal Server Error',
      },
      { status: 200 }
    );
  }
};
