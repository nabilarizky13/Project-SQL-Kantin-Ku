const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('assets')); // Serve static files from 'assets' directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
app.use(session({
    secret: 'kantinku_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to pass session data to views
app.use((req, res, next) => {
    res.locals.user_id = req.session.user_id;
    res.locals.role = req.session.role;
    res.locals.nama = req.session.nama;
    next();
});

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);

// Helper function equivalent to PHP base_url (can be used in EJS if needed)
app.locals.base_url = (pathPath = '') => {
    return `/${pathPath.replace(/^\//, '')}`;
};

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
