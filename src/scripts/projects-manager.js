// ==============================================================================
// PROJECTS GALLERY CONTROLLER (FILTERS & RENDERING)
// ==============================================================================
import { PROJECTS_DATA } from './projects-data.js';
import { sound } from './audio-engine.js';
import { getLang, onLangChange, t } from './i18n.js';

const GITHUB_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`;
const EXTERNAL_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
const LOCK_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

export function initProjectsManager() {
  const container = document.getElementById('projects-grid-container');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const liveRegion = document.getElementById('projects-live');
  if (!container) return;

  let currentFilter = 'all';

  function localize(project) {
    if (getLang() === 'en' && project.en) {
      return { ...project, ...project.en };
    }
    return project;
  }

  function actionLink(href, label, title, icon, primary = false) {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="action-link${primary ? ' primary' : ''}" title="${title}">${icon}<span>${label}</span></a>`;
  }

  function renderActions(project) {
    const links = [];
    if (project.githubUrl) {
      links.push(actionLink(project.githubUrl, t('common.codeGithub'), t('common.githubTitle'), GITHUB_ICON));
    }
    if (project.secondaryGithub) {
      links.push(actionLink(project.secondaryGithub, t('common.lmsRepo'), t('common.lmsTitle'), GITHUB_ICON));
    }
    if (project.liveUrl) {
      links.push(actionLink(project.liveUrl, t('common.siteLive'), t('common.liveTitle'), EXTERNAL_ICON, true));
    }
    return links.join('');
  }

  function renderProjectCard(project, index, total) {
    const no = String(index + 1).padStart(2, '0');
    return `
      <article class="project-card${project.featured ? ' featured' : ''}" data-id="${project.id}" style="--i:${index % 4}">
        <div class="project-card-top">
          <span class="project-index">PRJ.${no} <span class="index-total">/ ${String(total).padStart(2, '0')}</span></span>
          <span class="project-status-badge${project.scoped ? ' is-scoped' : ''}">
            <span class="status-dot"></span>${project.status}
          </span>
        </div>

        <div class="project-header-row">
          <span class="project-type-chip">${project.type}</span>
          <h3 class="project-title">${project.title}</h3>
        </div>

        <span class="project-role">${t('common.role')} — ${project.role}</span>

        <p class="project-summary">${project.summary}</p>

        <p class="plain-line project-plain">
          <span class="plain-label">${t('common.plainLabel')}</span>
          <span>${project.plain}</span>
        </p>

        <ul class="arch-points-list">
          ${project.architecturePoints.map((point) => `<li>${point}</li>`).join('')}
        </ul>

        <div class="project-stack-wrap">
          ${project.stack.map((tech) => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>

        <div class="project-footer-row">
          <div class="metric-callout"><span>${project.metrics}</span></div>
          <div class="project-actions">${renderActions(project)}</div>
        </div>

        ${project.privacy ? `<p class="project-privacy-note">${LOCK_ICON}<span>${project.privacy}</span></p>` : ''}
      </article>
    `;
  }

  function select(filter = 'all') {
    const items = filter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === filter);

    container.innerHTML = items
      .map((project, i) => renderProjectCard(localize(project), i, items.length))
      .join('');

    if (liveRegion) {
      liveRegion.textContent = `${items.length} ${t('projects.filterCount')} ${PROJECTS_DATA.length}`;
    }
  }

  filterButtons.forEach((btn) => {
    const filter = btn.getAttribute('data-filter');
    const badge = btn.querySelector('.count-badge');
    if (badge) {
      badge.textContent = String(
        filter === 'all'
          ? PROJECTS_DATA.length
          : PROJECTS_DATA.filter((p) => p.category === filter).length
      );
    }

    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      currentFilter = filter;
      sound.playClick();
      select(currentFilter);
    });
  });

  onLangChange(() => select(currentFilter));

  select('all');
}
