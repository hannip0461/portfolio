import { onMounted, onUnmounted, shallowRef } from 'vue'
import type { FeaturedProject } from '../data/portfolioContent'

export function usePortfolioProjectModal(projects: FeaturedProject[]) {
  const selectedProject = shallowRef<FeaturedProject | null>(null)

  const selectFromUrl = () => {
    const projectId = new URL(window.location.href).searchParams.get('project')
    selectedProject.value = projects.find((project) => project.id === projectId) ?? null
  }

  const updateUrl = (projectId: string | null, method: 'pushState' | 'replaceState') => {
    const url = new URL(window.location.href)
    if (projectId) url.searchParams.set('project', projectId)
    else url.searchParams.delete('project')
    window.history[method]({}, '', url)
  }

  const openProject = (project: FeaturedProject) => {
    selectedProject.value = project
    updateUrl(project.id, 'pushState')
  }

  const closeProject = () => {
    selectedProject.value = null
    updateUrl(null, 'replaceState')
  }

  onMounted(() => {
    selectFromUrl()
    window.addEventListener('popstate', selectFromUrl)
  })

  onUnmounted(() => window.removeEventListener('popstate', selectFromUrl))

  return { selectedProject, openProject, closeProject }
}
