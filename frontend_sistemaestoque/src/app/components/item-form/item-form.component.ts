import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {
  @Input() item: Item | null = null; // Objeto de item que será editado
  @Output() addItem = new EventEmitter<Item>();
  @Output() updateItem = new EventEmitter<Item>();
  @Output() cancelEdit = new EventEmitter<void>();

  name: string = '';
  quantity: number = 0;
  unitPrice: number = 0;
  ncm: string = ''; // Novo campo NCM

  ngOnChanges(): void {
    // Atualiza os campos quando um item é passado para edição
    if (this.item) {
      this.name = this.item.name;
      this.quantity = this.item.quantity;
      this.unitPrice = this.item.unitPrice;
      this.ncm = this.item.ncm; // Atualiza o campo NCM
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.name = '';
    this.quantity = 0;
    this.unitPrice = 0;
    this.ncm = ''; // Resetar NCM
  }

  submitForm(): void {
    const newItem: Item = {
      name: this.name,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      ncm: this.ncm // Incluindo NCM
    };

    if (this.item) {
      this.updateItem.emit({ ...this.item, ...newItem });
    } else {
      this.addItem.emit(newItem);
    }

    this.resetForm();
  }

  onCancel(): void {
    this.resetForm();
    this.cancelEdit.emit();
  }
}