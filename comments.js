// Create web serverconst express = require('express');
const app = express();
const port = 3000;

// Use the public directory to serve static files
app.use(express.static('public'));

// Use the comments.js file to handle comments
app.use('/comments', require('./comments.js'));

// Start the server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));

// Path: comments.js
// Create a new router
const express = require('express');
const router = express.Router();

// Handle the GET request
router.get('/', (req, res) => {
    res.json({ comments: [{ username: 'Alice', comment: 'I love your website!' }] });
});

// Handle the POST request
router.post('/', (req, res) => {
    res.json({ message: 'Comment added' });
});

// Export the router
module.exports = router;