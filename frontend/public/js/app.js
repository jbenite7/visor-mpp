document.addEventListener("DOMContentLoaded", () => {
  console.log("Visor MPP Inicializado");

  // Verificación de Salud del Backend
  checkApiHealth();

  const dropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-input");

  dropZone.addEventListener("click", () => fileInput.click());

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });
});

async function checkApiHealth() {
  const statusEl = document.getElementById("api-status");
  try {
    const response = await fetch("api.php?action=health");
    const data = await response.json();
    if (data.status === "ok") {
      statusEl.textContent = "API Conectada: " + data.message;
      statusEl.style.color = "#16a34a";
    } else {
      statusEl.textContent = "Error en API";
      statusEl.style.color = "#dc2626";
    }
  } catch (e) {
    statusEl.textContent = "Backend no disponible";
    statusEl.style.color = "#dc2626";
    console.error(e);
  }
}

function handleFiles(files) {
  if (files.length > 0) {
    alert("Archivo seleccionado: " + files[0].name);
    // Aquí irá la lógica de subida
  }
}
