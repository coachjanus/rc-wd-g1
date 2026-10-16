// class Point {
//     x: number;
//     // Property 'x' has no initializer and is not definitely assigned in the constructor.ts(2564)
//     y: number;
//     // Property 'y' has no initializer and is not definitely assigned in the constructor.ts(2564)
//     constructor() {
//         this.x = 0;
//         this.y = 0;
//     }
// }

// const point = new Point();
// // point.x = 10;
// // point.y = 20;

// console.log(point.x, point.y);

// class Album {
//     title;
//     artist;
//     releaseYear;
//     // constructor() {
//     //  this.title = "Loop Finding Jazz Records";
//     //  this.artist = "Jan Jelinek";
//     //  this.releaseYear = 2001;
//     //  }
//     // inside the Album class
//     constructor(opts: { title: string; artist: string; releaseYear: number }) {
//         this.title = opts.title;
//         this.artist = opts.artist;
//         this.releaseYear = opts.releaseYear;
//     }
// }

// const album = new Album({ title: "Loop Finding Jazz Records", artist: "Jan Jelinek", releaseYear: 2001 });
// console.log(album.title, album.artist, album.releaseYear);


// function printAlbumInfo(album: Album) {
//     console.log(
//         `${album.title} by ${album.artist}, released in ${album.releaseYear}.`,
//     );
// }
// printAlbumInfo(album);


// /// Інтерфейси (Типи даних)
// interface Product {
//     id: number;
//     name: string;
//     category: string;
//     price: number;
// }