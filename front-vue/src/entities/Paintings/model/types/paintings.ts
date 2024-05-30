export interface Painting {
    artist: string;
    genre: string;
    style: string;
    title: string;
    url: string;
}

export interface Paintings {
    interior: string;
    topPaintings: Painting[];
}
