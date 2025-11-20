import axios from "axios";

export default async (data, utils) => {
  const { setLoading, toast, toggle, setSave, handleReload, router } = utils;
  let new_id = 0;

  setLoading(true);
    try {
    console.log(data);
    let res = await axios.post("http://localhost:3001/api/addClientInstallment", data);
    toast.current.show({
        severity: "success",
        summary: "تم إضافة ملف عضو التقسيط بنجاح",
        detail: res.data.message,
        life: 3000,
      });
    console.log("submitted",res);

    new_id = res.data.account_id;
    setSave(false);
  } catch (error) {
    console.error("Error submitting form data:", error);
    toast.current.show({
        severity: "error",
        summary: "خطأ",
        detail: error.response
        .data.error,
        life: 3000,
      });
      setSave(false);
  }
  toggle();
  router.push(`/club/installments_member/${new_id}`);
  handleReload();

  setLoading(false);
};
