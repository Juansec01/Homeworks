export class GreenZoneNode {
    // Evitamos el parámetro por defecto mutable
    constructor(name, subzones) {
        this.name = name;
        // Inicializa un NUEVO array vacío si 'subzones' es undefined
        this.subzones = subzones || [];
    }
}