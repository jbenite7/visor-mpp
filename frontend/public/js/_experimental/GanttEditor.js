/**
 * GanttEditor.js
 * Main controller for the MS Project-like editor.
 * Coordinates the Grid (Left) and Chart (Right).
 */
class GanttEditor {
  constructor(containerId, projectData) {
    this.container = document.getElementById(containerId);
    this.data = projectData;
    this.tasks = projectData.tasks;
    this.resources = projectData.resources;

    // Configuration
    this.config = {
      rowHeight: 30,
      headerHeight: 40,
      columnWidth: 30, // px per day (zoom level)
      startDate: this.calculateStartDate(),
      viewMode: "Day", // Day, Week, Month
    };

    this.initUI();

    // Expose instance strictly for debug calling from console if needed
    window.editor = this;
  }

  calculateStartDate() {
    if (!this.data.project.startDate) return new Date();
    const start = new Date(this.data.project.startDate);
    start.setDate(start.getDate() - 7); // Buffer
    return start;
  }

  initUI() {
    this.container.innerHTML = `
            <div class="gantt-toolbar">
                <button onclick="window.editor.zoomIn()">Zoom +</button>
                <button onclick="window.editor.zoomOut()">Zoom -</button>
                <button class="btn-save" onclick="window.editor.save()">💾 Guardar</button>
            </div>
            <div class="gantt-body">
                <div id="gantt-grid-container" class="gantt-grid-panel"></div>
                <div id="gantt-chart-container" class="gantt-chart-panel"></div>
            </div>
        `;

    // Initialize Components
    this.grid = new GanttGrid("gantt-grid-container", this);
    this.chart = new GanttChart("gantt-chart-container", this);

    // Sync Scrolling
    const gridPanel = document.getElementById("gantt-grid-container");
    const chartPanel = document.getElementById("gantt-chart-container");

    gridPanel.addEventListener("scroll", (e) => {
      chartPanel.scrollTop = gridPanel.scrollTop;
    });

    chartPanel.addEventListener("scroll", (e) => {
      gridPanel.scrollTop = chartPanel.scrollTop;
    });
  }

  updateTask(taskId, updates) {
    const task = this.tasks.find((t) => t.id === taskId || t.UID == taskId);
    if (task) {
      Object.assign(task, updates);
      // Re-render both
      this.grid.render();
      this.chart.render();
    }
  }

  save() {
    // Fallback to global data if internal ID missing
    const projId =
      this.data.project.id ||
      (window.currentProjectData && window.currentProjectData.project.id);

    const payload = {
      id: projId,
      project: this.data.project,
      tasks: this.tasks,
      resources: this.resources,
    };

    if (!payload.id) {
      alert(
        "Error: No se encontró ID de proyecto. Guarda el proyecto primero."
      );
      return;
    }

    fetch("api.php?action=save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.status === "success") {
          alert("Proyecto guardado correctamente");
        } else {
          alert("Error al guardar: " + res.message);
        }
      })
      .catch((e) => {
        console.error(e);
        alert("Error de red al guardar");
      });
  }

  zoomIn() {
    this.config.columnWidth += 10;
    this.chart.render();
  }

  zoomOut() {
    if (this.config.columnWidth > 10) {
      this.config.columnWidth -= 10;
      this.chart.render();
    }
  }
}
