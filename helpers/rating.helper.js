/**
 * calculate new rating value by total count of mark and new mark
 * @param rating
 * @param count
 * @param mark
 * @return {number}
 */
module.exports.newRating = (rating, count, mark) => {
    const sumRating = (rating * count) + mark;
    const newCount = count + 1;

    return sumRating / newCount;
};
