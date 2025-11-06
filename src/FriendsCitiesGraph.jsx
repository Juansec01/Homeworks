import React, { useRef, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

const FriendsCitiesGraph = () => {
  const graphRef = useRef();
  const [filteredData, setFilteredData] = useState(null);
  const [cityPeople, setCityPeople] = useState([]); // 👈 lista de personas de una ciudad

  const baseData = {
    nodes: [
      { id: "Juan", age: 25, type: "person", city: "Cali" },
      { id: "María", age: 22, type: "person", city: "Cali" },
      { id: "Carlos", age: 30, type: "person", city: "Bogotá" },
      { id: "Laura", age: 28, type: "person", city: "Medellín" },
      { id: "Andrés", age: 27, type: "person", city: "Bogotá" },
      { id: "Sofía", age: 24, type: "person", city: "Cali" },
      { id: "Pedro", age: 35, type: "person", city: "Barranquilla" },
      { id: "Camila", age: 21, type: "person", city: "Medellín" },
      { id: "Valentina", age: 26, type: "person", city: "Cali" },
      { id: "Sebastián", age: 29, type: "person", city: "Bogotá" },
      { id: "Diana", age: 23, type: "person", city: "Cartagena" },
      { id: "Felipe", age: 32, type: "person", city: "Cali" },
      { id: "Natalia", age: 31, type: "person", city: "Medellín" },
      { id: "Esteban", age: 33, type: "person", city: "Barranquilla" },
      { id: "Paula", age: 27, type: "person", city: "Bogotá" },
      { id: "Samuel", age: 25, type: "person", city: "Cali" },
      { id: "Juliana", age: 20, type: "person", city: "Cartagena" },
      { id: "Tomás", age: 28, type: "person", city: "Medellín" },
      { id: "Lucía", age: 22, type: "person", city: "Barranquilla" },
      { id: "Manuela", age: 26, type: "person", city: "Bogotá" },
      // Ciudades
      { id: "Cali", type: "city" },
      { id: "Bogotá", type: "city" },
      { id: "Medellín", type: "city" },
      { id: "Barranquilla", type: "city" },
      { id: "Cartagena", type: "city" },
    ],
    links: [
      // Enlaces persona - ciudad
      { source: "Juan", target: "Cali" },
      { source: "María", target: "Cali" },
      { source: "Carlos", target: "Bogotá" },
      { source: "Laura", target: "Medellín" },
      { source: "Andrés", target: "Bogotá" },
      { source: "Sofía", target: "Cali" },
      { source: "Pedro", target: "Barranquilla" },
      { source: "Camila", target: "Medellín" },
      { source: "Valentina", target: "Cali" },
      { source: "Sebastián", target: "Bogotá" },
      { source: "Diana", target: "Cartagena" },
      { source: "Felipe", target: "Cali" },
      { source: "Natalia", target: "Medellín" },
      { source: "Esteban", target: "Barranquilla" },
      { source: "Paula", target: "Bogotá" },
      { source: "Samuel", target: "Cali" },
      { source: "Juliana", target: "Cartagena" },
      { source: "Tomás", target: "Medellín" },
      { source: "Lucía", target: "Barranquilla" },
      { source: "Manuela", target: "Bogotá" },
      // Amistades
      { source: "Juan", target: "María" },
      { source: "Juan", target: "Sofía" },
      { source: "Carlos", target: "Andrés" },
      { source: "Carlos", target: "Laura" },
      { source: "Sebastián", target: "Paula" },
      { source: "Laura", target: "Camila" },
      { source: "Felipe", target: "Valentina" },
      { source: "Diana", target: "Juliana" },
      { source: "Esteban", target: "Lucía" },
      { source: "Manuela", target: "Andrés" },
      { source: "Natalia", target: "Tomás" },
      { source: "Pedro", target: "Esteban" },
      { source: "Samuel", target: "María" },
      { source: "Sebastián", target: "Andrés" },
      { source: "Paula", target: "Carlos" },
      { source: "Valentina", target: "Lucía" },
      { source: "Tomás", target: "Laura" },
      { source: "Lucía", target: "Pedro" },
      { source: "Juliana", target: "Diana" },
      { source: "Felipe", target: "Juan" },
    ],
  };

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force("charge").strength(-350);
      graphRef.current.d3Force("link").distance(120);
    }
  }, []);

  // 🔹 Filtro por ciudad y muestra la lista
  const filterByCity = (city) => {
    const filteredNodes = baseData.nodes.filter(
      (n) => n.type === "city" || n.city === city
    );
    const nodeIds = filteredNodes.map((n) => n.id);
    const filteredLinks = baseData.links.filter(
      (l) => nodeIds.includes(l.source) && nodeIds.includes(l.target)
    );
    setFilteredData({ nodes: filteredNodes, links: filteredLinks });

    // 👉 Mostrar la lista de personas de esa ciudad
    const people = baseData.nodes.filter(
      (n) => n.type === "person" && n.city === city
    );
    setCityPeople(people);
  };

  const highlightFriends = (person) => {
    const relatedLinks = baseData.links.filter(
      (l) => l.source === person || l.target === person
    );
    const nodeIds = new Set([
      person,
      ...relatedLinks.map((l) => l.source),
      ...relatedLinks.map((l) => l.target),
    ]);
    const filteredNodes = baseData.nodes.filter((n) => nodeIds.has(n.id));
    const filteredLinks = baseData.links.filter(
      (l) => nodeIds.has(l.source) && nodeIds.has(l.target)
    );
    setFilteredData({ nodes: filteredNodes, links: filteredLinks });
    setCityPeople([]); // limpia la lista al mostrar amigos
  };

  const resetGraph = () => {
    setFilteredData(null);
    setCityPeople([]); // limpia lista
  };

  const data = filteredData || baseData;

  return (
    <div style={{ textAlign: "center", background: "#f9f9f9", padding: "20px" }}>
      <h2> Red de Amigos y Ciudades</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => filterByCity("Cali")}> Cali</button>
        <button onClick={() => filterByCity("Bogotá")}> Bogotá</button>
        <button onClick={() => filterByCity("Medellín")}> Medellín</button>
        <button onClick={() => filterByCity("Barranquilla")}> Barranquilla</button>
        <button onClick={() => filterByCity("Cartagena")}> Cartagena</button>
        <button onClick={() => highlightFriends("Juan")}> Amigos de Juan</button>
        <button onClick={resetGraph}> Ver Todo</button>
      </div>

      {/* Lista de personas en la ciudad seleccionada */}
      {cityPeople.length > 0 && (
        <div
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            display: "inline-block",
            padding: "15px 25px",
            marginBottom: "20px",
          }}
        >
          <h3>👨‍👩‍👧‍👦 Personas que viven en {cityPeople[0].city}:</h3>
          <ul style={{ textAlign: "left" }}>
            {cityPeople.map((p) => (
              <li key={p.id}>
                {p.id} — {p.age} años
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        <ForceGraph2D
          ref={graphRef}
          graphData={data}
          nodeAutoColorBy="type"
          nodeLabel={(node) =>
            node.type === "person"
              ? `${node.id} (Edad: ${node.age}, Ciudad: ${node.city})`
              : `Ciudad: ${node.id}`
          }
          nodeCanvasObject={(node, ctx) => {
            const label = node.id;
            ctx.font = "10px Sans-Serif";
            ctx.fillStyle = node.type === "city" ? "#1976d2" : "#43a047";
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.type === "city" ? 10 : 6, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.fillText(label, node.x + 8, node.y + 3);
          }}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          backgroundColor="#ffffff"
          width={900}
          height={600}
        />
      </div>
    </div>
  );
};

export default FriendsCitiesGraph;
