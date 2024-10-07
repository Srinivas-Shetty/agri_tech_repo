const OTPStore = require("../schemas/otpStore");
const User = require("../schemas/users");
const bcrypt = require('bcrypt');


module.exports = {
    storeOtpService: async (mobileNumber, generatedOtp) => {
        try {
            const storeOtpInDb = await OTPStore.create({ mobileNumber, otpCode: generatedOtp });
            console.log(storeOtpInDb, "storeOtpInDb");

            return storeOtpInDb
        } catch (error) {
            console.log(error, "ss");
            throw new Error(error.message)
        }
    },
    loginService: async (mobileNumber, userOtp) => {
        try {
            const getOtp = await OTPStore.findOne({ mobileNumber });
            const checkOtp = await bcrypt.compare(userOtp, getOtp.otpCode);

            if (!checkOtp) {
                throw new Error("Invalid otp");
            }

            const checkUserPresent = await User.findOne({ mobileNumber });
            if (!checkUserPresent) {
                let data = {
                    name: "Guest",
                    mobileNumber: mobileNumber,
                    role: "farmer"
                }
                const userCreated = await User.create(data);
                return userCreated
            }
            else{
                return checkUserPresent
            }



        } catch (error) {
            throw new Error(error.message)
        }
    }
}