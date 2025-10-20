export const projects = [
  {
    key: "ws-upgrade",
    title: "Windows Server Upgrades (2012/2016/2019 → 2022)",
    rate: "$65/hr",
    tier: "Standard",
    blurb: "Upgrade paths with pre-checks, backups, rollback, and validation.",
    details: [
      "Pre-upgrade health checks",
      "In-place or side-by-side",
      "Rollback plan",
      "Validation & handover"
    ]
  },
  {
    key: "fsmo",
    title: "Domain Upgrades & FSMO Role Migrations",
    rate: "$65/hr",
    tier: "Standard",
    blurb: "Promote new DCs, transfer FSMO roles, decommission legacy.",
    details: [
      "New DC build",
      "FSMO transfer",
      "SYSVOL/DFSR checks",
      "Decommission legacy DCs"
    ]
  },
  {
    key: "ad-health",
    title: "Active Directory Repair & Health Checks",
    rate: "$65/hr",
    tier: "Standard",
    blurb: "Fix replication, DNS, stale objects; before/after evidence.",
    details: [
      "repadmin/dcdiag",
      "DNS cleanup",
      "GPO baseline",
      "Object hygiene"
    ]
  },
  {
    key: "hyperv",
    title: "Hyper-V Virtualization Implementation",
    rate: "$80/hr",
    tier: "Advanced",
    blurb: "Hosts, virtual switches, VMs, backups, optional clustering.",
    details: [
      "Host install",
      "vSwitch/VLANs",
      "VM builds",
      "Cluster/Replica (opt)"
    ]
  },
  {
    key: "vmware",
    title: "VMware ESXi Implementation",
    rate: "$80/hr",
    tier: "Advanced",
    blurb: "ESXi, networking, storage, VMs; optional vCenter/HA/DRS.",
    details: [
      "ESXi install",
      "vSwitch/VLANs",
      "Datastores",
      "vCenter/HA (opt)"
    ]
  },
  {
    key: "migrate",
    title: "VMware ↔ Hyper-V Migration",
    rate: "$80/hr",
    tier: "Advanced",
    blurb: "Cross-hypervisor migration with tests, rollback, documentation.",
    details: [
      "Discovery & plan",
      "Test run",
      "Cutover",
      "Rollback & evidence"
    ]
  },
  {
    key: "rds",
    title: "Remote Desktop Services (RDS) Setup",
    rate: "$80/hr",
    tier: "Advanced",
    blurb: "Broker, Hosts, Gateway/SSL, collections, policies.",
    details: [
      "Roles deploy",
      "Gateway + SSL",
      "Collections",
      "GPO hardening"
    ]
  },
  {
    key: "avd",
    title: "Azure Virtual Desktop (AVD)",
    rate: "$95/hr",
    tier: "Premium",
    blurb: "Host pools, FSLogix, Conditional Access, autoscale, monitoring.",
    details: [
      "Host pools",
      "FSLogix",
      "CA + MFA",
      "Autoscale & monitor"
    ]
  },
  {
    key: "m365",
    title: "Microsoft 365 Security Hardening",
    rate: "$95/hr",
    tier: "Premium",
    blurb: "MFA, Conditional Access, mail hygiene, sharing controls, audit.",
    details: [
      "MFA + CA",
      "Mail hygiene",
      "Sharing controls",
      "Audit & alerts"
    ]
  },
  {
    key: "rmm",
    title: "RMM Onboarding & Optimization",
    rate: "$80/hr",
    tier: "Advanced",
    blurb: "Agent rollout, policy baselines, alert tuning, reporting.",
    details: [
      "Agent rollout",
      "Policies",
      "Alert tuning",
      "Reports & runbooks"
    ]
  },
  {
    key: "patch",
    title: "Patch Compliance Audit & Reporting",
    rate: "Fixed $800",
    tier: "Audit",
    blurb: "OS + 3rd-party patch status, gaps, remediation roadmap.",
    details: [
      "Compliance scan",
      "Gap analysis",
      "Exec report",
      "Remediation plan"
    ]
  },
  {
    key: "bdr",
    title: "Backup & DR Validation",
    rate: "Fixed $1,000",
    tier: "Audit",
    blurb: "Test restores; RPO/RTO review; evidence.",
    details: [
      "Test restores",
      "RPO/RTO review",
      "Evidence pack",
      "Recommendations"
    ]
  },
  {
    key: "adcheck",
    title: "AD Health Check (Focused)",
    rate: "Fixed $650",
    tier: "Audit",
    blurb: "Single-domain assessment with concise risk report.",
    details: [
      "dcdiag/repadmin",
      "DNS review",
      "GPO review",
      "Risk report"
    ]
  }
];
