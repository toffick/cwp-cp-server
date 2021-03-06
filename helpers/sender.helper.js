/**
 * wrapper for send response
 * @param res
 * @param payload
 * @param code
 */
module.exports = (res, payload, code = 200) => {
    const success = code >= 200 && code < 400;

    res.status(code).json({success, payload});
};
