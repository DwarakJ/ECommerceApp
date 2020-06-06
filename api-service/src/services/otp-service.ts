import axios from 'axios';

export class OTPService {
  sendOTP(phone: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://2factor.in/API/V1/309718da-a258-11ea-9fa5-0200cd936042/SMS/${phone}/AUTOGEN`,
        )
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
  }

  verifyOTP(otp: string, sessionid: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://2factor.in/API/V1/309718da-a258-11ea-9fa5-0200cd936042/SMS/VERIFY/${sessionid}/${otp}`,
        )
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          console.log(err);
          reject(err);
        });
    });
  }
}
