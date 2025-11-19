import React, { useState, useEffect } from 'react';
import { CityNetwork } from './models/CityNetwork'; 
import NetworkDisplay from './components/NetworkDisplay';
import CityManager from './components/CityManager';
import styles from './App.module.css';

const network = new CityNetwork();

const HelpBox = ({ cities }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.helpBox} style={{ 
            border: '1px solid #ffc107', 
            borderRadius: '8px', 
            backgroundColor: '#2e2e41',
            marginBottom: '20px',
            color: '#ffc107',
            fontSize: '0.9em',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <div 
                onClick={() => setIsExpanded(!isExpanded)} 
                style={{ 
                    padding: '15px', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                }}
            >
                <h3 style={{ margin: 0, color: '#ffc107' }}>
                    Guía de Uso del Programa y Conceptos
                </h3>
                <span style={{ fontSize: '1.5em' }}>
                    {isExpanded ? '▲ Ocultar' : '▼ Mostrar'}
                </span>
            </div>

            {isExpanded && (
                <div style={{ padding: '0 15px 15px 15px', borderTop: '1px solid #4a4a6b' }}>
                    <p>Este programa modela dos estructuras de datos: <strong>Grafo (Red de Ciudades)</strong> y <strong>Árbol N-ario (Zonas Verdes)</strong>.</p>
                    
                    <hr style={{ borderColor: '#4a4a6b' }}/>

                    <h4>1. Gestión del Grafo (Panel Izquierdo - Sidebar):</h4>
                    <p>El grafo representa las <strong>ciudades (nodos)</strong> y sus <strong>conexiones de viaje (aristas)</strong>. Es un grafo no dirigido (la conexión es bidireccional).</p>
                    <ul>
                        <li><strong>Crear Ciudad (Nodo):</strong> Añade un nuevo nodo al mapa de la red.</li>
                        <li><strong>Crear Conexión (Arista):</strong> Establece una relación entre dos nodos existentes.</li>
                        <li><strong>Eliminar Ciudad:</strong> Elimina el nodo y automáticamente todas sus aristas relacionadas.</li>
                    </ul>

                    <h4>2. Gestión del Árbol (Sección Principal):</h4>
                    <p>Cada ciudad contiene un <strong>Árbol N-ario</strong> que representa la <strong>jerarquía de sus zonas verdes</strong>.</p>
                    
                    <ul>
                        <li><strong>Máxima Altura (en Niveles):</strong> Mide la <strong>profundidad</strong> del árbol. Se cuenta la longitud del camino más largo desde la "Ciudad Raíz" hasta la subzona más anidada.
                            <ul>
                                <li>Se mide en <strong>niveles</strong> porque cada nivel representa una <strong>capa de jerarquía</strong> o dependencia. Si una ciudad tiene altura 5, significa que hay subzonas anidadas hasta 4 niveles de profundidad desde la zona principal.</li>
                            </ul>
                        </li>
                        <li><strong>Total de Zonas Registradas:</strong> Es el número total de nodos que existen en el árbol (excluyendo la raíz).</li>
                    </ul>

                    <p><strong>Uso del Gestor de Zonas (Árbol N-ario):</strong></p>
                    <ul>
                         <li>Las zonas verdes solo se pueden <strong>agregar</strong> a una zona padre existente, creando una jerarquía (subzona).</li>
                         <li>Al añadir una subzona, las métricas (Altura y Total) se actualizan inmediatamente.</li>
                    </ul>
                    
                    <p>Actualmente hay <strong>{cities.length}</strong> ciudades predefinidas en la red.</p>
                </div>
            )}
        </div>
    );
};


