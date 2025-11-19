import React, { useState } from 'react';
import styles from '../App.module.css';

// Función auxiliar recursiva para obtener todas las zonas disponibles para ser padres
const getZonesOptions = (node, zoneList = []) => {
    // La 'Root Zone of X' es un nombre especial que no queremos en la lista
    if (!node.name.startsWith('Root Zone of')) {
        zoneList.push(node.name);
    }
    
    // Recorrer las subzonas de forma recursiva
    node.subzones.forEach(subzone => {
        getZonesOptions(subzone, zoneList);
    });
    
    return zoneList;
};

const CityManager = ({ city, onNetworkChange }) => {
    const [newZoneName, setNewZoneName] = useState('');
    // Al usar el nombre completo de la raíz, aseguramos que siempre sea una opción inicial válida
    const [parentZone, setParentZone] = useState(city.greenZoneRoot.name); 
    
    // Genera la lista de zonas disponibles para ser padres (excluyendo la Raíz visualmente)
    const availableParents = getZonesOptions({...city.greenZoneRoot});
    
    // El nombre que se muestra para la Root Zone en el selector
    const rootZoneDisplayName = city.greenZoneRoot.name.replace('Root Zone of ', 'Ciudad Raíz: ');

    const handleAddZone = (e) => {
        e.preventDefault();
        if (newZoneName.trim() === '') return;

        const success = city.addGreenZone(parentZone, newZoneName.trim());
        
        if (success) {
            setNewZoneName('');
            setParentZone(city.greenZoneRoot.name); // Resetear a la raíz después de agregar
            onNetworkChange(); // Forzar la re-renderización de la UI y las métricas
        } else {
            alert(`Error: No se pudo añadir la zona. La zona padre "${parentZone}" no existe.`);
        }
    };

    return (
        <div className={styles.metricCard} style={{ borderLeftColor: '#f7931e', marginTop: '20px' }}>
            <h3>Gestión de Zonas Verdes (Árbol N-ario)</h3>
            <p style={{ color: '#bbb', fontSize: '0.9em' }}>
                *La adición de una zona aumenta el <strong>Total de Zonas</strong>. Si se añade en el nivel más profundo, aumenta la <strong>Máxima Altura</strong>.
            </p>
            
            <form onSubmit={handleAddZone} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                
                {/* 1. Seleccionar Zona Padre (Jerarquía) */}
                <label className={styles.formLabel}>Seleccionar Zona Padre:</label>
                <select 
                    value={parentZone} 
                    onChange={(e) => setParentZone(e.target.value)}
                    className={styles.formInput}
                >
                    {/* Opción para la Raíz de la ciudad */}
                    <option value={city.greenZoneRoot.name}>
                        {rootZoneDisplayName}
                    </option>
                    {/* Opciones de Zonas Verdes existentes (nodos intermedios) */}
                    {availableParents.map(zone => (
                        <option key={zone} value={zone}>
                            -- {zone}
                        </option>
                    ))}
                </select>
                
                {/* 2. Nombre de la Nueva Subzona */}
                <label className={styles.formLabel}>Nombre de la Nueva Subzona:</label>
                <input
                    type="text"
                    value={newZoneName}
                    onChange={(e) => setNewZoneName(e.target.value)}
                    placeholder="Ej: Nuevo Sendero del Mirador"
                    className={styles.formInput}
                    required
                />
                
                {/* 3. Botón Agregar */}
                <button type="submit" className={styles.button + ' ' + styles.buttonAdd}>
                    Añadir Subzona
                </button>
            </form>
        </div>
    );
};

export default CityManager;