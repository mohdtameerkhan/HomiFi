
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  // 1. Verify the user
  const { userId } = await auth.protect();

  // 2. Read the frontend request
  const body: unknown = await request.json();

  // 3. Validate the propertyId
  if (
    typeof body !== "object" ||
    body === null ||
    !("propertyId" in body) ||
    typeof body.propertyId !== "string" ||
    !body.propertyId.trim()
  ) {
    return Response.json(
      { message: "Valid propertyId is required" },
      { status: 400 }
    );
  }

  // 4. Prepare the response
  return Response.json({
    message: "Save request received successfully",
    userId,
    propertyId: body.propertyId.trim(),
  });
}
