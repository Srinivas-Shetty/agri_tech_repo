const pesticides = require("../schemas/pesticides");

module.exports = {
    addPesticideService: async (data) => {
        try {
            await pesticides.create(data);
            return "Pesticide added success";
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getPesticideService: async () => {
        try {
            const pesticideData = await pesticides.find().select('_id name priceByQuantity mainImage discount');
            return pesticideData;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getPesticideByIdService: async (_id) => {
        try {
            const pesticideData=await pesticides.findById({_id});
            return pesticideData;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


