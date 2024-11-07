import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: Item[] = [];
  editItem: Item | null = null;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getAllItems().subscribe(items => {
      this.items = items;
    });
  }

  handleAddItem(newItem: Item): void {
    this.itemService.addItem(newItem).subscribe(item => {
      this.items.push(item);
    });
  }

  handleUpdateItem(updatedItem: Item): void {
    this.itemService.updateItem(updatedItem).subscribe(item => {
      const index = this.items.findIndex(i => i.id === item.id);
      this.items[index] = item;
      this.cancelEdit();
    });
  }

  handleEditItem(item: Item): void {
    this.editItem = { ...item };
  }

  cancelEdit(): void {
    this.editItem = null;
  }

  handleDeleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }
}