const App = () => {
    const [selectedCityName, setSelectedCityName] = useState('Bogota');
    const [updateTrigger, setUpdateTrigger] = useState(0); 
    const [newCityName, setNewCityName] = useState('');
    const [cityA, setCityA] = useState('');
    const [cityB, setCityB] = useState('');

    const forceNetworkUpdate = () => {
        setUpdateTrigger(prev => prev + 1);
    };

    // Función que inicializa los datos de prueba (8 ciudades con datos complejos)
    const initializeNetworkData = () => {
        // --- 1. GRAFO: Nodos de Ciudades ---
        network.addCity('Cali');
        network.addCity('Medellin');
        network.addCity('Bogota');
        network.addCity('CDMX');
        network.addCity('Santiago');
        network.addCity('Buenos Aires'); 
        network.addCity('Rio de Janeiro'); 
        network.addCity('Lima'); 
        
        // --- 2. GRAFO: Conexiones (Edges) ---
        network.addConnection('Cali', 'Medellin'); 
        network.addConnection('Medellin', 'Bogota');
        network.addConnection('CDMX', 'Bogota');
        network.addConnection('Santiago', 'Cali');
        network.addConnection('Buenos Aires', 'Santiago');
        network.addConnection('Rio de Janeiro', 'Buenos Aires');
        network.addConnection('Rio de Janeiro', 'Bogota'); 
        
        // --- 3. ÁRBOLES N-ARIO: Zonas Verdes (Datos de prueba complejos) ---

        // A. CALI (Altura 4, Total 5)
        const cali = network.getCity('Cali');
        if (cali) {
            cali.addGreenZone(cali.greenZoneRoot.name, 'Parque Natural Pance');
            cali.addGreenZone(cali.greenZoneRoot.name, 'EcoPark Las Garzas');
            cali.addGreenZone('Parque Natural Pance', 'Rio Pance');
            cali.addGreenZone('Parque Natural Pance', 'Senderos Pan-C');
            cali.addGreenZone('Rio Pance', 'Pozos Naturales');
        }

        // B. BOGOTA (Altura 5, Total 4)
        const bogota = network.getCity('Bogota');
        if (bogota) {
            bogota.addGreenZone(bogota.greenZoneRoot.name, 'Parque Simon Bolivar');
            bogota.addGreenZone('Parque Simon Bolivar', 'Jardin Botanico');
            bogota.addGreenZone('Jardin Botanico', 'Invernadero Central');
            bogota.addGreenZone('Invernadero Central', 'Seccion Amazonas');
        }
        
        // C. CDMX (Amplitud alta, Altura 4, Total 9)
        const cdmx = network.getCity('CDMX');
        if (cdmx) {
            cdmx.addGreenZone(cdmx.greenZoneRoot.name, 'Bosque de Chapultepec');
            cdmx.addGreenZone(cdmx.greenZoneRoot.name, 'Parque Ecologico Xochimilco');
            cdmx.addGreenZone(cdmx.greenZoneRoot.name, 'Parque Nacional Cumbres del Ajusco');
            cdmx.addGreenZone('Bosque de Chapultepec', 'Primera Seccion');
            cdmx.addGreenZone('Bosque de Chapultepec', 'Segunda Seccion');
            cdmx.addGreenZone('Bosque de Chapultepec', 'Tercera Seccion');
            cdmx.addGreenZone('Parque Ecologico Xochimilco', 'Canales');
            cdmx.addGreenZone('Parque Ecologico Xochimilco', 'Humedales');
            cdmx.addGreenZone('Tercera Seccion', 'Jardin de la Rosaleda');
        }

        // D. SANTIAGO (Profundidad alta, Altura 5, Total 5)
        const santiago = network.getCity('Santiago');
        if (santiago) {
            santiago.addGreenZone(santiago.greenZoneRoot.name, 'Parque Metropolitano');
            santiago.addGreenZone('Parque Metropolitano', 'Cerro San Cristobal');
            santiago.addGreenZone('Cerro San Cristobal', 'Jardin Japones');
            santiago.addGreenZone('Jardin Japones', 'Senderos Altos'); 
            santiago.addGreenZone(santiago.greenZoneRoot.name, 'Parque Forestal');
        }

        // E. BUENOS AIRES (Profundidad alta, Altura 5, Total 6)
        const ba = network.getCity('Buenos Aires');
        if (ba) {
            ba.addGreenZone(ba.greenZoneRoot.name, 'Reserva Ecologica Costanera Sur'); 
            ba.addGreenZone('Reserva Ecologica Costanera Sur', 'Senderos'); 
            ba.addGreenZone('Senderos', 'Mirador'); 
            ba.addGreenZone('Mirador', 'Plataforma Superior'); 
            ba.addGreenZone(ba.greenZoneRoot.name, 'Parque 3 de Febrero'); 
            ba.addGreenZone('Parque 3 de Febrero', 'El Rosedal');
        }

        // F. RÍO DE JANEIRO (Amplitud extrema, Altura 2, Total 5)
        const rio = network.getCity('Rio de Janeiro');
        if (rio) {
            rio.addGreenZone(rio.greenZoneRoot.name, 'Parque Nacional Tijuca'); 
            rio.addGreenZone(rio.greenZoneRoot.name, 'Jardin Botanico'); 
            rio.addGreenZone(rio.greenZoneRoot.name, 'Parque do Flamengo'); 
            rio.addGreenZone(rio.greenZoneRoot.name, 'Bosque da Barra'); 
            rio.addGreenZone(rio.greenZoneRoot.name, 'Parque da Catacumba'); 
        }

        // G. LIMA (Equilibrada, Altura 3, Total 4)
        const lima = network.getCity('Lima');
        if (lima) {
            lima.addGreenZone(lima.greenZoneRoot.name, 'Parque de la Reserva'); 
            lima.addGreenZone('Parque de la Reserva', 'Fuentes Magicas'); 
            lima.addGreenZone(lima.greenZoneRoot.name, 'Parque El Olivar'); 
            lima.addGreenZone('Parque El Olivar', 'Estanques'); 
        }
    };

    useEffect(() => {
        initializeNetworkData();
        const initialCities = Object.keys(network.cities);
        if (initialCities.length >= 1) {
            setSelectedCityName('Bogota'); 
            setCityA(initialCities[0]);
            setCityB(initialCities[initialCities.length > 1 ? 1 : 0]);
        }
    }, []);

    // ------------------- Gestión de Ciudades (Grafo) -------------------
    const handleAddCity = (e) => {
        e.preventDefault();
        if (newCityName.trim() === '') return;
        
        if (network.addCity(newCityName.trim())) {
            setSelectedCityName(newCityName.trim());
            setNewCityName('');
            forceNetworkUpdate();
        } else {
            alert(`La ciudad ${newCityName.trim()} ya existe.`);
        }
    };

    const handleAddConnection = (e) => {
        e.preventDefault();
        if (!cityA || !cityB || cityA === cityB) {
            alert("Selecciona dos ciudades diferentes para conectar.");
            return;
        }
        if (network.addConnection(cityA, cityB)) {
            alert(`Conexion anadida entre ${cityA} y ${cityB}.`);
            forceNetworkUpdate();
        } else {
            alert("La conexion ya existe o las ciudades no son validas.");
        }
    };

    const handleDeleteCity = (cityName) => {
        if (window.confirm(`Estas seguro de eliminar la ciudad ${cityName} y todas sus conexiones?`)) {
            if (network.deleteCity(cityName)) {
                const remainingCities = Object.keys(network.cities);
                setSelectedCityName(remainingCities.length > 0 ? remainingCities[0] : null);
                forceNetworkUpdate();
            }
        }
    };
    
    // ------------------- Renderizado -------------------
    const cities = Object.keys(network.cities);
    const selectedCity = network.getCity(selectedCityName);
    const connections = selectedCityName ? network.adjacencyList[selectedCityName] || [] : [];
    
    return (
        <div className={styles.appContainer}>
            
            {/* 1. Sidebar para la gestión interactiva de la Red (Grafo) */}
            <div className={styles.sidebar}>
                <h2>Gestion de la Red (Grafo)</h2>
                
                {/* Formulario Añadir Ciudad */}
                <form onSubmit={handleAddCity} style={{ marginBottom: '25px', border: '1px solid #4a4a6b', padding: '10px', borderRadius: '5px' }}>
                    <p style={{ color: '#fff' }}><strong>Crear Ciudad (Nodo)</strong></p>
                    <input
                        type="text"
                        value={newCityName}
                        onChange={(e) => setNewCityName(e.target.value)}
                        placeholder="Nombre de la nueva ciudad"
                        className={styles.formInput}
                        required
                    />
                    <button type="submit" className={styles.button + ' ' + styles.buttonAdd} style={{ width: '100%', marginTop: '10px' }}>
                        Anadir Ciudad
                    </button>
                </form>

                {/* Formulario Añadir Conexión */}
                <form onSubmit={handleAddConnection} style={{ marginBottom: '25px', border: '1px solid #4a4a6b', padding: '10px', borderRadius: '5px' }}>
                    <p style={{ color: '#fff' }}><strong>Crear Conexión (Arista)</strong></p>
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                        <select 
                            value={cityA} 
                            onChange={(e) => setCityA(e.target.value)}
                            className={styles.formInput}
                            style={{ flex: 1 }}
                        >
                            <option value="">Ciudad A</option>
                            {cities.map(city => (<option key={'A' + city} value={city}>{city}</option>))}
                        </select>
                        <select 
                            value={cityB} 
                            onChange={(e) => setCityB(e.target.value)}
                            className={styles.formInput}
                            style={{ flex: 1 }}
                        >
                            <option value="">Ciudad B</option>
                            {cities.map(city => (<option key={'B' + city} value={city}>{city}</option>))}
                        </select>
                    </div>
                    <button type="submit" className={styles.button + ' ' + styles.buttonAdd} style={{ width: '100%' }}>
                        Conectar Ciudades
                    </button>
                </form>

                <hr style={{ borderColor: '#4a4a6b' }}/>

                {/* Listado de Ciudades para Seleccionar/Eliminar */}
                <h2 style={{ fontSize: '1.2em' }}>Seleccionar Ciudad</h2>
                <ul className={styles.cityList}>
                    {cities.map(city => (
                        <li 
                            key={city} 
                            onClick={() => setSelectedCityName(city)}
                            className={`${styles.cityListItem} ${city === selectedCityName ? styles.selected : ''}`}
                        >
                            {city}
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleDeleteCity(city); }}
                                className={styles.buttonDelete}
                                style={{ padding: '5px 8px', marginLeft: '10px' }}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 2. Contenido Principal (Métricas, Gestión del Árbol y Guía) */}
            <div className={styles.mainContent}>
                
                {/* Cuadro de Ayuda (Superior Derecho) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <HelpBox cities={cities} />
                </div>
                
                {/* Header: Corregido con KEY para forzar la actualización del nombre */}
                <header key={selectedCityName} className={styles.header}>
                    <h1>Ciudad {selectedCityName ? `: ${selectedCityName}` : ''}</h1>
                    <p>Muestra las metricas del Arbol N-ario de Zonas Verdes.</p>
                </header>

                {selectedCity && (
                    <>
                        {/* Display de Métricas y Conexiones: Corregido con KEY para forzar la actualización de datos */}
                        <NetworkDisplay 
                            key={selectedCityName + '-display'} 
                            city={selectedCity} 
                            connections={connections} 
                        />

                        {/* Gestión de Zonas Verdes: Corregido al inicializar correctamente la zona raíz sin datos compartidos */}
                        <CityManager 
                            key={selectedCityName + '-manager'}
                            city={selectedCity} 
                            onNetworkChange={forceNetworkUpdate} 
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default App;