const nodemailer = require('nodemailer');
let mailTransporter =
  nodemailer.createTransport(
    {
      service: "gmail",
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    }
  );
async function sendEmail(name, phone, transactionId, transactionTime, tour, price, detail, note, date) {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <title>Hóa đơn thanh toán Tour du lịch</title>
  <style>
  th{
    width:10rem;
  }
  </style>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #F6F6F6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; padding: 20px;position:relative;">
    <div style="text-align: center; color: #333333;">
    <h1 style="font-size: 20px; margin: 0;">Cộng hòa xã hội chủ nghĩa Việt Nam</h1>
    <p style="font-size: 18px; margin: 0;">Độc lập - Tự do - Hạnh phúc</p>
    <img src="https://i.imgur.com/Q6b0Z7u.png" alt="Logo" style="width: 100px;margin-top:1rem;">
    </div>
    <div style="text-align: center; margin-top: 20px;">
    <h2 style="font-size: 25px; color: #333333; margin: 0;">Hóa đơn thanh toán Tour du lịch</h2>
    <div style="text-align: center; color: #333333;">
    <p style="font-size: 20px; margin: 0;margin-top:1rem;">Mã giao dịch: ${transactionId}</p>
    </div>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Tên người mua</th>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${name}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">SĐT người mua</th>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${phone}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Đơn vị phân phối</th>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Công ty du lịch hoàng hà</td>
        </tr>
        <tr>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Thời gian giao dịch</th>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${transactionTime}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Tên tour</th>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${tour}</td>
        </tr>
        <tr>
          <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Đơn giá</th>
          <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${price} VNĐ</td>
        </tr>
        <tr>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Chi tiết</th>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${detail}</td>
      </tr>
      <tr>
      <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Ngày khởi hành</th>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${date}</td>
    </tr>
      <tr>
      <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; background-color: #f2f2f2;">Ghi chú</th>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${note}</td>
    </tr>
      </table>
      <div>
      Vui lòng giữ lại hóa đơn để đối chiếu.
      </div>
      <div style='height:3rem;'></div>
      <img src="https://i.imgur.com/dG8u4Sz.png" alt="Logo" style="width: 20%;position:absolute;right:2.3rem;bottom:3.5rem;transform: rotate(30deg);">
      <img src="https://i.imgur.com/1pkFbKV.png" alt="Logo" style="width: 35%;position:absolute;right:0;bottom:0;transform: rotate(-10deg);">
    </div>
  </div>
</body>
</html>
`
  let mailDetails = {
    from: 'hoanghadulich@gmail.com',
    to: 'wibu1892001@gmail.com',
    subject: 'Hóa đơn thanh toán tour du lịch',
    html: htmlTemplate
  };
  mailTransporter
    .sendMail(mailDetails,
      function (err, data) {
        if (err) {
          console.log('Error Occurs');
          console.log(err);
        } else {
          console.log('Email sent successfully');
        }
      });
}
module.exports = sendEmail;