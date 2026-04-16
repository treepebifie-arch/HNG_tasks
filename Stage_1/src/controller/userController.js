const User = require('../models/userModels');
const axios = require('axios');
const { v7: uuidv7 } = require('uuid');

const createUSer = async (req, res) => {
    const { name } = req.body;

    try {
        const id = uuidv7();
        if (!name) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing or empty name parameter'
            });
        }

        if (typeof name !== 'string' || !isNaN(name)) {
            return res.status(422).json({
                status: 'error',
                message: 'Name is not a string'
            });
        }

        // genderize API call
        const genderResponse = await axios.get(`https://api.genderize.io/?name=${encodeURIComponent(name)}`);
        const { gender, probability, count } = genderResponse.data;

       

        // Edge case handling
        if (!gender || gender === '' || count === 0) {
            const externalApi = "Genderize API";
            return res.status(502).json({
                status: 'error',
                message: `${externalApi} returned an invalid response`,
            });
        }


        // Agify API call
        const ageResponse = await axios.get(`https://api.agify.io/?name=${encodeURIComponent(name)}`);
        const { age } = ageResponse.data;

        let age_group = "senior";
        if (age >= 0 && age <= 12) {
            age_group = "child";
        } else if (age > 12 && age <= 19) {
            age_group = "teenager";
        } else if (age > 19 && age <= 59) {
            age_group = "adult";
        }


        // Agify Edge Case Handling 
        if (age === undefined || age === null) {
            const externalApi = "Agify API";
            return res.status(502).json({
                status: 'error',
                message: `${externalApi} returned an invalid response`,
            });
        }

        // Nationalize API call
        const countryResponse = await axios.get(`https://api.nationalize.io/?name=${encodeURIComponent(name)}`);
        const { country } = countryResponse.data;


        // Nationalize Edge Case Handling
        if (!country || country.length === 0) {
            const externalApi = "Nationalize API";
            return res.status(502).json({
                status: 'error',
                message: `${externalApi} returned an invalid response`,
            });
        }
        const getTopCountry = country.reduce((prev, current) => {
            return (prev.probability > current.probability) ? prev : current;
        });

        console.log(getTopCountry);

        const existingUser = await User.findOne({ name: name });

        if (existingUser) {
            return res.status(200).json({
                status: 'success',
                message: 'Profile already exists',
                data: existingUser
            })
        }

        // Save to Database

        const newUser = new User({
            _id: id,
            name: name,
            gender: gender,
            gender_probability: probability,
            sample_size: count,
            age: age,
            age_group: age_group,
            country_id: getTopCountry.country_id,
            country_probability: getTopCountry.probability
        })

        await newUser.save();

        return res.status(201).json({
            status: 'success',
            data: newUser
        });

    } catch (error) {

        console.error('Controller Error:', error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        console.error('Controller Error:', error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

const getAllUsers = async (req, res) => {
    const { gender, age_group, country_id } = req.query;
    try {
        let filter = {};
        if (gender) {
            filter.gender = gender.toLowerCase();
        }
        if (age_group) {
            filter.age_group = age_group.toLowerCase();
        }
        if (country_id) {
            filter.country_id = country_id.toLowerCase();
        }

        const users = await User.find(filter);

        const count = users.length;

        return res.status(200).json({
            status: 'success',
            count: count,
            data: users
        });
    } catch (error) {
        console.error('Controller Error:', error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }

}

const deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        return res.status(204).json({
            status: 'success',
            message: 'No content'
        })

    } catch (error) {
        console.error ('controller error', error.message)
        return res.status(500).json({
            status: "error",
            message: "server error"
        })
        
    }
}

module.exports = {
    createUSer,
    getUserById,
    getAllUsers,
    deleteUser
}