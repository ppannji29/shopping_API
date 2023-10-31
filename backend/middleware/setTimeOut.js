const timeoutDuration = 5000;

export const RequestTimeout = (req, res, next) => {
    // Set a timeout to respond with an error if the request takes too long
    const timeout = setTimeout(() => {
        res.status(504).json({ error: 'Request timed out' });
    }, timeoutDuration);

    // Create a function to clear the timeout
    const clearRequestTimeout = () => {
        clearTimeout(timeout);
    };
    // Attach the clearRequestTimeout function to the response object
    res.clearRequestTimeout = clearRequestTimeout;
    // Continue processing the request
    next();
}