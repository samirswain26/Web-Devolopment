import { useNavigate } from "react-router";
import { useState } from "react";

function Homepage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSignup = async () => {
    navigate("/Signup");
  };

  const handleLogin = async () => {
    navigate("/Login");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const styles = getStyles(isDarkMode);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.navFlex}>
            {/* Logo */}
            <div style={styles.logoContainer}>
              <div style={styles.logoIcon}>
                <span style={styles.logoIconText}>T</span>
              </div>
              <span style={styles.logoText}>TASKYST</span>
            </div>

            {/* Navigation Buttons */}
            <div style={styles.buttonContainer}>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                style={styles.darkModeToggle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = isDarkMode
                    ? "#4b5563"
                    : "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDarkMode
                    ? "#374151"
                    : "#f3f4f6";
                }}
              >
                {isDarkMode ? "☀️" : "🌙"}
                {isDarkMode ? " Light" : " Dark"}
              </button>

              <button
                onClick={handleSignup}
                style={styles.getStartedButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#059669";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#10b981";
                  e.target.style.transform = "scale(1)";
                }}
              >
                Get Started
              </button>
              <button
                onClick={handleLogin}
                style={styles.loginButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = isDarkMode
                    ? "#374151"
                    : "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={styles.main}>
        <div style={styles.heroSection}>
          <h1 style={styles.heading}>
            Organize Your Life with <br />
            <span style={{ color: "#10b981" }}>Smart Task Management</span>
          </h1>
          <p style={styles.subtitle}>
            Transform chaos into clarity. Track, prioritize, and accomplish your
            goals with Taskyst's intuitive task management system.
          </p>

          <div style={styles.ctaButtons}>
            <button
              style={styles.primaryCta}
              onClick={handleSignup}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#059669";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#10b981";
                e.target.style.transform = "translateY(0px)";
              }}
            >
              Start Free Today
            </button>

            <button
              style={styles.secondaryCta}
              onClick={() => setShowDemo(true)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = isDarkMode
                  ? "#374151"
                  : "#f9fafb";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.transform = "translateY(0px)";
              }}
            >
              Watch Demo
            </button>

            {showDemo && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "90%",
                    maxWidth: "800px",
                  }}
                >
                  <button
                    onClick={() => setShowDemo(false)}
                    style={{
                      position: "absolute",
                      top: "-40px",
                      right: "0",
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      cursor: "pointer",
                    }}
                  >
                    ✖ Close
                  </button>
                  <video
                    controls
                    autoPlay
                    style={{ width: "100%", borderRadius: "12px" }}
                  >
                    <source
                      src="/Pal Pal Dil Ke Paas _ Sanam.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div style={styles.statsSection}>
          <div style={styles.statsContainer}>
            <div style={styles.statsGrid}>
              <div>
                <span style={styles.statNumber}>10K+</span>
                <div style={styles.statLabel}>Tasks Completed</div>
              </div>
              <div>
                <span style={styles.statNumber}>98%</span>
                <div style={styles.statLabel}>User Satisfaction</div>
              </div>
              <div>
                <span style={styles.statNumber}>24/7</span>
                <div style={styles.statLabel}>Access Anywhere</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={styles.featuresSection}>
          <div style={styles.featuresContainer}>
            <h2 style={styles.sectionTitle}>Why Choose Taskyst?</h2>
            <div style={styles.featuresGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <span>📋</span>
                </div>
                <h3 style={styles.featureTitle}>Smart Organization</h3>
                <p style={styles.featureDescription}>
                  Automatically categorize and prioritize your tasks with
                  intelligent sorting and filtering options.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <span>⚡</span>
                </div>
                <h3 style={styles.featureTitle}>Lightning Fast</h3>
                <p style={styles.featureDescription}>
                  Add, edit, and complete tasks in seconds with our streamlined
                  interface and keyboard shortcuts.
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>
                  <span>📊</span>
                </div>
                <h3 style={styles.featureTitle}>Progress Tracking</h3>
                <p style={styles.featureDescription}>
                  Visualize your productivity with detailed analytics and
                  progress reports to stay motivated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerColBrand}>
            <h2 style={styles.brandName}>Taskyst</h2>
            <p style={styles.brandInfo}>
              Awesome startup address here, <br />
              India, India
            </p>
            <p style={styles.contact}>
              <strong>Email:</strong> task.yst@task.com <br />
              <strong>Call:</strong> +91 12345 67890
            </p>
            <div style={styles.socialIcons}>
              <a
                href="https://www.linkedin.com/in/your-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
              >
                🔗 LinkedIn
              </a>
              <a
                href="https://github.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
              >
                💻 GitHub
              </a>
            </div>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerColTitle}>Taskyst</h4>
            <ul style={styles.footerList}>
              <li>
                <a href="#" style={styles.footerLink}>
                  About
                </a>
              </li>
              <li>
                <a href="/Privacy-Policy" style={styles.footerLink}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p>&copy; 2025 Taskyst. All Rights Reserved.</p>
          <a href="#" style={styles.reportLink}>
            Report Abuse
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;

