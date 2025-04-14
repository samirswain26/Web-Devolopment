// DOM Elements
const menuToggleBtn = document.getElementById('menuToggle');
const sidebarNav = document.getElementById('sidebarNav');
const refreshBtn = document.getElementById('refreshBtn');
const timeRangeSelect = document.getElementById('timeRange');
const incidentTypeFilter = document.getElementById('incidentTypeFilter');
const incidentTableBody = document.getElementById('incidentTableBody');
const vulnerableAssetsList = document.getElementById('vulnerableAssetsList');
const vulnerabilityItems = document.getElementById('vulnerabilityItems');

// Dummy data (in a real application, this would come from an API)
const dashboardStats = {
  activeThreats: 22,
  activeThreatsDelta: 10,
  openIncidents: 8, 
  openIncidentsDelta: 2,
  vulnerabilityCount: 31,
  vulnerabilityCountDelta: -3,
  averageCVSS: 8.7,
  criticalVulnerabilities: 7,
  highVulnerabilities: 12,
  mediumVulnerabilities: 5,
  lowVulnerabilities: 0,
  lastUpdated: new Date().toISOString()
};

const incidents = [
  {
    id: 1,
    incidentId: "INC-7523",
    name: "Suspicious Login Activity",
    description: "Multiple failed login attempts",
    icon: "lock",
    severity: "high",
    status: "investigating",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
  },
  {
    id: 2,
    incidentId: "INC-7522",
    name: "Malware Detection",
    description: "Trojan detected on workstation",
    icon: "bug_report",
    severity: "critical",
    status: "contained",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
  },
  {
    id: 3,
    incidentId: "INC-7521",
    name: "Phishing Attempt",
    description: "Targeted phishing campaign",
    icon: "email",
    severity: "medium",
    status: "resolved",
    timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString() // 23 hours ago
  },
  {
    id: 4,
    incidentId: "INC-7520",
    name: "Unauthorized Access",
    description: "Unauthorized access to file server",
    icon: "no_encryption",
    severity: "high",
    status: "investigating",
    timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // 25 hours ago
  },
  {
    id: 5,
    incidentId: "INC-7519",
    name: "DDoS Attack",
    description: "Distributed denial of service",
    icon: "cloud_off",
    severity: "high",
    status: "resolved",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() // 48 hours ago
  }
];

const vulnerableAssets = [
  {
    id: 1,
    name: "Database Server",
    identifier: "DB-01",
    icon: "storage",
    vulnerabilityCount: 5,
    severity: "critical",
    riskPercent: 85
  },
  {
    id: 2,
    name: "Web Application",
    identifier: "APP-03",
    icon: "web",
    vulnerabilityCount: 7,
    severity: "high",
    riskPercent: 65
  },
  {
    id: 3,
    name: "Email Gateway",
    identifier: "MAIL-01",
    icon: "mail",
    vulnerabilityCount: 3,
    severity: "medium",
    riskPercent: 40
  },
  {
    id: 4,
    name: "Active Directory",
    identifier: "AD-01",
    icon: "account_tree",
    vulnerabilityCount: 4,
    severity: "high",
    riskPercent: 60
  },
  {
    id: 5,
    name: "VPN Server",
    identifier: "VPN-02",
    icon: "vpn_lock",
    vulnerabilityCount: 2,
    severity: "low",
    riskPercent: 25
  }
];

