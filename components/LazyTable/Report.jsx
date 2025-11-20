"use client";
import React, { useRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import "./Report.styles.css";
import { getReportData } from "./report.js";
import { Button } from "primereact/button";
import { getRefMember } from "@components/Members/member";

const columnSum = (data, column) => {
  return parseFloat(
    data
      ?.filter((el) => {
        return el.canceled == 0;
      })
      .reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue[column]);
      }, 0)
      .toFixed(2)
  );
};

const Report = ({ member, lazyState, orderBy, include, filter }) => {
  const [data, setData] = useState();
  const membership = member?.membership[0];
  const handleGetReportData = async () => {
    const data2Report = await getReportData(
      lazyState,
      orderBy,
      include,
      filter
    );
    setData(data2Report);
    let currentSavedDate = localStorage.getItem("filterDate");
  };
  useEffect(() => {
    (async () => {
      await handleGetReportData();
    })();
  }, []);
  const pageRef = useRef();
  const Receipt = () => {
    let first_time_fee_total = 0;
    let new_fee_total = 0;
    let card_total = 0;
    let manual_card_total = 0;
    let ref_fee_total = 0;
    let ref_fee_vat_total = 0;
    let seperate_fees_total = 0;
    let maintenance_fee_total = 0;
    let total_1_toal = 0;
    let vat_total = 0;
    let total_2total = 0;

    let total_before_vat_calc = (data) => {
      let sum =
        columnSum(data, "first_time_fee") +
        columnSum(data, "join_fee") +
        columnSum(data, "renew_fee") +
        columnSum(data, "prev_years_fee") +
        columnSum(data, "delay_penalty") +
        columnSum(data, "installment") +
        ((columnSum(data, "new_ref_fees") - new_fee_total) * 100) / 114 +
        columnSum(data, "seperate_fees") +
        columnSum(data, "maintenance_fee") +
        columnSum(data, "membership_card_fee") /*manual_card_total*/ +
        (columnSum(data, "swimming") * 100) / 114;
      //  + ((columnSum(data, "swimming") - (columnSum(data, "swimming") * 100) / 114 ))

      return sum;
    };

    return (
      <table>
        <thead>
          <tr>
            <th>رقم العضوية</th>
            <th>الاسم</th>
            <th>تجديد</th>
            <th>سنوات سابقة</th>
            <th>غرامة تأخير</th>
            <th>قسط.ق.م</th>
            <th>فرق اشتراك</th>
            <th>اضافة تابع</th>
            <th>عضوية اول مرة</th>
            <th>فصل/نقل عضوية</th>
            <th>رسم صيانة وانشاء</th>
            <th>بطاقة عضوية</th>
            <th>رسم التحاق</th>
            <th>رسم إشتراك السباحة</th>
            <th>إجمالي ق-ق</th>

            <th>ضريبة السباحة</th>
            {/* <th>ضريبة إضافة تابع</th> */}
            <th>قيمة مضافة</th>
            <th>الإجمالي</th>
            <th>إذن دفع رقم</th>
            <th>تاريخ الإذن</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((el, index) => {
            let card_fee_calc = (el) => {
              if (el.new_ref_fees > 0 && el.canceled === 0) {
                card_total += 5;
                // manual_card_total += 5;
                return 5;
              } else {
                return el.membership_card_fee;
              }
            };

            let seperate_fee_calc = (el) => {
              if (el.seperate_fees > 0 && el.canceled === 0) {
                el.seperate_fees = 100;
                el.maintenance_fee = 50;
                el.membership_card_fee = 5;
                el.value_added_tax = (
                  (el.maintenance_fee + el.membership_card_fee) *
                  0.14
                ).toFixed(2);
                el.total_amount = 162.7;
                seperate_fees_total += 100;
                maintenance_fee_total += 50;
                vat_total += el.value_added_tax;
                total_1_toal +=
                  el.seperate_fees +
                  el.maintenance_fee +
                  el.membership_card_fee;
                total_2total +=
                  el.seperate_fees +
                  el.maintenance_fee +
                  el.membership_card_fee +
                  el.value_added_tax;
                return 100;
              } else {
                return 0;
              }
            };

            let first_time_fee_calc = (el) => {
              if (el.first_time_fee > 0 && el.canceled === 0) {
                el.first_time_fee = 100;
                el.maintenance_fee = 50;
                el.membership_card_fee = 5;
                el.value_added_tax = (
                  (el.maintenance_fee + el.membership_card_fee) *
                  0.14
                ).toFixed(2);
                el.total_amount = 162.7;

                first_time_fee_total += 100;
                card_total += 5;
                maintenance_fee_total += 50;
                vat_total += el.value_added_tax;
                total_1_toal +=
                  el.first_time_fee +
                  el.maintenance_fee +
                  el.membership_card_fee;
                total_2total +=
                  el.first_time_fee +
                  el.maintenance_fee +
                  el.membership_card_fee +
                  el.value_added_tax;
                return 100;
              } else {
                return 0;
              }
            };

            let getRefAge = async (ref_member_id) => {
              const refMember = await getRefMember(ref_member_id);
              let refDate = refMember?.birth_date.getFullYear()
              if (refDate) return refDate
            }

            let currentFee = 0;
            let ref_fee_calc = (el) => {
              if (el.new_ref_fees > 0 && el.canceled == 0) {
                console.log(el);
                let date = new Date(el.member?.join_date);
                let year = date.getFullYear();
                if (year < 2017) {
                  ref_fee_total += (el.new_ref_fees * 100) / 114 - 5;
                  ref_fee_vat_total +=
                    el.new_ref_fees - 5 - ((el.new_ref_fees * 100) / 114 - 5);
                  return (el.new_ref_fees * 100) / 114 - 5;
                } else if (year >= 2017) {
                  let refAge = getRefAge(el.ref_member_id);
                  let today = new Date();
                  let age = today.getFullYear() - refAge;
                  console.log(today.getFullYear(), refAge);
                  if (age >= 20) {
                    currentFee = 100;
                    let fees = el.new_ref_fees - currentFee;
                    el.first_time_fee = currentFee;
                    new_fee_total += currentFee;
                    ref_fee_total += (fees * 100) / 114;
                    ref_fee_vat_total +=
                      fees - ((fees * 100) / 114);
                    return (fees * 100) / 114;
                  } else {
                    currentFee = 50;
                    const Vat = 5
                    let fees = Math.floor((el.new_ref_fees) - 5 - currentFee);
                    el.first_time_fee = currentFee;
                    new_fee_total += currentFee;
                    ref_fee_total += ((fees) * 100) / 114;
                    ref_fee_vat_total +=
                      fees - ((fees * 100) / 114);

                    return Math.floor((fees * 100) / 114);
                  }
                }
              } else return 0;
            };

            let ref_fee_vat_calc = (el) => {
              if (el.new_ref_fees > 0) {
                let fees = el.new_ref_fees - 5 - currentFee;
                return fees - ((fees * 100) / 114)

              } else {
                return el.new_ref_fees;
              }
            };

            return (
              <tr key={index}>
                <td>{el.member_code}</td>
                <td style={{ whiteSpace: "nowrap" }}>{el.member?.name}</td>
                <td>{el.renew_fee}</td>
                <td>{el.prev_years_fee}</td>
                <td>{el.delay_penalty}</td>
                <td>{el.installment}</td>
                <td>0</td>
                <td>
                  {/* {el.new_ref_fees > 0
                    ? ((el.new_ref_fees * 100) / 114 - 5).toFixed(2)
                    : el.new_ref_fees} */}
                  {ref_fee_calc(el).toFixed(2)}
                </td>
                <td>{el.first_time_fee}</td>

                <td>{seperate_fee_calc(el)}</td>
                <td>{el.maintenance_fee}</td>
                <td>{card_fee_calc(el)}</td>
                <td>{el.join_fee}</td>
                <td>{((el.swimming * 100) / 114).toFixed(2)}</td>
                <td>
                  {el.new_ref_fees > 0
                    ? ((el.new_ref_fees * 100) / 114).toFixed(2)
                    : el.swimming > 0
                      ? (
                        el.total_amount -
                        el.value_added_tax -
                        (el.swimming - (el.swimming * 100) / 114)
                      ).toFixed(2)
                      : (el.total_amount - el.value_added_tax).toFixed(2)}
                </td>
                <td>{(el.swimming - (el.swimming * 100) / 114).toFixed(2)}</td>
                {/* <td>
                  
                  {ref_fee_vat_calc(el).toFixed(2)}
                </td> */}

                <td>
                  {el.value_added_tax + Number(ref_fee_vat_calc(el).toFixed(2))}
                </td>
                <td>{el.total_amount}</td>
                <td>{String(el.safe_no) + String(el.serial_no)}</td>
                <td>{el.member_order_date.toLocaleDateString()}</td>

                <td>{el.rel_canceled.name}</td>
              </tr>
            );
          })}
          <tr className="sum">
            <td colspan="2">الإجماليات</td>
            <td>{columnSum(data, "renew_fee")}</td>
            <td>{columnSum(data, "prev_years_fee")}</td>
            <td>{columnSum(data, "delay_penalty")}</td>
            <td>{columnSum(data, "installment")}</td>
            <td>0</td>
            {/* <td>{columnSum(data, "new_ref_fees")}</td> */}{" "}
            <td>{ref_fee_total.toFixed(2)}</td>
            <td>{columnSum(data, "first_time_fee")}</td>

            <td>{columnSum(data, "seperate_fees")}</td>
            <td>{columnSum(data, "maintenance_fee")}</td>
            <td>{columnSum(data, "membership_card_fee") + card_total}</td>
            <td>{columnSum(data, "join_fee")}</td>
            <td>{((columnSum(data, "swimming") * 100) / 114).toFixed(2)}</td>
            <td>
              {/* {parseFloat(
                data
                  ?.filter((el) => {
                    return el.canceled == 0;
                  })
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator +
                      Number(currentValue.total_amount) -
                      Number(currentValue.value_added_tax) + card_total
                    );
                  }, 0)
                  .toFixed(2)
              )} */}
              {total_before_vat_calc(data).toFixed(2)}
            </td>
            <td>
              {(
                columnSum(data, "swimming") -
                (columnSum(data, "swimming") * 100) / 114
              ).toFixed(2)}
            </td>
            {/* <td>
              {(
                ref_fee_total -
                (ref_fee_total * 100) / 114
              ).toFixed(2)} 
             {ref_fee_vat_total.toFixed(2)}
            </td> */}
            <td>
              {(columnSum(data, "value_added_tax") + ref_fee_vat_total).toFixed(2)}
            </td>
            <td>
              {
                (total_before_vat_calc(data) +
                  columnSum(data, "value_added_tax") +
                  (columnSum(data, "swimming") -
                    (columnSum(data, "swimming") * 100) / 114) +
                  ref_fee_vat_total).toFixed(2)
                // +
                //  (columnSum(data, "swimming") - (((columnSum(data, "swimming") * 100)) / 114))
                //  + ref_fee_total).toFixed(2)
              }
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  };
  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button label="إستخراج تقرير" icon="pi pi-book" iconPos="right" />
        )}
        content={() => pageRef.current}
      />
      <div style={{ display: "none" }}>
        <div className="page" ref={pageRef} dir="rtl">
          <div className="receipt">
            <div>محافظة القاهرة</div>
            <div>وزارة الشباب والرياضة</div>
            <div>مركز التنمية الشبابية بالجزيرة</div>
            <div className="flex justify-content-center space-x-4">
              <div className="m-2">
                إحصائية خزينة رقم :{" "}
                {localStorage.clubUser &&
                  JSON.parse(localStorage.clubUser).safe_no}
              </div>
              <div className="m-2">
                اسم مسئول الخزينة :{" "}
                {localStorage.clubUser &&
                  JSON.parse(localStorage.clubUser).fullname}
              </div>
              <div className="m-2">{new Date().toLocaleDateString()}</div>
            </div>
            <Receipt />
            <div className="flex justify-between ">
              <div className="m-2">توقيع مسئول خزينة داخلية</div>
              <div className="m-2">توقيع مراجع الخزينة</div>
              <div className="m-2">توقيع رئيس قسم العضوية</div>
            </div>
            { }
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
