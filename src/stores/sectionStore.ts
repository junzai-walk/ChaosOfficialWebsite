import { defineStore } from 'pinia'

export const useSectionStore = defineStore('section', {
  state: () => ({
    currentSection: 0
  }),
  actions: {
    setCurrentSection(section: number) {
      this.currentSection = section
    },
    resetSection() {
      this.currentSection = 0
    },
    nextSection(maxSection: number) {
      if (this.currentSection < maxSection) {
        this.currentSection++
      }
    },
    prevSection() {
      if (this.currentSection > 0) {
        this.currentSection--
      }
    }
  }
}) 