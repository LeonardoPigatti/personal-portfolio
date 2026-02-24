// Antes: import { projects } from '@/data/projects.js'
// Depois:
import { useLang } from '@/useLang'

const { t } = useLang()
const projects = t().projects