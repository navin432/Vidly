// POST /api/returns {customerId, movieID}

// return 401 if client is not logged in
// return 400 if customerId is not provided
// return 400 if movieId is not provided
// return 404 if no rental founf for this customer/movie
// return 400 if the rental already processed
// return 200 if valid request
// set the return date
// calculate the rental fee (numberofDays * movie.dailyRentalRate)
// Increase the stock
// Return the rental
