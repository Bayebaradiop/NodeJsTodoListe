export declare function getPagination(page?: number | string, limit?: number | string): {
    page: number;
    limit: number;
    skip: number;
    take: number;
};
export declare function formatPaginatedResponse<T>(data: T, total: number, page: number, limit: number): {
    data: T;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};
declare const _default: {
    getPagination: typeof getPagination;
    formatPaginatedResponse: typeof formatPaginatedResponse;
};
export default _default;
//# sourceMappingURL=paginator.service.d.ts.map