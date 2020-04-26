import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'budget-tracker';

  items: Observable<any[]>;

  itemsCollection;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
    this.itemsCollection = firestore.collection('items');

  }

  ngOnInit() {
    // this.itemsCollection.add({name: 'item', price: 10});
    // this.items.subscribe(res => console.log(res));
  }
}
