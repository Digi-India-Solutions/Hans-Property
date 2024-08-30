const Location = require('../models/location.model');

// Create a new location
exports.createLocation = async (req, res) => {
    try {
        console.log(req.body);
        const { state, locality } = req.body;

        if (!state || !locality) {
            return res.status(403).json({
                success: false,
                message: "Please Provide All Fields !!"
            });
        }

        const existingState = await Location.findOne({ state: state });

        if (existingState) {
            // Add new localities to the existing state's locality array
            existingState.locality = [...new Set([...existingState.locality, ...locality])];

            await existingState.save();
            return res.status(200).json({
                success: true,
                data: existingState,
                message: "Location Updated Successfully !!"
            });
        }

        const newLocation = new Location({
            state, locality
        });

        await newLocation.save();

        res.status(200).json({
            success: true,
            data: newLocation,
            message: "Location Created Successfully !!"
        });
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get All Location 
exports.getAllLocation = async (req, res) => {
    try {
        const getAllLocation = await Location.find();
        if (getAllLocation.length === 0) {
            return res.status(403).json({
                success: false,
                msg: "Location Not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: getAllLocation,
            msg: "All Locations Found"
        })

    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

// Get locations based on state and locality
exports.getLocations = async (req, res) => {
    try {
        const { state, locality } = req.query;
        const filter = {};

        if (state) filter.state = state;
        if (locality) filter.locality = { $in: [locality] };

        const locations = await Location.find(filter);
        res.status(200).json({
            success: true,
            data: locations,
            message: "Locations Found"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update location details
exports.updateLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        const updates = req.body;

        // Check if there are no fields to update
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                msg: "No fields to update."
            });
        }
        const options = { new: true }; // Return the modified document

        const updatedLocation = await Location.findByIdAndUpdate(locationId, updates, options);
        if (!updatedLocation) {
            return res.status(404).json({
                success: false,
                msg: "Location not found."
            });
        }

        res.status(200).json({
            success: true,
            msg: "Location updated successfully.",
            data: updatedLocation
        });

    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete a location
exports.deleteLocation = async (req, res) => {
    try {
        const id = req.params.id;
        const checkLocation = await Location.deleteOne({ _id: id })
        if (!checkLocation) {
            return res.status(403).json({
                success: false,
                msg: "Location Not Found"
            })
        }
        res.status(200).json({
            success: true,
            msg: "Location Deleted Succesfully !!"
        })
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