const vulnerabilities = [
  {
    id: 1,
    cveId: "CVE-2023-1234",
    name: "OpenSSL Remote Code Execution",
    severity: "critical",
    cvssScore: 9.8,
    detectedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: 2,
    cveId: "CVE-2023-5678",
    name: "SQL Injection in Web Application",
    severity: "high",
    cvssScore: 8.5,
    detectedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: 3,
    cveId: "CVE-2023-1004",
    name: "OpenSSL Remote Code Execution",
    severity: "critical",
    cvssScore: 9.8,
    detectedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: 4,
    cveId: "CVE-2023-3456",
    name: "Server-Side Request Forgery",
    severity: "high",
    cvssScore: 7.6,
    detectedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  {
    id: 5,
    cveId: "CVE-2023-7890",
    name: "Privilege Escalation",
    severity: "critical",
    cvssScore: 9.2,
    detectedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  }
];

const threatActivity = [
  { day: "Mon", critical: 3, high: 5, medium: 8 },
  { day: "Tue", critical: 5, high: 7, medium: 10 },
  { day: "Wed", critical: 4, high: 6, medium: 9 },
  { day: "Thu", critical: 2, high: 4, medium: 7 },
  { day: "Fri", critical: 6, high: 8, medium: 11 },
  { day: "Sat", critical: 3, high: 5, medium: 8 },
  { day: "Sun", critical: 2, high: 3, medium: 6 }
];
// const threatActivity = [
//   { day: "Mon", critical: 3, medium: 5, high: 8 },
//   { day: "Tue", critical: 5, medium: 7, high: 10 },
//   { day: "Wed", critical: 4, medium: 6, high: 9 },
//   { day: "Thu", critical: 2, medium: 4, high: 7 },
//   { day: "Fri", critical: 6, medium: 8, high: 11 },
//   { day: "Sat", critical: 3, medium: 5, high: 8 },
//   { day: "Sun", critical: 2, medium: 3, high: 6 }
// ];

const threatTypes = [
  { type: "Malware", percentage: 35, color: "#EF4444" },
  { type: "Phishing", percentage: 25, color: "#F97316" },
  { type: "DDoS", percentage: 15, color: "#FACC15" },
  { type: "Data Breach", percentage: 15, color: "#3B82F6" },
  { type: "Insider Threat", percentage: 10, color: "#8B5CF6" }
];

// Helper Functions
function formatRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now - date;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return "Just now";
  } else if (diffInHours < 24) {
    const hours = Math.floor(diffInHours);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const days = Math.floor(diffInHours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
}

function getSeverityClass(severity) {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'severity-critical';
    case 'high':
      return 'severity-high';
    case 'medium':
      return 'severity-medium';
    case 'low':
      return 'severity-low';
    default:
      return '';
  }
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'investigating':
      return 'status-investigating';
    case 'contained':
      return 'status-contained';
    case 'resolved':
      return 'status-resolved';
    default:
      return '';
  }
}

function getSeverityColorClasses(severity) {
  switch (severity.toLowerCase()) {
    case 'critical':
      return {
        text: 'text-[#EF4444]',
        bg: 'threat-icon', // reuses the threat-icon class
        badge: 'severity-critical'
      };
    case 'high':
      return {
        text: 'text-[#F97316]',
        bg: 'incident-icon', // reuses the incident-icon class
        badge: 'severity-high'
      };
    case 'medium':
      return {
        text: 'text-[#FACC15]',
        bg: 'vulnerability-icon', // reuses the vulnerability-icon class
        badge: 'severity-medium'
      };
    case 'low':
      return {
        text: 'text-[#34D399]',
        bg: 'cvss-icon', // just for styling consistency
        badge: 'severity-low'
      };
    default:
      return {
        text: '',
        bg: '',
        badge: ''
      };
  }
}

// Initialize Dashboard Data
function initializeDashboard() {
  // Update stats
  document.getElementById('activeThreats').textContent = dashboardStats.activeThreats;
  document.getElementById('openIncidents').textContent = dashboardStats.openIncidents;
  document.getElementById('vulnerabilityCount').textContent = dashboardStats.vulnerabilityCount;
  document.getElementById('averageCVSS').textContent = dashboardStats.averageCVSS.toFixed(1);
  document.getElementById('lastUpdated').textContent = new Date(dashboardStats.lastUpdated).toLocaleString();
  
  // Render incidents table
  renderIncidentsTable();
  
  // Render vulnerable assets
  renderVulnerableAssets();
  
  // Render vulnerabilities
  renderVulnerabilities();
  
  // Initialize charts
  initializeThreatActivityChart();
  initializeThreatTypesChart();
}

// Render Incidents Table
function renderIncidentsTable() {
  incidentTableBody.innerHTML = '';
  
  incidents.forEach(incident => {
    const tr = document.createElement('tr');
    
    const idTd = document.createElement('td');
    idTd.textContent = incident.incidentId;
    idTd.style.fontFamily = 'monospace';
    
    const incidentTd = document.createElement('td');
    incidentTd.innerHTML = `
      <div class="incident-description">
        <span class="material-icons incident-icon ${getSeverityClass(incident.severity)}">
          ${incident.icon}
        </span>
        <div class="incident-details">
          <span class="incident-name">${incident.name}</span>
          <span class="incident-desc">${incident.description}</span>
        </div>
      </div>
    `;
    
    const severityTd = document.createElement('td');
    const severitySpan = document.createElement('span');
    severitySpan.className = `severity-badge ${getSeverityClass(incident.severity)}`;
    severitySpan.textContent = incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1);
    severityTd.appendChild(severitySpan);
    
    const statusTd = document.createElement('td');
    const statusSpan = document.createElement('span');
    statusSpan.className = `status-badge ${getStatusClass(incident.status)}`;
    statusSpan.textContent = incident.status.charAt(0).toUpperCase() + incident.status.slice(1);
    statusTd.appendChild(statusSpan);
    
    const timeTd = document.createElement('td');
    timeTd.className = 'incident-time';
    timeTd.textContent = formatRelativeTime(incident.timestamp);
    
    tr.appendChild(idTd);
    tr.appendChild(incidentTd);
    tr.appendChild(severityTd);
    tr.appendChild(statusTd);
    tr.appendChild(timeTd);
    
    incidentTableBody.appendChild(tr);
  });
}

