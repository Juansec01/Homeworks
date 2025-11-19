import { City } from './City';

export class CityNetwork {
    constructor() {
        this.cities = {}; 
        this.adjacencyList = {}; 
    }

    addCity(cityName) {
        if (this.cities[cityName]) {
            return false; 
        }
        // Crea una nueva instancia de City, que usa el GreenZoneNode
        this.cities[cityName] = new City(cityName); 
        this.adjacencyList[cityName] = [];
        return true;
    }

    getCity(cityName) {
        return this.cities[cityName];
    }

    addConnection(cityA, cityB) {
        if (!this.cities[cityA] || !this.cities[cityB] || cityA === cityB) {
            return false;
        }
        if (this.adjacencyList[cityA].includes(cityB)) {
            return false;
        }
        
        // Conexión bidireccional (Grafo no dirigido)
        this.adjacencyList[cityA].push(cityB);
        this.adjacencyList[cityB].push(cityA);
        return true;
    }

    deleteCity(cityName) {
        if (!this.cities[cityName]) {
            return false;
        }

        for (const city in this.adjacencyList) {
            this.adjacencyList[city] = this.adjacencyList[city].filter(
                (connectedCity) => connectedCity !== cityName
            );
        }

        delete this.cities[cityName];
        delete this.adjacencyList[cityName];

        return true;
    }
}