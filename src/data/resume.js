// Aggregates the resume content from focused data modules so existing
// imports (`resumeData`, `themes`, `commands`) keep working unchanged.
import { personal } from './personal'
import { skills } from './skills'
import { experience, totalExperience } from './experience'

export const resumeData = {
  personal,
  skills,
  experience,
  totalExperience,
}

export { themes } from './themes'
export { commands } from './commands'
