import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import CareerBank from "./Pages/CareerBank";
import Quiz from "./Pages/Quiz";
import Multimedia from "./Pages/Multimedia";
import Stories from "./Pages/Stories";
import Resources from "./Pages/Resources";
import Admission from "./Pages/Admission";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Footer from "./components/Footer";
import Startup from "./Pages/Startup";
import Swal from "sweetalert2";
import Feedback from "./Pages/Feedback";


function App() {
  const [page, setPage] = useState("home");
  const [breadcrumbs, setBreadcrumbs] = useState(["Home"]);
  const [data, setData] = useState({ careers: [], quiz: {}, multimedia: [], stories: [], resources: [] });
  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem("ns_bookmarks") || "[]"));
  const [recent, setRecent] = useState(JSON.parse(localStorage.getItem("ns_recent") || "[]"));
  const [visitors] = useState(Math.floor(Math.random() * 500) + 50);
  const [locationLabel, setLocationLabel] = useState("");
  const [visitorsCount, setvisitorsCount] = useState(0);

  const [user, setUser] = useState(null);

  // Load user and data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("ns_user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const fetchAll = async () => {
      try {
        const base = import.meta.env.BASE_URL;
        const [c, q, m, s, r] = await Promise.all([
          fetch(`${base}Data/careers.json`).then((res) => res.json()).catch(() => []),
          fetch(`${base}Data/quiz.json`).then((res) => res.json()).catch(() => ({})),
          fetch(`${base}Data/multimedia.json`).then((res) => res.json()).catch(() => []),
          fetch(`${base}Data/stories.json`).then((res) => res.json()).catch(() => []),
          fetch(`${base}Data/resources.json`).then((res) => res.json()).catch(() => []),
        ]);
        setData({ careers: c, quiz: q, multimedia: m, stories: s, resources: r });
      } catch (e) {
        console.error("Failed loading data", e);
      }
    };
    fetchAll();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocationLabel(`${pos.coords.latitude.toFixed(2)},${pos.coords.longitude.toFixed(2)}`),
        () => { }
      );
    }
  }, []);

  // Save bookmarks & recent in localStorage
  useEffect(() => {
    localStorage.setItem("ns_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);
  useEffect(() => {
    localStorage.setItem("ns_recent", JSON.stringify(recent));
  }, [recent]);

  // Navigation
  function navigateTo(target, label) {
    setPage(target);
    setBreadcrumbs(["Home", label]);
    setRecent((prev) => {
      const arr = [label, ...prev.filter((x) => x !== label)];
      return arr.slice(0, 6);
    });
  }

  // Toggle bookmarks
  function toggleBookmark(obj) {
    setBookmarks((prev) => {
      const exists = prev.find((x) => x.id === obj.id && x.type === obj.type);
      if (exists) return prev.filter((x) => !(x.id === obj.id && x.type === obj.type));
      return [{ ...obj, addedAt: new Date().toISOString() }, ...prev];
    });
  }
  useEffect(() => {
    let data = localStorage.getItem("Visitorcount")
    if (data) {
      setvisitorsCount(data)
    } else {
      setvisitorsCount(1)

    }
  }, [user, visitors, visitorsCount])

  // Export bookmarks
  function exportBookmarks() {
    if (!bookmarks.length) {
      Swal.fire({
        title: "No Bookmarks",
        text: "You haven’t added any bookmarks yet.",
        icon: "info",
        confirmButtonText: "OK"
      });
      return;
    }
    const text = bookmarks
      .map((b) => `- ${b.title} (${b.type})\n  Note: ${b.note || "-"}`)
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookmarks.txt";
    a.click();
    URL.revokeObjectURL(url);

    Swal.fire({
      title: "Exported!",
      text: "Your bookmarks have been saved as a file.",
      icon: "success",
      confirmButtonText: "Nice"
    });
  }
  // Startup callback
  function handleStartup(userData) {
    setUser(userData);
    localStorage.setItem("ns_user", JSON.stringify(userData));
    setPage("home");
    setBreadcrumbs(["Home"]);
    let countVisitors = localStorage.getItem("Visitorcount")
    if (countVisitors) {
      let parseData = Number(countVisitors)
      parseData++;
      localStorage.setItem("Visitorcount", parseData)
    } else {
      localStorage.setItem("Visitorcount", 1)
    }
  }

  // Logout
  // Logout with confirmation
  function handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of the app.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("ns_user");
        sessionStorage.removeItem("ns_username");
        setUser(null);
        setPage("home");
        setBreadcrumbs(["Home"]);

        Swal.fire("Logged out!", "You have been successfully logged out.", "success");
      }
    });
  }


  // Show startup if user not logged in
  if (!user) return <Startup onStart={handleStartup} />;

  // Filter data by userType
  const normType = (user.userType || "").toLowerCase().replace(/[^a-z]/g, "");
  const matchesUserType = (types) => {
    if (!types || !Array.isArray(types) || types.length === 0) return true;
    return types.some((t) => {
      const nt = t.toLowerCase().replace(/[^a-z]/g, "");
      return nt === normType || (normType === "ugpg" && (nt === "ug" || nt === "pg" || nt === "graduate"));
    });
  };

  const filteredQuiz = {};
  Object.keys(data.quiz).forEach((category) => {
    if (Array.isArray(data.quiz[category])) {
      filteredQuiz[category] = data.quiz[category].filter((q) => matchesUserType(q.userTypes));
    }
  });

  const filteredData = {
    careers: (data.careers || []).filter((c) => matchesUserType(c.userTypes)),
    quiz: filteredQuiz,
    multimedia: (data.multimedia || []).filter((m) => matchesUserType(m.userTypes)),
    stories: (data.stories || []).filter((s) => matchesUserType(s.userTypes)),
    resources: (data.resources || []).filter((r) => matchesUserType(r.userTypes)),
  };

  return (
    <div>
      <Header type={user.userType} username={user.username} locationLabel={locationLabel} visitorCount={visitorsCount} />

      <Navbar
        userType={user.userType}
        navigateTo={navigateTo}
        page={page}
        onLogout={handleLogout}
        username={user.username}
      />
      <main className="container my-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumbs">
            {breadcrumbs.map((b, i) => (
              <li key={i} className={`breadcrumb-item ${i === breadcrumbs.length - 1 ? "active" : ""}`}>
                {b}
              </li>
            ))}
          </ol>
        </nav>

        {page === "home" && (
          <Home
            data={filteredData}
            navigateTo={navigateTo}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            exportBookmarks={exportBookmarks}
            recent={recent}
          />
        )}
        {page === "career" && <CareerBank careers={filteredData.careers} navigateTo={navigateTo} toggleBookmark={toggleBookmark} bookmarks={bookmarks} />}
        {page === "quiz" && <Quiz userType={user.userType} quizData={data.quiz.questions} careers={filteredData.careers} />}
        {page === "multimedia" && <Multimedia multimedia={filteredData.multimedia} />}
        {page === "stories" && <Stories stories={filteredData.stories} />}
        {page === "resources" && <Resources resources={filteredData.resources} />}
        {page === "admission" && <Admission />}
        {page === "contact" && <Contact />}
        {page === "about" && <About />}
        {page === "feedback" && <Feedback />}
      </main>
      <Footer visitors={visitors} recent={recent} />
    </div>
  );
}

export default App;
