const CARS_KEY = 'cars';
const ID_KEY = 'nextId';

function checkStorage() {
    if (JSON.stringify(localStorage, "") === "{}") {
        return false;
    }
    else {
        return true;
    }
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
    const car = cars.find((car) => car.id === id);
    if (car) {
        const index = cars.indexOf(car);
        cars.splice(index, 1);
        setCars(cars);
    } else {
        throw new Error(`No car with id ${id}`)
    }
}

export {
    checkStorage,
    addCar,
    removeCar
}