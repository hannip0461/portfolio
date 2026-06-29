<script setup lang="ts">
import { shallowRef } from 'vue'
import AdditionalWork from '../components/portfolio/AdditionalWork.vue'
import CapabilitySection from '../components/portfolio/CapabilitySection.vue'
import EducationSection from '../components/portfolio/EducationSection.vue'
import ExperienceTimeline from '../components/portfolio/ExperienceTimeline.vue'
import FeaturedProjects from '../components/portfolio/FeaturedProjects.vue'
import FloatingTopButton from '../components/portfolio/FloatingTopButton.vue'
import PortfolioFooter from '../components/portfolio/PortfolioFooter.vue'
import PortfolioHeader from '../components/portfolio/PortfolioHeader.vue'
import PortfolioHero from '../components/portfolio/PortfolioHero.vue'
import ProjectCaseStudyModal from '../components/portfolio/ProjectCaseStudyModal.vue'
import { usePortfolioScroll } from '../composables/usePortfolioScroll'
import {
  additionalProjects,
  capabilities,
  educationItems,
  experience,
  featuredProjects,
  type FeaturedProject,
} from '../data/portfolioContent'

const { scrollToTarget, scrollToTop } = usePortfolioScroll()
const selectedProject = shallowRef<FeaturedProject | null>(null)
</script>

<template>
  <div class="portfolio-page">
    <a class="skip-link" href="#main-content">본문으로 이동</a>

    <PortfolioHeader @navigate="scrollToTarget" />

    <main id="main-content">
      <PortfolioHero @navigate="scrollToTarget" />
      <FeaturedProjects :projects="featuredProjects" @open-project="selectedProject = $event" />
      <AdditionalWork :projects="additionalProjects" />
      <ExperienceTimeline :items="experience" />
      <CapabilitySection :groups="capabilities" />
      <EducationSection :items="educationItems" />
    </main>

    <PortfolioFooter @navigate="scrollToTarget" />

    <FloatingTopButton @top="scrollToTop" />

    <ProjectCaseStudyModal
      v-if="selectedProject"
      :project="selectedProject"
      @close="selectedProject = null"
    />
  </div>
</template>
