const CARS_KEY = 'cars';
const ID_KEY = 'nextId';

function findCars() {
    let cars = getCars();
    return (cars.length !== 0);
}

function nextId() {
    const nextId = Number(localStorage.getItem(ID_KEY) || 1);
    localStorage.setItem(ID_KEY, nextId + 1);
    return nextId;
}

function getCars() {
    return JSON.parse(localStorage.getItem(CARS_KEY) || '[]');
}

function setCars(cars) {
    localStorage.setItem(CARS_KEY, JSON.stringify(cars));
}

function addCar(car) {
    const cars = getCars();
    car.id = nextId();
    cars.push(car);
    setCars(cars);
}

function removeCar(id) {
    const cars = getCars();
    const car = cars.find((car) => Number(car.id) === Number(id));

    if (car) {
        const index = cars.indexOf(car);
        cars.splice(index, 1);
        setCars(cars);
    } else {
        throw new Error(`No car with id ${id}`)
    }
}

function getCarById(id) {
    const cars = getCars();
    const currentCar = cars.find((car) => Number(car.id) === Number(id));
    if (currentCar) {
        return currentCar;
    } else {
        throw new Error(`No car with id ${id}`)
    }
}

function editCar(editedCar, id) {
    const cars = getCars();
    let carIndex = cars.findIndex((car) => Number(car.id) === Number(id));
    editedCar.id = id;
    editedCar.views = cars[carIndex].views;
    cars[carIndex] = editedCar;
    setCars(cars);
}

function incViews(id) {
    const cars = getCars();
    let carIndex = cars.findIndex((car) => Number(car.id) === Number(id));
    cars[carIndex].views++;
    setCars(cars);
}

function setRandom() {
    let cars = [];
    const brandNames = ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Buick", "Volkswagen", "Volvo", "Lada", "Geely", "Dacia", "Daewoo", "Daihatsu", "Dodge", "Jeep", "Infiniti", "Isuzu", "IVECO", "Cadillac", "Citroen",  "Kia",  "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lincoln", "Maserati", "Maybach", "McLaren", "Mercedes-Benz", "Mitsubishi", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Rolls-Royce", "Rover", "Saab", "SEAT", "Skoda", "Smart", "Subaru", "Suzuki", "Toyota", "Ferrari", "Fiat", "Ford", "Honda", "Hummer", "Hyundai", "Chevrolet", "Chrysler", "Jaguar"];
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)/100)*100 + min;
    }
    function getRandomYear(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    brandNames.forEach(function (elem, i) {
        let car = new Object(null);
        car.brand = elem;
        car.mileage = getRandom(10000, 600001);
        car.year = getRandomYear(1990, 2017);
        car.transmission = "Автомат";
        car.gasoline = "Бензин";
        car.price = getRandom(3000, 70001);
        car.id = i + 1;
        car.views = 0;
        cars[i] = car;
    });
    setCars(cars);
}

export {
    addCar,
    editCar,
    findCars,
    getCarById,
    getCars,
    incViews,
    removeCar,
    setRandom
}