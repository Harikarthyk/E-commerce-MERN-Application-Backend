//Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

//Import Custom Routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

//Middleware :
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

//DB Connection
mongoose
	.connect(
		`mongodb+srv://hari:harikanna@cluster0.zz0jd.mongodb.net/clothing?retryWrites=true&w=majority
    `,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		},
	)
	.then(() => console.log(`DB Connection Enabled`))
	.catch(() => console.log(`Error in DB Connection`));

app.get('/', (req, res) => {
	res.send('It is Working Successfully ... ');
});

// Custom Routes
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

//Port :
const PORT = process.env.PORT || 5050;

//Server runs in PORT
app.listen(PORT, () => {
	console.log(`Server is Running at PORT ${PORT}`);
});