// Render Vulnerable Assets
function renderVulnerableAssets() {
  vulnerableAssetsList.innerHTML = '';
  
  vulnerableAssets.forEach(asset => {
    const colors = getSeverityColorClasses(asset.severity);
    
    const assetDiv = document.createElement('div');
    assetDiv.className = 'vulnerable-asset';
    
    assetDiv.innerHTML = `
      <div class="asset-icon ${colors.bg}">
        <span class="material-icons">${asset.icon}</span>
      </div>
      <div class="asset-details">
        <div class="asset-header">
          <span>${asset.name} (${asset.identifier})</span>
          <span class="asset-vuln-count ${colors.text}">${asset.vulnerabilityCount} vulns</span>
        </div>
        <div class="asset-risk-bar">
          <div class="${colors.text.replace('text', 'bg')}" style="width: ${asset.riskPercent}%; height: 100%;"></div>
        </div>
      </div>
    `;
    
    vulnerableAssetsList.appendChild(assetDiv);
  });
}

// Render Vulnerabilities
function renderVulnerabilities() {
  vulnerabilityItems.innerHTML = '';
  
  vulnerabilities.forEach(vuln => {
    const colors = getSeverityColorClasses(vuln.severity);
    
    const vulnDiv = document.createElement('div');
    vulnDiv.className = 'vulnerability-item';
    
    vulnDiv.innerHTML = `
      <div class="vuln-header">
        <span class="cve-id">${vuln.cveId}</span>
        <span class="severity-badge ${colors.badge}">${vuln.severity.charAt(0).toUpperCase() + vuln.severity.slice(1)}</span>
      </div>
      <div class="vuln-name">${vuln.name}</div>
      <div class="vuln-footer">
        <span>CVSS: ${vuln.cvssScore.toFixed(1)}</span>
        <span>Detected ${formatRelativeTime(vuln.detectedAt)}</span>
      </div>
    `;
    
    vulnerabilityItems.appendChild(vulnDiv);
  });
}

// Initialize Threat Activity Chart
function initializeThreatActivityChart() {
  const ctx = document.getElementById('threatActivityChart');
  
  // Labels for x-axis
  const labels = threatActivity.map(item => item.day);
  
  // Data for each severity level
  const criticalData = threatActivity.map(item => item.critical);
  const highData = threatActivity.map(item => item.high);
  const mediumData = threatActivity.map(item => item.medium);
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Critical',
          data: criticalData,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'High',
          data: highData,
          borderColor: '#F97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Medium',
          data: mediumData,
          borderColor: '#FACC15',
          backgroundColor: 'rgba(250, 204, 21, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#F1F5F9'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#94A3B8'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#94A3B8'
          }
        }
      }
    }
  });
}

// Initialize Threat Types Chart
function initializeThreatTypesChart() {
  const ctx = document.getElementById('threatTypesChart');
  
  // Data for the pie chart
  const labels = threatTypes.map(item => item.type);
  const data = threatTypes.map(item => item.percentage);
  const colors = threatTypes.map(item => item.color);
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#F1F5F9',
            padding: 15
          }
        }
      },
      cutout: '65%'
    }
  });
}

// Event Listeners
menuToggleBtn.addEventListener('click', () => {
  sidebarNav.classList.toggle('active');
});

refreshBtn.addEventListener('click', () => {
  // In a real app, this would fetch fresh data from the server
  alert('Refreshing dashboard data...');
  initializeDashboard();
});

timeRangeSelect.addEventListener('change', () => {
  // In a real app, this would update the data based on selected time range
  alert(`Time range changed to: ${timeRangeSelect.value}`);
});

incidentTypeFilter.addEventListener('change', () => {
  // In a real app, this would filter incidents by type
  alert(`Filtering incidents by: ${incidentTypeFilter.value}`);
});

// Initialize the dashboard on page load
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Handle time buttons in Threat Activity Chart
document.querySelectorAll('.time-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // In a real app, this would update the chart data based on selected time period
    alert(`Changed time range to: ${btn.textContent}`);
  });
});
