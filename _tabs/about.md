---
title: "About me"
---

<style>
:root {
  --primary-color: #4a90e2;
  --bg-color: #f5f7fa;
  --card-bg: #ffffff;
  --text-color: #333333;
  --heading-color: #222222;
  --border-radius: 8px;
  --shadow: 0 4px 12px rgba(0,0,0,0.05);
}
* {
  box-sizing: border-box;
  margin: 0; padding: 0;
  font-family: 'Roboto', sans-serif;
}
body {
  background: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
  padding: 2rem;
}
.container {
  max-width: 900px;
  margin: 0 auto;
}
header {
  text-align: center;
  margin-bottom: 2rem;
}
header h1 {
  font-size: 2.5rem;
  color: var(--heading-color);
  margin-bottom: 0.5rem;
}
header p {
  font-weight: 500;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}
.card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
.card h2 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-color);
  display: inline-block;
  padding-bottom: 0.25rem;
}
.card ul {
  list-style: none;
  margin-top: 1rem;
}
.card ul li {
  padding: 0.5rem 0;
  border-bottom: 1px dashed #e0e0e0;
}
.card ul li:last-child {
  border-bottom: none;
}
.timeline-item {
  margin-bottom: 1rem;
}
.timeline-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  color: var(--heading-color);
}
.timeline-item .date {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.5rem;
}
.timeline-item p {
  margin-left: 1rem;
}
footer {
  text-align: center;
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #777;
}
</style>

<div class="container">
  <header>
    <h1>Cho Changmin</h1>
    <p>Email: <a href="mailto:brilliantepoch22@gmail.com">brilliantepoch22@gmail.com</a></p>
    <p>Contact: +82 10 5080 6605</p>
  </header>
  
  <section class="card">
    <h2>Career Objective</h2>
    <p>
      수학(특히 대수학 및 대수적 위상수학)에 깊은 관심이 있으며, 암호학(Polynomial Commitment Scheme 리뷰 포함)과
      Folding Schemes(Nova, LatticeFold, LatticeFold+, Neo) 연구 경험이 있습니다. 또한 Formal Verification 분야(Coq, Lean 4 활용)에 흥미와 경험이 있습니다.
    </p>
  </section>
  
  <section class="card">
    <h2>Work Experience</h2>
    <div class="timeline-item">
      <h3>Stellar Development Foundation – Grantee</h3>
      <div class="date">June 2025 – November 2025</div>
      <p>NRG #4 (Noir Research Grant), Stellar Soroban Verifier Track 프로젝트 참여</p>
    </div>
    <div class="timeline-item">
      <h3>Nethermind – Intern</h3>
      <div class="date">February 2025 – May 2025</div>
      <p>Formal Verification, Folding Scheme 관련 리서치</p>
    </div>
    <div class="timeline-item">
      <h3>Alpha273 – Development Team</h3>
      <div class="date">August 2024 – September 2024</div>
      <p>REST API 기반 아비트라지 시스템 설계 및 테스팅</p>
    </div>
    <div class="timeline-item">
      <h3>SCVSoft – Developer</h3>
      <div class="date">May 2024 – June 2024</div>
      <p>CUDA 개발 및 블록체인 트랜잭션 데이터 마이닝</p>
    </div>
    <div class="timeline-item">
      <h3>Ethereum Foundation – R&amp;D in FHE &amp; ZKP</h3>
      <div class="date">January 2024 – December 2024</div>
      <p>완전 동형 암호(FHE) 및 영지식 증명(ZKP) 연구, 개발</p>
    </div>
    <div class="timeline-item">
      <h3>Mina Foundation – Researcher</h3>
      <div class="date">January 2025 – March 2025</div>
      <p>행렬 연산 라이브러리 제작 및 테스팅</p>
    </div>
  </section>
  
  <section class="card">
    <h2>Education</h2>
    <div class="timeline-item">
      <h3>Jeonnam Science High School</h3>
      <div class="date">March 2020 – February 2022</div>
    </div>
    <div class="timeline-item">
      <h3>Sunchon National University Science Education Institute</h3>
      <div class="date">March 2016 – February 2019</div>
    </div>
  </section>
  
  <section class="card">
    <h2>Skills</h2>
    <ul>
      <li>Advanced: C++, Python</li>
      <li>Medium: Git, Rust</li>
      <li>Beginner: Golang, rocq, Lean</li>
      <li>Skills: ZK-SNARKs, STARKs, General Cryptography, Abstract Algebra, Linear Algebra
    </ul>
  </section>
  
  <section class="card">
    <h2>Awards &amp; Achievements</h2>
    <ul>
      <li>EthCon Korea 2023: Open Track 2위, PSE Sponsor Track 1위</li>
      <li>ZK Summer Contribution Program – Ethereum Foundation, PSE Team (Aug 2023)</li>
      <li>Korean Mathematical Olympiad (Middle School) Silver (Nov 2017)</li>
      <li>Korean Informatics Olympiad (Middle School) Bronze (Jul 2019)</li>
      <li>수학·정보 올림피아드 겨울·여름 학교 졸업</li>
    </ul>
  </section>
  
  <section class="card">
    <h2>Languages</h2>
    <ul>
      <li>English: Fluent (TOEFL 118, TOEIC 990)</li>
      <li>Korean: Native</li>
    </ul>
  </section>
  
  <footer>
    &copy; 2025 Cho Changmin
  </footer>
</div>