"use client";
import React, { forwardRef } from "react";
import "./PaymentReceipt.styles.css";

const MembershipReceipt = forwardRef(({ members, refMember }, ref) => {
   const renderReceipts = () => {
     return members.map((member, index) => (
       <div key={index}>
         <Receipt member={member} />
       </div>
     ));
   };
  const Receipt = ({ member }) => {
    // console.log(member);
    return (
      <div className="receipt">
        <div>محافظة القاهرة</div>
        <div>وزارة الشباب والرياضة</div>
        <div>مركز التنمية الشبابية بالجزيرة</div>
        <div className="flex justify-content-center">
          <div>
            اذن دفع رقم {String(member?.safe_no) + String(member?.serial_no)}
          </div>
        </div>
        <div className="flex justify-content-center">
          <div>رقم العضوية / {member?.member_code}</div>
        </div>

        {member && (
          <div>
            <div style={{ float: "left" }}>عضوية {member.member_type}</div>
            <div>الاسم / {member.name}</div>
          </div>
        )}
        {/* {refMember && (
          <div>
            <div style={{ float: "left" }}>عضوية {refMember.member_type}</div>
            <div>الاسم / {refMember.name}</div>
          </div>
        )} */}
        <br />
        <table>
          <thead>
            <tr>
              <td> </td>
              <td>عضوية اول مرة</td>
              <td>رسم التحاق</td>
              <td>تجديد</td>
              {/* <td>بطاقة عضوية</td> */}
              <td>سنوات سابقة</td>
              <td>غرامة تأخير</td>
              <td>قسط.ق.م</td>
              <td>فرق اشتراك</td>
              <td>اضافة تابع</td>
              <td>فصل/نقل عضوية</td>
              <td>رسم صيانة وانشاء</td>
              <td>قيمة مضافة</td>
              <td>رسم إشتراك السباحة</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>القيمة</td>
              <td>{member?.first_time_fee}</td>
              <td>{member?.join_fee}</td>
              <td>{member?.renew_fee}</td>
              {/* <td>{member?.member_card_fee}</td> */}
              <td>{member?.prev_years_fee}</td>
              <td>{member?.delay_penalty}</td>
              <td>{member?.installment}</td>
              <td>0</td>
              <td>{member?.new_ref_fees}</td>
              <td>{member?.seperate_fees}</td>
              <td>{member?.maintenance_fee}</td>
              <td>{member?.value_added_tax}</td>

              <td>{member?.swimming}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="flex justify-between">
          <div>
            إجمالي قبل القيمة المضافة{"  "}
            {member?.total_amount - member?.value_added_tax}
          </div>

          <div>
            ضريبة قيمة مضافة {"  "}
            {member?.value_added_tax}
          </div>
          <div>توقيع مسئول العضوية {"________"}</div>
        </div>
        <div className="flex justify-between">
          <div>الإجمالي العام {member?.total_amount}</div>
          <div>توقيع المراجع {"________"}</div>
        </div>
        <div>
          تاريخ الإيصال{" "}
          {new Date(member?.member_order_date).toLocaleDateString()}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "none" }}>
      {members && members.length > 0 && (
        <div className="page" ref={ref} dir="rtl">
          {renderReceipts()}
        </div>
      )}
    </div>
  );

});

export default MembershipReceipt;
