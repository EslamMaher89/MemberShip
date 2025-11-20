import axios from "axios";

export async function getMemberDetails(MEMBER_ID) {
  try {
    const response = await axios.get(`http://localhost:3001/api/getClientAccount/${MEMBER_ID}`);
    return response.data.rows;
  } catch (error) {
    console.error("Error fetching payment terms data:", error);
    // toast.current.show({
    //   severity: "error",
    //   summary: "خطأ",
    //   detail: error.response.data.error,
    //   life: 3000,
    // });
  }
}

export async function generateClientCheques(MEMBER_ID,data) {
  try {
    const response = await axios.post(`http://localhost:3001/api/GenerateCheques/${MEMBER_ID}`,data);
    console.log(response)
    return response.data.insertedData;
  } catch (error) {
    console.error("Error sending cheque data:", error);
    // toast.current.show({
    //   severity: "error",
    //   summary: "خطأ",
    //   detail: error.response.data.error,
    //   life: 3000,
    // });
  }
}

export async function getMemberCheques(MEMBER_ID) {
  try {
    const response = await axios.get(`http://localhost:3001/api/GetSpecificCheques/${MEMBER_ID}`);
    return response.data.cheque;
  } catch (error) {
    console.error("Error fetching payment terms data:", error);
    // toast.current.show({
    //   severity: "error",
    //   summary: "خطأ",
    //   detail: error.response.data.error,
    //   life: 3000,
    // });
  }
}
