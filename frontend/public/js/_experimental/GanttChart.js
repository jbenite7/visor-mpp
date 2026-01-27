/**
 * GanttChart.js
 * SVG-based Gantt Chart visualization.
 */
class GanttChart {
  constructor(containerId, editor) {
    this.container = document.getElementById(containerId);
    this.editor = editor;
    this.render();
  }

  render() {
    const config = this.editor.config;
    const tasks = this.editor.tasks;

    // Calculate total width based on date range
    // Simplified: just enough for now
    const totalDays = 60; // Dynamic later
    const totalWidth = totalDays * config.columnWidth;
    const totalHeight = tasks.length * config.rowHeight + config.headerHeight;

    // SVG NS
    const svgNS = "http://www.w3.org/2000/svg";

    // Create SVG
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", totalWidth);
    svg.setAttribute("height", totalHeight);
    svg.style.overflow = "visible";

    // Draw Timeline Header
    this.drawHeader(svg);

    // Draw Rows (Background)
    tasks.forEach((task, index) => {
      const y = config.headerHeight + index * config.rowHeight;

      // Row Line
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", 0);
      line.setAttribute("y1", y + config.rowHeight);
      line.setAttribute("x2", totalWidth);
      line.setAttribute("y2", y + config.rowHeight);
      line.setAttribute("stroke", "#e5e7eb");
      svg.appendChild(line);

      if (task.Start && task.Finish) {
        this.drawTaskBar(svg, task, index, config);
      }
    });

    this.container.innerHTML = "";
    this.container.appendChild(svg);
  }

  drawHeader(svg) {
    // Placeholder for timeline header
    // Needs to loop through dates from config.startDate
  }

  drawTaskBar(svg, task, index, config) {
    const svgNS = "http://www.w3.org/2000/svg";
    const startDate = new Date(task.Start);
    const finishDate = new Date(task.Finish);
    const projectStart = config.startDate;

    // Calculate X position
    const diffDays = (startDate - projectStart) / (1000 * 60 * 60 * 24);
    const durationDays = (finishDate - startDate) / (1000 * 60 * 60 * 24);

    const x = diffDays * config.columnWidth;
    const width = Math.max(durationDays * config.columnWidth, 2); // Min 2px
    const y = config.headerHeight + index * config.rowHeight + 6; // Padding
    const height = config.rowHeight - 12;

    const rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("rx", 4);
    rect.setAttribute(
      "class",
      task.Summary === "1" ? "gantt-bar summary" : "gantt-bar task"
    );

    // Color styling via class or direct fill
    rect.setAttribute("fill", task.Summary === "1" ? "#333" : "#3b82f6");

    // Tooltip title
    const title = document.createElementNS(svgNS, "title");
    title.textContent = `${task.Name} \n${task.Start} - ${task.Finish}`;
    rect.appendChild(title);

    svg.appendChild(rect);
  }
}
