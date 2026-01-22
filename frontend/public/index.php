<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visor MPP</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="app-header">
        <div class="container">
            <h1>Visor MPP</h1>
            <p>Visualiza tus proyectos de Microsoft Project al instante</p>
        </div>
    </header>

    <main class="container">
        <section class="upload-section">
            <div id="drop-zone" class="drop-zone">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                </div>
                <h3>Arrastra tu archivo .mpp aquí</h3>
                <p>O haz clic para seleccionar</p>
                <input type="file" id="file-input" accept=".mpp,.xml" hidden>
            </div>
        </section>

        <section id="results-section" class="results-section hidden">
            <!-- Aquí se renderizará el Gantt/Tabla -->
        </section>
    </main>

    <footer class="app-footer">
        <div class="container">
            <p>&copy; 2026 Visor MPP - Mobile First</p>
            <div id="api-status" class="status-indicator">Verificando API...</div>
        </div>
    </footer>

    <script src="js/app.js"></script>
</body>
</html>
