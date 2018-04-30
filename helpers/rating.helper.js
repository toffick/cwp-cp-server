module.exports.newRating = (rating, count, mark) => {
    const sumRating = (rating * count) + mark;
    const newCount = count + 1;

    return sumRating / newCount;
};
