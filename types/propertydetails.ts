
export type PropertyDetailsResponse = {
  message: string;
  source: string;
  detail: PropertyDetail;
};

export type PropertyDetail = {
  property_id: string;
  listing_id: string;
  status: string;
  list_price: number;
  price_per_sqft: number | null;
  hoa_fee: number | null;
  href: string;

  address: {
    line?: string;
    city?: string;
    state_code?: string;
    state?: string;
    postal_code?: string;
  };

  details: {
    beds?: number | null;
    baths?: string | number | null;
    sqft?: number | null;
    [key: string]: unknown;
  };

  photos: {
    href: string;
    tags: string[];
  }[];

  details_sections: {
    category: string;
    text: string[];
  }[];

  schools: {
    id: string;
    name: string;
    district: string | null;
    funding_type: string | null;
    grades: string[];
  }[];

  neighborhoods: string[];

  property_history: PropertyHistoryEvent[];

  last_sold_date: string | null;
  last_update_date: string | null;
  list_date: string | null;
};

export type PropertyHistoryEvent = {
  date: string;
  event_name: string;
  photos: string[];
  price: number | null;
  price_change: number | null;
  source_name: string | null;
  sqft: number | null;
};
