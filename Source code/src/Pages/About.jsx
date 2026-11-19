import React from "react";
import heroImg from "../../public/images/tech/about.jpeg";

export default function AboutUs() {
  const team = [
    { name: "Fatima Aftab", bio: "Visionary leader with a passion for empowering students and professionals in their career journeys." },
    { name: "Zayaan Ahmeed", bio: "Tech enthusiast driving innovation and building scalable platforms for guidance." },
    { name: "Asra Asif", bio: "Crafting meaningful resources and stories that inspire growth." },
    { name: "Insiya Kanwal",bio: "Designing intuitive and delightful experiences for users." },
    { name: "Abdullah Bilal", bio: "Building strong connections and guiding users through their career path." },
  ];

  // Colors
  const colors = {
    dark1: "rgb(9, 38, 53)",
    dark2: "rgb(27, 66, 66)",
    mid: "rgb(92, 131, 116)",
    light: "rgb(158, 200, 185)",
    white: "#ffffff",
  };

  return (
    <section style={{ background: colors.white, color: colors.dark1 }}>
      {/* Hero Section */}
    
      <div
        style={{
          position: "relative",
          height: "60vh",
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(9,38,53,0.65)",
          }}
        ></div>
        <div style={{ position: "relative", color: colors.white, zIndex: 1 }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: "700", marginBottom: "0.5rem" }}>
            About Career Passport
          </h1>
          <p style={{ fontSize: "1.2rem", color: colors.light }}>
            Guiding you every step of the way to achieve your dreams.
          </p>
        </div>
      </div>

      {/* Intro & Mission */}
      <div style={{ padding: "60px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "50px", textAlign: "center" }}>
          <h3 style={{ fontWeight: "700", marginBottom: "15px", color: colors.dark1 }}>
            Our Mission
          </h3>
          <p style={{ maxWidth: "700px", margin: "0 auto", lineHeight: "1.6", color: colors.dark2 }}>
            We believe every individual deserves the right tools and support to
            achieve their ambitions. Whether you’re exploring, planning, or
            advancing in your career, Career Passport is your trusted companion
            to navigate the path to success.
          </p>
        </div>

        {/* Video Section */}
        <div style={{ marginBottom: "50px", textAlign: "center" }}>
          <h3 style={{ fontWeight: "700", marginBottom: "15px", color: colors.dark1 }}>
            Our Story
          </h3>
          <p>
            Founded with a passion for empowering the next generation, our platform is designed for students, graduates, and freshers. We aim to bridge the gap between education and the professional world by providing resources, guidance, and inspiration. Whether you're navigating the academic landscape, stepping into the professional realm, or just starting out, we're here to support your journey every step of the way. Career Passport was created to simplify the often overwhelming process of choosing a career. We saw how many students and professionals struggled with uncertainty, pressure, and lack of guidance, and we wanted to change that. Inspired by the idea of a passport opening doors to new opportunities, we built a platform that helps individuals discover their strengths, explore career paths, and gain the confidence to shape their future with clarity and purpose.
          </p>
        </div>

        {/* Team Section */}
        <div>
          <h3 style={{ fontWeight: "700", textAlign: "center", marginBottom: "30px", color: colors.dark1 }}>
            Meet Our Team
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {team.map((member, index) => (
              <div
                key={index}
                style={{
                  background: colors.white,
                  border: `1px solid ${colors.light}`,
                  borderRadius: "12px",
                  textAlign: "center",
                  padding: "20px",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: colors.mid,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    color: colors.white,
                    fontWeight: "bold",
                    margin: "0 auto 15px",
                  }}
                >
                  {member.name.charAt(0)}
                </div>
                <h5 style={{ fontSize: "1.1rem", fontWeight: "600", color: colors.dark1 }}>
                  {member.name}
                </h5>
                <p style={{ fontSize: "0.9rem", color: colors.mid, marginBottom: "8px" }}>
                  {member.role}
                </p>
                <p style={{ fontSize: "0.85rem", color: colors.dark2, lineHeight: "1.4" }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
