export interface AlgoConfig {
    name: string;
    description: string;
    team: number;
    module_sources: any[];
    permission_type: string;
    tags?: string[];
    hidden_tags?: string[];
    is_google_searchable?: boolean;
    featured_by_admin_at?: null;
    is_auto_tagged?: boolean;
    is_universal?: boolean;
    members?: {
        team_member_id: number;
        name: string;
        permission_type: string;
    }[];
    authors?: any[];
    reviewer?: null;
    review_interval?: null;
    review_expire_at?: null;
}