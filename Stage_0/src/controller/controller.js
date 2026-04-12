const axios = require('axios');

const getGender = async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Missing or empty name parameter' });
    }

    if (typeof name !== 'string' || !isNaN(name)) {
      return res.status(422).json({
        status: 'error',
        message: 'Name is not a string'
      });
    }

    // genderize API call
    const response = await axios.get(`https://api.genderize.io/?name=${encodeURIComponent(name)}`);
    const { gender, probability, count } = response.data;

    // Edge case handling
    if (!gender || gender === '' || count === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No prediction available for the provided name'
      });
    }
  
    let is_confident = false;
    if (probability >= 0.7 && count >= 100) {
      is_confident = true;
    }

    const result = {
      name,
      gender,
      probability,
      sample_size: count,
      is_confident,
      processed_at: new Date().toISOString(),
    };

    return res.status(200).json({
      status: 'success',
      data: result
    });

  } catch (error) {
    
    console.error('Controller Error:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};

module.exports = { getGender };