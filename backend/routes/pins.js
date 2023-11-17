const router =  require("express").Router();
const Pin = require("../models/Pin");
const verifyToken = require('./authMiddleware');

router.use(verifyToken);

router.post("/",async (req,res)=>{
    // const newPin = new Pin(req.body);
    const newPin = new Pin({
        ...req.body,
        userId: req.user._id, // Add the user ID to the pin
    });
    try{
        // newPin.save() is an async function hence it is gonna take time to execute
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/",async (req,res)=>{
    try{
        const pins = await Pin.find();
        res.status(200).json(pins);
    }catch(err){
        res.status(500).json(err);
    }
});

// PUT: Update a pin by ID
router.put('/:id', async (req, res) => {
    try {
      const pin = await Pin.findById(req.params.id);
  
      if (!pin) {
        return res.status(404).json({ message: 'Pin not found' });
      }
  
      // Check if the user updating the pin is the same user who created it
      if (pin.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You do not have permission to update this pin' });
      }
  
      const updatedPin = await Pin.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      res.status(200).json(updatedPin);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
// DELETE: Delete a pin by ID
router.delete('/:id', async (req, res) => {
try {
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
    return res.status(404).json({ message: 'Pin not found' });
    }

    // Check if the user deleting the pin is the same user who created it
    if (pin.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You do not have permission to delete this pin' });
    }

    await Pin.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pin deleted successfully' });
} catch (err) {
    res.status(500).json(err);
}
});
  
module.exports = router