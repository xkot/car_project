class Car {

    constructor(options) {
        this.brand = options.brand;
        this.model = options.model;
        this.mileage = options.mileage;
        this.gasoline = options.gasoline;
        this.transmission = options.transmission;
        this.capacity = options.capacity;
        this.price = options.price;
        this.about = options.about;
        //this.id = options.id;
        this.photo = options.photo;
    }
}

export {
    Car
}