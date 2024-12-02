const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 3000;
app.use(cors())
app.use(bodyParser.json());

// Making a connection with MongoDb
mongoose.connect('mongodb+srv://bilalzip:7618210921@bilalfirst.unne0yf.mongodb.net/bilalfirst?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));


  const reservationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    guests: Number,
  });
  
  const Reservation = mongoose.model('Reservation', reservationSchema);

  const contactFormSchema = new mongoose.Schema({
    name: String,
    phone: String,
    meal: String,
    feedback: String,
  });
  
  const ContactForm = mongoose.model('ContactForm', contactFormSchema);


app.post('/reservation-form', async (req, res) => {
    const { name, email, phone, date, time, guests } = req.body;

    try {
        if (!name || !email || !phone || !date || !time || !guests) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required!' 
            });
        }
            const newReservation = new Reservation({
                name,
                email,
                phone,
                date,
                time,
                guests,
              });
             const saved = await newReservation.save();

             console.log("saved", saved)
      
        res.status(200).json({ 
            success: true, 
            message: 'Reservation received successfully!',
            data: { name, email, phone, date, time, guests } 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "An errror occured"
        });
    }
   
});


app.post('/contact-form', async (req, res) => {
    const { name, phone, meal, feedback } = req.body;
      const newContactForm = new ContactForm({
        name,
        phone,
        meal,
        feedback,
      });
  
      const savedContactForm = await newContactForm.save();
      console.log('Contact form saved:', savedContactForm);
  
      res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully!',
        data: savedContactForm,
      });

      res.status(500).json({
        success: false,
        message: 'An error occurred while submitting contact form.',
        error: error.message,
      });
  });
app.listen(PORT, (error) => {
    if (error) {
        console.log('Error starting server:', error);
    } else {
        console.log(`Server running on http://localhost:${PORT}`);
    }
});


