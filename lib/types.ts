
export interface RestaurantType {
    name: string;
    city: string;
    currency: string;
    phone: string[];
    address: string;
    website: string;
    working_hours: string;
    instagram: string;
  }
  
  export interface PizzaType {
    id: number;
    name: string;
    description: string;
    weight_g: number;
    price_uah: number;
    tags: string[];
    image_url: string;
  }
  
  export interface PizzasDataType {
    restaurant: RestaurantType;
    pizzas: PizzaType[];
    note: string;
  }

  export interface PizzaTagType {
    id: number;
    name: string;
  };

  export interface PizzasTagsDataType {
    tags: PizzaTagType[];
  }