const notFound = (_, res) => {
    const body = { message: 'Not found' }
    res.status(404).json(body);
}

export default notFound;