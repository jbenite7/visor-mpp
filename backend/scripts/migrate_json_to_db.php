<?php
// backend/scripts/migrate_json_to_db.php

require_once __DIR__ . '/../src/ProjectStorage.php';

echo "Iniciando migración de JSON a PostgreSQL...\n";

$jsonDir = __DIR__ . '/../data/projects';
$indexFile = $jsonDir . '/projects.json';

if (!file_exists($indexFile)) {
    die("No se encontró el índice de proyectos en $indexFile\n");
}

$projects = json_decode(file_get_contents($indexFile), true);
$storage = new ProjectStorage();

foreach ($projects as $meta) {
    $id = $meta['id'];
    $jsonFile = $jsonDir . "/project_{$id}.json";

    if (!file_exists($jsonFile)) {
        echo "Advertencia: Archivo de datos para proyecto ID $id no encontrado.\n";
        continue;
    }

    echo "Migrando Proyecto ID $id: {$meta['name']}...\n";

    $data = json_decode(file_get_contents($jsonFile), true);

    try {
        // Usamos saveProject. 
        // Nota: saveProject genera un NUEVO ID por defecto.
        // Si queremos mantener los IDs antiguos, necesitamos modificar saveProject o insertar manualmente.
        // Como es una migración única y las referencias externas (si las hay) podrían depender del ID,
        // lo ideal sería mantenerlos, pero saveProject usa SERIAL.
        // Para simplificar, importaremos como nuevos proyectos.

        $newId = $storage->saveProject($data, $meta['name']);

        // Si queremos preservar la agrupación de versiones:
        // (Esto requeriría lógica extra si los IDs cambian)

        echo " -> Migrado correctamente. Nuevo ID: $newId\n";
    } catch (Exception $e) {
        echo " -> Error al migrar: " . $e->getMessage() . "\n";
    }
}

echo "Migración completada.\n";
