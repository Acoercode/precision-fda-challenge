export const POST = async (req, res) => {
  try {
    // Check if the request body exists
    const formData = await req.formData();

    // Extract the file from FormData
    const file = formData.get("data"); // 'data' matches the key in the client

    // Prepare FormData to send to the external API
    const externalFormData = new FormData();
    externalFormData.append("data", file);
    // Make a call to your external API
    const response = await fetch("http://localhost:8000/events/record-event", {
      method: "POST",
      body: externalFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`External API Error: ${response.status} ${errorText}`);
      throw new Error(`External API Error: ${response.statusText}`);
    }

    const responseData = await response.json();
    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    console.error("Internal API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
    });
  }
};
