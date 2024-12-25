// pages/api/auth/update-session.ts
import { getServerSession } from "next-auth/server";
import { authOptions } from "@/src/app/api/auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { user } = req.body; // Dữ liệu người dùng mới (ví dụ: từ body)

  // Cập nhật session user
  const updatedUser = {
    ...session.user,
    name: user.name,
    email: user.email,
    picture: user.picture,
  };

  // Optionally update in database or session store
  // Your DB logic here...

  // Trả session mới
  return res.status(200).json({ user: updatedUser });
}
