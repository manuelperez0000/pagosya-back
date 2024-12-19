const success = ({ res, message = 'success', body }) => {
    res.status(200).json({
        body,
        message,
        status: 200
    })
}

const error = ({ res, message="Error desconocido", body={}, status = 500 }) => {
    res.status(status).json({
        body,
        message,
        status
    })
}

export default { success, error }