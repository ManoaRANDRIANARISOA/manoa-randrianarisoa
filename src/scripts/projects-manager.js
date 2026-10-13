// ==============================================================================
// PROJECTS GALLERY CONTROLLER (FILTERS & RENDERING)
// ==============================================================================
import { PROJECTS_DATA } from './projects-data.js';
import { sound } from './audio-engine.js';

export function initProjectsManager() {
  const container = document.getElementById('projects-grid-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!container) return;

  let currentFilter = 'all';

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    container.innerHTML = filtered.map(project => `
      <article class="project-card ${project.featured ? 'featured' : ''}" data-id="${project.id}">
        <div>
          <div class="project-header-row">
            <div class="project-title-wrap">
              <span class="project-type-chip">${project.type}</span>
              <h3 class="project-title">${project.title}</h3>
            </div>
            <span class="project-status-badge">
              <span class="status-dot"></span>
              ${project.status}
            </span>
          </div>

          <p class="project-summary">${project.summary}</p>

          <ul class="arch-points-list">
            ${project.architecturePoints.map(point => `<li>${point}</li>`).join('')}
          </ul>
        </div>

        <div>
          <div class="project-stack-wrap">
            ${project.stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>

          <div class="project-footer-row">
            <div class="metric-callout">
              <span>${project.metrics}</span>
            </div>

            <div class="project-actions">
              ${project.githubUrl ? `
                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="action-link" title="Consulter le code source sur GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span>Code GitHub</span>
                </a>
              ` : ''}

              ${project.secondaryGithub ? `
                <a href="${project.secondaryGithub}" target="_blank" rel="noopener noreferrer" class="action-link" title="Repository LMS lié">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span>LMS Repo</span>
                </a>
              ` : ''}

              ${project.liveUrl ? `
                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="action-link primary" title="Visiter le site en ligne">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  <span>Site Live</span>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Filter click events
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      sound.playClick();
      renderProjects(currentFilter);
    });
  });

  renderProjects('all');
}
