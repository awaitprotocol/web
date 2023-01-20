export type TypeHits = {
    document: { desc: string; link: string; icon: string; title: string };
    highlight: object;
    highlights: {
        field: string;
        snippet: string;
    }[];
};

export type TypeResult = {
    facet_counts: number[]; //?
    found: number;
    hits: TypeHits[];
    out_of: number;
    page: number;
    request_params: { collection_name: string; per_page: number; q: string };
    search_cutoff: boolean;
    search_time_ms: number;
};
