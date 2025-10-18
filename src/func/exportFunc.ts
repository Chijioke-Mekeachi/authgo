const addCredential = async (id, social, username, password) => {
  try {
    const response = await fetch("http://localhost:2000/cred/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, social, username, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Failed to add credential");

    console.log("✅ Credential added:", data);
    return data;
  } catch (error) {
    console.error("❌ Error adding credential:", error);
  }
};
export { addCredential };