const getStyles = (isDark) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: isDark ? "#111827" : "#f9fafb",
    margin: 0,
    padding: 0,
    transition: "all 0.3s ease-in-out",
  },
  navbar: {
    backgroundColor: isDark ? "#1f2937" : "white",
    boxShadow: isDark
      ? "0 1px 3px 0 rgba(255, 255, 255, 0.1)"
      : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
  },
  footer: {
    backgroundColor: isDark ? "#1f2e42ff" : "#24272bff",
    boxShadow: isDark
      ? "0 1px 3px 0 rgba(255, 255, 255, 0.1)"
      : "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    borderBottom: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
  },

  footerTop: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: "1280px",
    margin: "0 auto",
    color: "#f3f4f6",
  },
  footerColBrand: {
    flex: "1 1 300px",
    marginBottom: "20px",
  },
  brandName: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#10b981",
  },
  brandInfo: {
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "12px",
    color: "#d1d5db",
  },
  contact: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#d1d5db",
  },
  socialIcons: {
    marginTop: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  socialLink: {
    color: "#10b981",
    fontSize: "14px",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  footerCol: {
    flex: "1 1 200px",
    marginBottom: "20px",
  },
  footerColTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#ffffff",
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  footerLink: {
    color: "#d1d5db",
    fontSize: "14px",
    textDecoration: "none",
    marginBottom: "8px",
    display: "inline-block",
  },
  footerBottom: {
    borderTop: "1px solid #374151",
    padding: "16px 20px",
    maxWidth: "1280px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    color: "#9ca3af",
    flexWrap: "wrap",
  },
  reportLink: {
    color: "#10b981",
    textDecoration: "none",
  },

  navContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  navFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: "#10b981",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "12px",
  },
  logoIconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: isDark ? "#f9fafb" : "#111827",
    letterSpacing: "0.025em",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  darkModeToggle: {
    backgroundColor: isDark ? "#374151" : "#f3f4f6",
    color: isDark ? "#f9fafb" : "#374151",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  getStartedButton: {
    backgroundColor: "#10b981",
    color: "white",
    padding: "8px 24px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    fontSize: "14px",
  },
  loginButton: {
    backgroundColor: "transparent",
    color: isDark ? "#d1d5db" : "#374151",
    padding: "8px 24px",
    borderRadius: "8px",
    border: isDark ? "1px solid #4b5563" : "1px solid #d1d5db",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    fontSize: "14px",
  },
  main: {
    flex: 1,
  },
  heroSection: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "80px 1rem 60px",
    textAlign: "center",
  },
  heading: {
    fontSize: "48px",
    fontWeight: "bold",
    color: isDark ? "#f9fafb" : "#111827",
    marginBottom: "24px",
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "24px",
    color: isDark ? "#9ca3af" : "#6b7280",
    marginBottom: "48px",
    maxWidth: "600px",
    margin: "0 auto 48px auto",
  },
  ctaButtons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "80px",
    flexWrap: "wrap",
  },
  primaryCta: {
    backgroundColor: "#10b981",
    color: "white",
    padding: "16px 32px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "600",
    fontSize: "18px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  secondaryCta: {
    backgroundColor: "transparent",
    color: isDark ? "#d1d5db" : "#374151",
    padding: "16px 32px",
    borderRadius: "12px",
    border: isDark ? "2px solid #4b5563" : "2px solid #d1d5db",
    fontWeight: "600",
    fontSize: "18px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  featuresSection: {
    backgroundColor: isDark ? "#1f2937" : "white",
    padding: "80px 0",
  },
  featuresContainer: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  sectionTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    color: isDark ? "#f9fafb" : "#111827",
    textAlign: "center",
    marginBottom: "60px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
  },
  featureCard: {
    textAlign: "center",
    padding: "30px 20px",
  },
  featureIcon: {
    width: "64px",
    height: "64px",
    backgroundColor: "#10b981",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px auto",
    fontSize: "24px",
  },
  featureTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: isDark ? "#f9fafb" : "#111827",
    marginBottom: "16px",
  },
  featureDescription: {
    fontSize: "16px",
    color: isDark ? "#9ca3af" : "#6b7280",
    lineHeight: "1.6",
  },
  statsSection: {
    padding: "60px 0",
  },
  statsContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#10b981",
    display: "block",
  },
  statLabel: {
    fontSize: "18px",
    color: isDark ? "#9ca3af" : "#6b7280",
    marginTop: "8px",
  },
});
