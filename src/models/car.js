class Car {

    constructor(options) {
        this.brand = options.brand;
        this.model = options.model;
        this.mileage = options.mileage;
        this.year = options.year;
        this.gasoline = options.gasoline;
        this.transmission = options.transmission;
        this.capacity = options.capacity;
        this.price = options.price;
        this.about = options.about;
        this.photo = options.photo;
        this.views = 0;
    }
}

export {
    Car
}