/**
 * GanttGrid.js
 * Spreadsheet-like view for tasks.
 */
class GanttGrid {
  constructor(containerId, editor) {
    this.container = document.getElementById(containerId);
    this.editor = editor;
    this.columns = [
      { id: "UID", label: "ID", width: 50 },
      { id: "Name", label: "Nombre de Tarea", width: 250, editable: true },
      { id: "Duration", label: "Duración", width: 80, editable: true },
      { id: "Start", label: "Inicio", width: 90, type: "date" },
      { id: "Finish", label: "Fin", width: 90, type: "date" },
    ];
    this.render();
  }

  render() {
    const headerHtml = this.columns
      .map(
        (col) =>
          `<div class="grid-header-cell" style="width: ${col.width}px">${col.label}</div>`
      )
      .join("");

    const bodyHtml = this.editor.tasks
      .map((task) => {
        const indent = (task.OutlineLevel - 1) * 15;
        const isSummary = task.Summary === "1" || task.Summary === 1;
        const weight = isSummary ? "bold" : "normal";

        return `
                <div class="grid-row" style="height: ${
                  this.editor.config.rowHeight
                }px; font-weight: ${weight}">
                    ${this.columns
                      .map(
                        (col) => `
                        <div class="grid-cell" 
                             style="width: ${col.width}px; padding-left: ${
                          col.id === "Name" ? indent + 5 : 5
                        }px"
                             contenteditable="${
                               col.editable ? "true" : "false"
                             }"
                             onblur="editor.grid.onCellEdit('${task.UID}', '${
                          col.id
                        }', this.innerText)"
                        >
                            ${this.formatValue(task[col.id], col.type)}
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
      })
      .join("");

    this.container.innerHTML = `
            <div class="grid-header" style="height: ${this.editor.config.headerHeight}px">
                ${headerHtml}
            </div>
            <div class="grid-body">
                ${bodyHtml}
            </div>
        `;
  }

  formatValue(value, type) {
    if (!value) return "";
    if (type === "date") {
      return new Date(value).toLocaleDateString();
    }
    return value;
  }

  onCellEdit(uid, field, value) {
    // Simple update logic
    this.editor.updateTask(uid, { [field]: value });
  }
}
