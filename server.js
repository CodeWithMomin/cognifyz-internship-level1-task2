const express=require('express');
const cors=require('cors')
const session=require('express-session')
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(express.static('public'));
app.set('view engine','ejs')
app.use(express.json());

// Set up session middleware
app.use(session({
    secret: 'liase2y4iy282hhahkagayujhakisggcgu2234.93896agjjga', // Replace with a strong secret key
    resave: false,           // Don't save session if unmodified
    saveUninitialized: true  // Save uninitialized session
}));
app.post('/submit', (req, res) => {
    const { name: username, email, password, subscribe } = req.body;

    
    if (!username || username.length < 3) { 
        return res.status(400).send('Username must be at least 3 characters long.');
    }

    if (!email || !email.includes('@')) {  
        return res.status(400).send('Please enter a valid email address.');
    }

    if (!password || password.length < 6) {  
        return res.status(400).send('Password must be at least 6 characters long.');
    }

    // Log received data
    console.log('Received data:', { username, email, password, subscribe });
    const userData = {
        name:username,
        email,
        password,
        subscribe: subscribe === 'newsletter'
    };

    // Temporary server-side storage (in memory)
    req.session.userData = userData;
    console.log("retrived data",req.session.userData);
    
  //  Send a success response back to the client
    res.status(200).json({ message: 'Registration successful! and Your Data Has been Stored' });
});

app.listen(5000,()=>{
    console.log("server is running on http://127.0.0.1:5000");
    
})