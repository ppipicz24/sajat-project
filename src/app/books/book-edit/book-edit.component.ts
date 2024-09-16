import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BooksService } from '../books.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {

  id:number
  editMode = false
  bookForm: FormGroup

  constructor(private route: ActivatedRoute, private bookService: BooksService, private router: Router, private dataStorage: DataStorageService) {}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = params['id'] !== undefined;
      console.log(params['id'])
      this.initForm()
    })
  }

  private initForm(){
    let bookTitle = ''
    let bookAuthor = ''
    let bookDescription = ''
    let bookImage = ''
    let bookPrice
    console.log(this.editMode)

    if(this.editMode){
      const book = this.bookService.getBook(this.id)
      bookTitle = book.title
      bookAuthor = book.author
      bookDescription = book.description
      bookImage = book.imagePath
      bookPrice = book.price
    }

    this.bookForm = new FormGroup({
      title: new FormControl(bookTitle, Validators.required),
      author: new FormControl(bookAuthor, Validators.required),
      description: new FormControl(bookDescription, Validators.required),
      imagePath: new FormControl(bookImage, Validators.required),
      price: new FormControl(bookPrice, [Validators.required, Validators.min(1)])
    })
  }

  onSubmit(){
    if(this.editMode){
      this.bookService.updateBook(this.id, this.bookForm.value)
    }else{
      this.bookService.addBook(this.bookForm.value)
    }
    this.onCancel()
    this.dataStorage.storeBooks()
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
