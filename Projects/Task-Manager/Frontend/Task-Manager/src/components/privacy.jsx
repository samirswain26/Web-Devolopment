import { useNavigate } from "react-router";
import { useState } from "react";

const PrivacyPolicy = () => {
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

      <div
        className="privacy-policy"
        style={styles.herosSection}
        // style={{ padding: "2rem", lineHeight: "1.7", color: "black" }}
      >
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          Privacy Policy
        </h1>

        <p>
          Privacy is important to Taskyst and the teams, professionals, and
          users we serve. Taskyst is committed to complying with both legal
          obligations and best practices in handling, storing, and using your
          private or proprietary information.
        </p>

        <h2>Content, Licenses & Permissions</h2>
        <p>
          All software, designs, materials, data, communications, and other
          content generated or shared via Taskyst is categorized as either
          “Taskyst Content” (provided by us) or “User Content” (provided by you
          or your organization). All rights remain with the content creators and
          providers.
        </p>

        <p>
          By uploading or sharing content, you represent that you have the
          necessary rights and permissions. Taskyst disclaims liability for the
          use or misuse of such content. You may report any content violations
          to <a href="mailto:support@taskyst.com">support@taskyst.com</a>.
        </p>

        <h2>Usage Rights</h2>
        <p>
          Taskyst grants registered users a limited, non-transferable license to
          access their project or task content through our platform for personal
          or team productivity. You may not redistribute, resell, or license
          content without explicit permission.
        </p>

        <h2>Content Security</h2>
        <ul>
          <li>
            Access to paid or team-restricted content is limited to authorized
            users only.
          </li>
          <li>
            All data is stored on secure servers and encrypted with
            industry-standard technologies like SSL and HTTPS.
          </li>
          <li>By default, user sessions are limited to two active devices.</li>
          <li>
            Admins can configure permissions and data privacy settings for their
            team or organization.
          </li>
        </ul>

        <h2>Data Retention Policy</h2>
        <p>We retain user data based on the following criteria:</p>
        <ul>
          <li>Length of user engagement with the platform</li>
          <li>Account activity or deletion requests</li>
          <li>Legal requirements and audit needs</li>
          <li>Internal legal and compliance considerations</li>
        </ul>

        <h2>Information Collection</h2>
        <p>
          When you register with Taskyst, we collect personal and technical data
          (name, email, usage behavior, IP, device info, etc.) to improve your
          experience and platform functionality. Aggregated data is analyzed for
          system performance, usage insights, and feature development.
        </p>

        <h2>Use of Information</h2>
        <ul>
          <li>
            We do not sell or rent your personal information. Data is shared
            only with trusted service providers under strict confidentiality
            agreements.
          </li>
          <li>
            Forums and team discussions may expose your content to others, so
            please exercise caution when sharing sensitive data.
          </li>
          <li>
            We may disclose information when legally required or when necessary
            to protect Taskyst, its users, or the public.
          </li>
        </ul>

        <h2>Third-Party Links</h2>
        <p>
          Taskyst may link to external tools or platforms (e.g., GitHub, Google
          Drive). Their privacy practices are not governed by this policy.
        </p>

        <h2>Opt-Out & User Control</h2>
        <p>
          Users can unsubscribe from promotional emails or request data
          access/removal by contacting{" "}
          <a href="mailto:support@taskyst.com">support@taskyst.com</a>.
          Team-level admins manage user permissions within their own
          organization spaces.
        </p>

        <h2>Security Practices</h2>
        <p>
          All user data is stored in secure environments with strict access
          control. We use multi-layered security, including token-based
          authentication, HTTPS, data encryption, and more.
        </p>

        <h2>Contact Us</h2>
        <p>
          <strong>Taskyst Technologies Pvt Ltd</strong>
          <br />
          #202, India, India,
          <br />
          India - 132456
          <br />
          Phone: +91 1234567980
          <br />
          Email: <a href="mailto:support@taskyst.com">support@taskyst.com</a>
        </p>
      </div>
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
                href="https://github.com/your-github"
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
};

export default PrivacyPolicy;

const getStyles = (isDark) => ({
  container: {
    minHeight: "100vh",
    backgroundColor: isDark ? "#111827" : "#f9fafb",
    color: "#f9fafb",
    margin: 0,
    padding: 0,
    transition: "all 0.3s ease-in-out",
  },
  herosSection: {
    backgroundColor: isDark ? "#111827" : "#f9fafb",
    color: isDark ? "#f9fafb" : "#111827",
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
    // padding: "5px 10px",
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
