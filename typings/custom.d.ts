import Command from '../src/command'
import Team from '@models/Team'

declare module 'express' {
  interface Request {
      command?: Command
      team?: Team
  }
}