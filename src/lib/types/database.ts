export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			products: {
				Row: {
					amount: number;
					category: string;
					checked: boolean;
					created_at: string;
					id: number;
					sort: number;
					title: string;
					type: string;
					uuid: string;
				};
				Insert: {
					amount?: number;
					category?: string;
					checked?: boolean;
					created_at?: string;
					id?: number;
					sort?: number;
					title?: string;
					type?: string;
					uuid: string;
				};
				Update: {
					amount?: number;
					category?: string;
					checked?: boolean;
					created_at?: string;
					id?: number;
					sort?: number;
					title?: string;
					type?: string;
					uuid?: string;
				};
			};
			userdata: {
				Row: {
					categories: Json | null;
					id: number;
					priorities: Json | null;
					uuid: string;
				};
				Insert: {
					categories?: Json | null;
					id?: number;
					priorities?: Json | null;
					uuid: string;
				};
				Update: {
					categories?: Json | null;
					id?: number;
					priorities?: Json | null;
					uuid?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
