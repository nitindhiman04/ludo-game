const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const store = new MongoStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

store.on('error', (error) => {
    console.error('❌ Session store error:', error);
});

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'mySecret',
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false // Set to true if using HTTPS
    }
});

module.exports = { sessionMiddleware };
