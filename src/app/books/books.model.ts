export class Book{
    public id: number;
    public title: string; //könyv címe
    public author: string; //könyv szerzője
    public description: string; //könyv leírása
    public imagePath: string; //kép elérési útja
    public price: number; //könyv ára
    public stock: number; //készleten lévő könyvek száma

    constructor(id: number, title: string, author: string, description: string, imagePath: string, price: number, stock: number){
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
        this.stock = stock;
    }

}