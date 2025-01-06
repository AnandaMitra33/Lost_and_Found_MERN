const Claimant = require("../models/ClaimantSchema");

const fetchClaimants = async (req, res) => {
    try {
        const claimant = await Claimant.find();
        res.json({ gotClaimant: claimant });
    } catch (error) {
        console.error("Error during fetchClaimants:", error);
        res.status(500).send("Internal Server Error");
    }
}

const fetchClaimant = async (req, res) => {
    try {
        const claimantId = req.params.id;
        const claimant = await Claimant.findById(claimantId);
        res.json({ gotClaimant: claimant });
    } catch (error) {
        console.error("Error during fetchClaimant:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createClaimant = async (req, res) => {
    try {
        // get the send-in data off request body
        const claimantname = req.body.claimantname;
        const mobilenumber = req.body.mobilenumber;
        const address = req.body.address;
        const proofofclaim = req.body.proofofclaim;
        const itemdetails = req.body.itemdetails;


        // create an claimant with id
        const createdClaimant = await Claimant.create({
            claimantname: claimantname,
            mobilenumber: mobilenumber,
            address: address,
            proofofclaim: proofofclaim,
            itemdetails: itemdetails
        });

        // respond with the new note
        res.json({ createdClaimant: createdClaimant });
    } catch (error) {
        // Handle errors here
        console.error("Error during createClaimant:", error);
        res.status(500).send("Internal Server Error");
    }
}

const updateClaimant = async (req, res) => {
    try {
        // get the id off the url
        const claimantId = req.params.id;

        // get the data off the req body
        const claimantname = req.body.claimantname;
        const mobilenumber = req.body.mobilenumber;
        const address = req.body.address;
        const proofofclaim = req.body.proofofclaim;
        const itemdetails = req.body.itemdetails;


        // find and update the record
        const deprecatedClaimant = await Claimant.findByIdAndUpdate(claimantId, {
            claimantname: claimantname,
            mobilenumber: mobilenumber,
            claimantaddress: address,
            proofofclaim: proofofclaim,
            itemdetails: itemdetails


        })

        const updatedClaimant = await Claimant.findById(claimantId);

        // respond with both the old and the updated claimant details
        res.json({
            deprecatedClaimant: deprecatedClaimant,
            updatedClaimant: updatedClaimant
        });
    } catch (error) {
        // Handle errors here
        console.error("Error during updateClaimant:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteClaimant = async (req, res) => {
    try {
        // get id off url
        const claimantId = req.params.id;

        // delete the record
        await Claimant.deleteOne({ _id: claimantId })

        // respond with the deleted claimant
        res.json({ success: "Claimant Deleted" });
    } catch (error) {
        // Handle errors here
        console.error("Error during deleteClaimant:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteMultipleClaimants = async (req, res) => {
    try {
        // get the array of claimant ids to be deleted from the request body
        const claimantIds = req.body.claimantIds;

        // if no claimant ids are given, return error
        if (!claimantIds || !Array.isArray(claimantIds) || claimantIds.length === 0) {
        return res.status(400).json({ message: 'No valid claimant IDs provided.' });
         }

        // Delete all claimants in the array
        const deleteResult = await Claimant.deleteMany({ _id: { $in: claimantIds } })

        // Check if the deletion was successful.
         if (deleteResult.deletedCount > 0) {
              res.json({ success: `Successfully deleted ${deleteResult.deletedCount} claimants` });
           } else {
              res.status(404).json({ message: 'No claimants found with the provided IDs.' });
         }


    } catch (error) {
        console.error("Error during deleteMultipleClaimants:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    fetchClaimant: fetchClaimant,
    fetchClaimants: fetchClaimants,
    createClaimant: createClaimant,
    updateClaimant: updateClaimant,
    deleteClaimant: deleteClaimant,
    deleteMultipleClaimants: deleteMultipleClaimants // export the new controller
}
