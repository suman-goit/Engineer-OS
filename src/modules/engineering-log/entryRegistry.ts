import type { CaseStudy } from "./types";
import { engineerOsShell } from "./entries/engineer-os-shell";
import { algorithmsLabEngine } from "./entries/algorithms-lab-engine";

/**
 * New case studies are added by creating a file in `entries/` and
 * appending it here. The EngineeringLogPage renders purely from this
 * list, so no existing code needs to change.
 */
export const entryRegistry: CaseStudy[] = [engineerOsShell, algorithmsLabEngine];
