"use server"

import axios from "axios";

export async function getInstallmentData(
    table,
    lazyState,
    orderBy,
    include,
    filter,
    columns,
    download
  ){
    const { rows: take, first: skip, filters , page} = lazyState;

    try {
        const response = await axios.get("http://localhost:3001/api/getAllClients");
        return response.data.rows;
      } catch (error) {
        console.error("Error fetching data:", error)
      }
  }
  