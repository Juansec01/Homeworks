import { GreenZoneNode } from './GreenZoneNode';

export class City {
    constructor(name) {
        this.name = name;
        this.greenZoneRoot = new GreenZoneNode(`Root Zone of ${name}`);
    }

    addGreenZone(parentName, newZoneName) {
        const parentNode = this._findZone(parentName);
        if (parentNode) {
            // Se usa el constructor de GreenZoneNode
            parentNode.subzones.push(new GreenZoneNode(newZoneName));
            return true;
        }
        return false;
    }

    _findZone(zoneName, startNode = this.greenZoneRoot) {
        if (startNode.name === zoneName) {
            return startNode;
        }
        for (const subzone of startNode.subzones) {
            const found = this._findZone(subzone.name, subzone);
            if (found) {
                return found;
            }
        }
        return null;
    }

    // Cálculo de la Máxima Altura (Profundidad) del árbol N-ario
    getMaxHeight(node = this.greenZoneRoot) {
        if (!node.subzones || node.subzones.length === 0) {
            // Un nodo hoja cuenta como altura 1 (la raíz no se cuenta en la altura de un árbol)
            return 1;
        }
        
        let maxDepth = 0;
        for (const subzone of node.subzones) {
            maxDepth = Math.max(maxDepth, this.getMaxHeight(subzone));
        }
        
        // +1 por el nivel actual (el nodo padre)
        return maxDepth + 1;
    }

    // Cálculo del total de zonas (excluyendo la raíz)
    getTotalZones(node = this.greenZoneRoot) {
        let count = 0;
        for (const subzone of node.subzones) {
            count += 1 + this.getTotalZones(subzone); 
        }
        return count;
    }
}