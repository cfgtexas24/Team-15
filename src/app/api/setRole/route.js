import { authAdmin } from "../../lib/firebaseAdmin";

export async function POST(request) {
  try {
    const { uid, role } = await request.json();

    // Assign a custom claim (role) to the user
    await authAdmin.setCustomUserClaims(uid, { role });

    return new Response(JSON.stringify({ message: "Role set successfully!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error setting role:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
