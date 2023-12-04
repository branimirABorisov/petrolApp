function mapErros (err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => e.message).join('\n');
    } else if (typeof err.message == 'string') {
        return err.message
    } else {
        return 'Request error!'
    }
}


module.exports = mapErros;