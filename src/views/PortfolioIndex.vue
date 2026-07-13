<script setup lang="ts">
import CapabilitySection from '../components/portfolio/CapabilitySection.vue'
import EducationSection from '../components/portfolio/EducationSection.vue'
import ExperienceTimeline from '../components/portfolio/ExperienceTimeline.vue'
import FeaturedProjects from '../components/portfolio/FeaturedProjects.vue'
import FloatingTopButton from '../components/portfolio/FloatingTopButton.vue'
import PortfolioFooter from '../components/portfolio/PortfolioFooter.vue'
import PortfolioHeader from '../components/portfolio/PortfolioHeader.vue'
import PortfolioHero from '../components/portfolio/PortfolioHero.vue'
import ProjectCaseStudyModal from '../components/portfolio/ProjectCaseStudyModal.vue'
import { usePortfolioProjectModal } from '../composables/usePortfolioProjectModal'
import { usePortfolioScroll } from '../composables/usePortfolioScroll'
import {
  capabilities,
  educationItems,
  experience,
  featuredProjects,
} from '../data/portfolioContent'

const { scrollToTarget, scrollToTop } = usePortfolioScroll()
const { selectedProject, openProject, closeProject } = usePortfolioProjectModal(featuredProjects)
</script>

<template>
  <div class="portfolio-page">
    <a class="skip-link" href="#main-content">본문으로 이동</a>

    <PortfolioHeader @navigate="scrollToTarget" />

    <main id="main-content">
      <PortfolioHero @navigate="scrollToTarget" />
      <FeaturedProjects :projects="featuredProjects" @open-project="openProject" />
      <ExperienceTimeline :items="experience" />
      <CapabilitySection :groups="capabilities" />
      <EducationSection :items="educationItems" />
    </main>

    <PortfolioFooter @navigate="scrollToTarget" />

    <FloatingTopButton @top="scrollToTop" />

    <ProjectCaseStudyModal
      v-if="selectedProject"
      :project="selectedProject"
      @close="closeProject"
    />
  </div>
</template>
