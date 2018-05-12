/**
 * get object with meta about pagination by a passed array length, page and limit
 * @param {Number} arrayLength
 * @param {Number} page
 * @param {Number} limit
 * @return {Object}
 */
module.exports = (arrayLength, page, limit) => {
    const pagination = {};
    const end = page * limit;

    if (arrayLength === 0) {
        pagination.current = page;
        pagination.first = 1;
        pagination.last = 1;
        return {pagination};
    }

    if (page > 1) {
        pagination.prev = page - 1;
    }

    if (end < arrayLength) {
        pagination.next = page + 1;
    }

    if (limit !== arrayLength) {
        pagination.current = page;
        pagination.first = 1;
        pagination.last = Math.ceil(arrayLength / limit);
    }

    return pagination;
};
