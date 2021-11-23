export class Location {
    _id: string;
    id: string;
    name: string;
    distance: number;
    address: string;
    rating: number;
    facilities: string[];
    reviews: Review[];
    coords: number[];
    openingTimes: OpeningTimes[];
}

class OpeningTimes {
    days: string;
    opening: string;
    closing: string;
    closed: string;
}

export class Review {
    author: string;
    rating: number;
    reviewText: string;
}