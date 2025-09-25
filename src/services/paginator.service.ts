export function getPagination(page: number | string = 1, limit: number | string = 10) {
  const p = typeof page === 'string' ? parseInt(page, 10) || 1 : page || 1;
  const l = typeof limit === 'string' ? parseInt(limit, 10) || 10 : limit || 10;
  const pageNum = Number.isNaN(p as number) || (p as number) < 1 ? 1 : (p as number);
  const limNum = Number.isNaN(l as number) || (l as number) < 1 ? 10 : (l as number);
  const skip = (pageNum - 1) * limNum;
  return { page: pageNum, limit: limNum, skip, take: limNum };
}

export function formatPaginatedResponse<T>(data: T, total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);
  return { data, page, limit, total, totalPages };
}

export default { getPagination, formatPaginatedResponse };
