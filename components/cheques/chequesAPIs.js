import axios from "axios";

export async function getPaymentsTerms() {
//   const { setLoading, toast, toggle, handleReload, router } = utils;
//   setLoading(true);

  try {
    const response = await axios.get("http://localhost:3001/api/Transs")
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

export async function getAllChequesByOptions(TRANS_ID="",BANK_ID="",DATE="") {
    
  try {
    console.log(TRANS_ID,BANK_ID,DATE)
    const response = await axios.get(`http://localhost:3001/api/filterCheques?trans_id=${TRANS_ID}&date=${DATE}&club_bank=${BANK_ID}`)
    console.log(response.data.rows)
    return response.data.rows;
  } catch (error) {
    console.error("Error fetching cheques:", error);
    // toast.current.show({
    //   severity: "error",
    //   summary: "خطأ",
    //   detail: error.response.data.error,
    //   life: 3000,
    // });
  }
}

export async function updateCheques(TRANS_ID, data,toast,BANK_ID){
  let body = {
    trans_id: TRANS_ID,
    ids: data,
    club_bank: BANK_ID
  }
  try{
    const response = await axios.put("http://localhost:3001/api/cheques",body);
    toast.current.show({
      severity: "success",
      summary: "تم",
      detail: response.data.message,
      life: 3000,
    });
    return response.data.updatedCheques;
  } catch (error) {
    console.error("Error fetching cheques:", error);
    toast.current.show({
      severity: "error",
      summary: "خطأ",
      detail: error.response.data.error,
      life: 3000,
    });
  }
}

