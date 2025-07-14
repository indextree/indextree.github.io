---
icon: fas fa-info-circle
order: 4
---

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

:root {
  --primary: #2c3e50;
  --accent: #1abc9c;
  --bg: #ecf0f1;
  --card-bg: #ffffff;
  --text: #34495e;
  --light: #bdc3c7;
  --radius: 10px;
  --gap: 1.5rem;
}
* {
  box-sizing: border-box;
  margin: 0; padding: 0;
  font-family: 'Roboto', sans-serif;
}
.container {
  max-width: 900px;
  margin: auto;
  padding: var(--gap);
  background: var(--bg);
}
header {
  text-align: center;
  margin-bottom: var(--gap);
}
header h1 {
  font-size: 2.5rem;
  color: var(--primary);
}
header p {
  color: var(--accent);
  margin-top: 0.25rem;
  font-weight: 500;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--gap);
  margin-bottom: var(--gap);
}
.card {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  padding: var(--gap);
  transition: transform .2s ease, box-shadow .2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}
.card h2 {
  font-size: 1.4rem;
  color: var(--accent);
  border-bottom: 3px solid var(--accent);
  display: inline-block;
  margin-bottom: 0.75rem;
  padding-bottom: 0.2rem;
}
.card ul {
  list-style: none;
  margin-top: 1rem;
}
.card ul li {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}
.card ul li:before {
  content: '•';
  position: absolute;
  left: 0; color: var(--accent);
}
.timeline {
  margin-bottom: var(--gap);
}
.timeline-item {
  margin-bottom: var(--gap);
  padding-left: 1rem;
  border-left: 3px solid var(--accent);
}
.timeline-item h3 {
  font-size: 1.2rem;
  color: var(--primary);
  margin-bottom: 0.2rem;
}
.timeline-item .date {
  font-size: 0.9rem;
  color: var(--light);
  margin-bottom: 0.4rem;
}
footer {
  text-align: center;
  color: var(--light);
  font-size: 0.9rem;
  margin-top: var(--gap);
}
</style>

<div class="container">
  <header>
    <h1>Cho Changmin</h1>
    <p><a href="mailto:brilliantepoch22@gmail.com">brilliantepoch22@gmail.com</a> • +82 10 5080 6605</p>
  </header>

  <div class="card">
    <h2>Career Objective</h2>
    <p>
      수학(대수학·대수적 위상수학)에 깊은 관심을 가지고 있으며, 암호학(Polynomial Commitment 리뷰) 및
      Folding Schemes(Nova, LatticeFold, Neo) 연구 경험이 풍부합니다. 또한 Coq·Lean 4 기반 Formal Verification에도
      흥미와 실무 경험이 있습니다.
    </p>
  </div>

  <section class="timeline">
    <h2>Work Experience</h2>
    <div class="timeline-item">
      <h3>Stellar Development Foundation – Grantee</h3>
      <div class="date">Jun 2025 – Nov 2025</div>
      <p>Stellar Soroban Verifier Track (NRG #4) 참여</p>
    </div>
    <div class="timeline-item">
      <h3>Nethermind – Intern</h3>
      <div class="date">Feb 2025 – May 2025</div>
      <p>Formal Verification 및 Folding Scheme 리서치</p>
    </div>
    <div class="timeline-item">
      <h3>Alpha273 – Development Team</h3>
      <div class="date">Aug 2024 – Sep 2024</div>
      <p>REST API 기반 아비트라지 시스템 설계·테스트</p>
    </div>
    <div class="timeline-item">
      <h3>SCVSoft – Developer</h3>
      <div class="date">May 2024 – Jun 2024</div>
      <p>CUDA 최적화 및 블록체인 트랜잭션 데이터 마이닝</p>
    </div>
    <div class="timeline-item">
      <h3>Ethereum Foundation – R&D in FHE &amp; ZKP</h3>
      <div class="date">Jan 2024 – Dec 2024</div>
      <p>완전 동형 암호 및 영지식 증명 연구·개발</p>
    </div>
    <div class="timeline-item">
      <h3>Mina Foundation – Researcher</h3>
      <div class="date">Jan 2025 – Mar 2025</div>
      <p>행렬 연산 라이브러리 제작 및 테스트</p>
    </div>
  </section>

  <section class="card-grid">
    <div class="card">
      <h2>Education</h2>
      <ul>
        <li><strong>Jeonnam Science High School</strong> (Mar 2020 – Feb 2022)</li>
        <li><strong>Sunchon Nat’l Univ. Science Edu. Institute</strong> (Mar 2016 – Feb 2019)</li>
      </ul>
    </div>
    <div class="card">
      <h2>Skills</h2>
      <ul>
        <li>Advanced: C++, Python</li>
        <li>Intermediate: Git, Rust</li>
        <li>Beginner: Go, Coq, Lean 4</li>
        <li>Cryptography: ZK-SNARKs, STARKs, FHE, Folding Schemes</li>
      </ul>
    </div>
    <div class="card">
      <h2>Awards &amp; Achievements</h2>
      <ul>
        <li>EthCon Korea 2023: Open Track 2위, PSE Sponsor Track 1위</li>
        <li>ZK Summer Contribution Program – Ethereum Foundation (Aug 2023)</li>
        <li>Korean Math Olympiad (Middle) Silver (Nov 2017)</li>
        <li>Korean Informatics Olympiad (Middle) Bronze (Jul 2019)</li>
      </ul>
    </div>
    <div class="card">
      <h2>Languages</h2>
      <ul>
        <li>English: Fluent (TOEFL 118, TOEIC 990)</li>
        <li>Korean: Native</li>
      </ul>
    </div>
  </section>

  <footer>
    &copy; 2025 Cho Changmin
  </footer>
</div>
