import React from 'react';
import styles from '../App.module.css';

const NetworkDisplay = ({ city, connections }) => {
    // Si la ciudad es nula o indefinida, no renderizar nada
    if (!city) {
        return <div className={styles.metricCard}>Cargando datos de la ciudad...</div>;
    }

    // La altura del árbol se calcula aquí usando el método del modelo
    const maxHeight = city.getMaxHeight();
    // El total de zonas se calcula aquí
    const totalZones = city.getTotalZones();

    // Las conexiones ya se pasan como una lista de nombres
    const connectionList = connections.length > 0 ? connections.join(', ') : 'Aislada';

    return (
        <div className={styles.metricsContainer}>
            
            {/* Tarjeta 1: Conexiones del Grafo */}
            <div className={styles.metricCard} style={{ borderLeftColor: '#007bff' }}>
                <span className={styles.metricTitle}>🌎 {city.name}</span>
                <p><strong>Conexiones de Grafo:</strong> {connectionList}</p>
                <p style={{ fontSize: '0.8em', color: '#888' }}>
                    *Estas conexiones son bidireccionales (Grafo No Dirigido).
                </p>
            </div>

            {/* Tarjeta 2: Métricas del Árbol N-ario */}
            <div className={styles.metricCard} style={{ borderLeftColor: '#28a745' }}>
                <span className={styles.metricTitle}>📊 Métricas de Zonas Verdes (Árbol N-ario)</span>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div>
                        <p style={{ margin: 0 }}><strong>Máxima Altura (Niveles)</strong></p>
                        <h2 style={{ margin: 0, color: '#28a745' }}>{maxHeight}</h2>
                    </div>
                    <div>
                        <p style={{ margin: 0 }}><strong>Total de Zonas Registradas</strong></p>
                        <h2 style={{ margin: 0, color: '#28a745' }}>{totalZones}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkDisplay;