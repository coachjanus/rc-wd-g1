// 1. Інтерфейс для товару
interface Product {
  id: string;
  name: string;
  price: number;
}
// 2. Інтерфейс для елемента у кошику (товар + кількість)
interface CartItem {
  product: Product;
  quantity: number;
}

// 3. Клас для кошика

class ShoppingCart {
  // private items: CartItem[] = [];
  // Використовуємо Map для швидкого пошуку та оновлення за id товару
  private items: Map<string, CartItem> = new Map();

  // Додати товар у кошик
  addItem(product: Product, quantity: number  = 1): void {
      if (quantity <= 0) {
          throw new Error("Quantity must be greater than zero.");
      }
    if (this.items.has(product.id)) {
      // Якщо товар вже є у кошику, оновлюємо кількість
      const existingItem = this.items.get(product.id)!;
      existingItem.quantity += quantity;
    } else {
      // Якщо товару немає у кошику, додаємо новий елемент
      this.items.set(product.id, { product, quantity });
    }
  }

  // Видалити товар з кошика
  // removeItem(productId: string): void {
  //   if (this.items.has(productId)) {
  //     this.items.delete(productId);
  //   } else {
  //     throw new Error("Product not found in the cart.");
  //   }
  // }
  // removeItem(productId: string):boolean {
  //   if (this.items.has(productId)) {
  //     this.items.delete(productId);
  //     return true; // Повертаємо true, якщо товар успішно видалено
  //   } else {
  //     return false; // Повертаємо false, якщо товар не знайдено
  //   }
  // }
  removeItem(productId: string):boolean {
    return this.items.delete(productId);  
  }

  // updateItemQuantity(productId: string, quantity: number): void {
  //   if (quantity <= 0) {
  //     throw new Error("Quantity must be greater than zero.");
  //   }
  //   if (this.items.has(productId)) {
  //     const item = this.items.get(productId)!;
  //     item.quantity = quantity;
  //   } else {
  //     throw new Error("Product not found in the cart.");
  //   }
  // }

  // Отримати всі товари у кошику
  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }
  
  // Оновити кількість товару у кошику
  updateItemQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }
    if (this.items.has(productId)) {
      const item = this.items.get(productId)!;
      item.quantity = quantity;
    } else {
      throw new Error("Product not found in the cart.");
    }
  }

  // Отримати загальну вартість товарів у кошику
  getTotalPrice(): number {
    let total = 0;
    for (const item of this.items.values()) {
      total += item.product.price * item.quantity;
    }
    // return total;
    // Округлення до 2 знаків після коми для уникнення проблем з розрахунками Float
    return Math.round(total * 100) / 100;
  }

  // Отримати загальну кількість товарів у кошику
  getTotalItems(): number {
    let totalItems = 0;
    for (const item of this.items.values()) {
      totalItems += item.quantity;
    }
    return totalItems;
  }
  // Очистити кошик
  clearCart(): void {
    this.items.clear();
  }

}

const cart = new ShoppingCart();

// Наші товари
const laptop: Product = { id: "p1", name: "Ноутбук", price: 25000 };
const mouse: Product = { id: "p2", name: "Мишка", price: 800 };

// 1. Додаємо товари
cart.addItem(laptop);
cart.addItem(mouse, 2); // Додали 2 мишки
cart.addItem(mouse); // Додали ще одну мишку (разом 3)


console.log("Товари в кошику:", cart.getItems());
console.log("Загальна кількість:", cart.getTotalItems()); // Виведе: 4
console.log("Загальна вартість:", cart.getTotalPrice()); // Виведе: 27400

// 2. Оновлюємо кількість
cart.updateItemQuantity("p2", 1); // Зменшили кількість мишок до 1
console.log("Нова вартість після оновлення:", cart.getTotalPrice()); // Виведе: 25800
// 3. Видаляємо товар
cart.removeItem("p1"); // Видалили ноутбук
console.log("Загальна кількість після видалення:", cart.getTotalItems()); // Виведе: 1

