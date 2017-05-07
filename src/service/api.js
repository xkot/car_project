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
    let carIndex = cars.findIndex((car) => car.id === Number(id));
    editedCar.id = id;
    cars[carIndex] = editedCar;
    setCars(cars);
}

export {
    findCars,
    addCar,
    getCars,
    removeCar,
    getCarById,
    editCar
}