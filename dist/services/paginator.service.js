export function getPagination(page = 1, limit = 10) {
    const p = typeof page === 'string' ? parseInt(page, 10) || 1 : page || 1;
    const l = typeof limit === 'string' ? parseInt(limit, 10) || 10 : limit || 10;
    const pageNum = Number.isNaN(p) || p < 1 ? 1 : p;
    const limNum = Number.isNaN(l) || l < 1 ? 10 : l;
    const skip = (pageNum - 1) * limNum;
    return { page: pageNum, limit: limNum, skip, take: limNum };
}
export function formatPaginatedResponse(data, total, page, limit) {
    const totalPages = Math.ceil(total / limit);
    return { data, page, limit, total, totalPages };
}
export default { getPagination, formatPaginatedResponse };
//# sourceMappingURL=paginator.service.js.map