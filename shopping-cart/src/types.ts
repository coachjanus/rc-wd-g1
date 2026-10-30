// src/types.ts (Типи даних)
// Виносимо сюди всі інтерфейси, додаючи ключеве слово export.

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}
export interface DummyJsonProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  [key: string]: any;
}
export interface DummyJsonResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}
export interface CartItem {
  product: Product;
  quantity: number;
}
export interface CartStorageItem {
  productId: number;
  quantity: number;
}
export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: 'card' | 'cash';
}
export interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
}