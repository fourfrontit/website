export const projects = [
  { key: "ws-upgrade", title: "Windows Server Upgrades", rate: "$65/hr", tier: "Standard", blurb: "Upgrade paths with pre-checks, backups, rollback, and validation.", details: ["Pre-upgrade health checks", "In-place or side-by-side", "Rollback plan", "Validation & handover"] },
  { key: "fsmo", title: "Domain Upgrades & FSMO Role Migrations", rate: "$65/hr", tier: "Standard", blurb: "Promote new DCs, transfer FSMO roles, decommission legacy.", details: ["New DC build", "FSMO transfer", "SYSVOL/DFSR checks", "Decommission legacy DCs"] },
  { key: "ad-health", title: "Active Directory Repair & Health Checks", rate: "$65/hr", tier: "Standard", blurb: "Fix replication, DNS, stale objects; before/after evidence.", details: ["repadmin/dcdiag", "DNS cleanup", "GPO baseline", "Object hygiene"] }
];
