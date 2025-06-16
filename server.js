const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Melayani file statis dari folder 'public'
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
