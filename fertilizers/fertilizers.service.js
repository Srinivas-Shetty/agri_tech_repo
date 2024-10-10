const fertilizers = require("../schemas/fertilizers");

module.exports = {
    addFertilizerService: async (data) => {
        try {
            await fertilizers.create(data);
            return "Fertilizer added success";
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getFertilizersService: async () => {
        try {
            const fertilizerData = await fertilizers.find().select('_id name price mainImage discount quantityPerUnit');
            return fertilizerData;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getFertilizerByIdService: async (_id) => {
        try {
            const FetilizerData=await fertilizers.findById({_id});
            return FetilizerData;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}


