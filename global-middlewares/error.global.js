module.exports =  () => (error, req, res, next) => {
	console.log(error);
	res.error(error);
};
